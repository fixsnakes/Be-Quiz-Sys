import { DepositHistoryModel } from "../models/index.model.js";
import redisClient from "../config/redis.config.js";

export const markExpiredDeposits = async () => {
    try {
        // Lấy tất cả deposit_id từ Redis SET pending_deposits
        const pendingDepositIds = await redisClient.sMembers('pending_deposits');

        if (!pendingDepositIds || pendingDepositIds.length === 0) {
            return;
        }

        const expiredDepositIds = [];

        // Kiểm tra TTL của từng deposit_id
        for (const depositId of pendingDepositIds) {
            const ttl = await redisClient.ttl(`pending_deposit:${depositId}`);

            // Nếu TTL <= 0, deposit đã hết hạn
            if (ttl <= 0) {
                expiredDepositIds.push(depositId);
            }
        }

        // Xử lý các deposit đã hết hạn
        for (const depositId of expiredDepositIds) {
            try {
                const deposit = await DepositHistoryModel.findByPk(depositId);

                if (deposit && deposit.deposit_status === 'pending') {
                    await deposit.update({
                        deposit_status: "failed",
                    });
                }

                // Xóa khỏi Redis
                await redisClient.sRem('pending_deposits', depositId);
                await redisClient.del(`pending_deposit:${depositId}`);
            } catch (err) {
                console.error(`Failed to mark deposit ${depositId} as failed:`, err.message);
                // Vẫn xóa khỏi Redis để tránh lặp lại
                await redisClient.sRem('pending_deposits', depositId);
                await redisClient.del(`pending_deposit:${depositId}`);
            }
        }
    } catch (error) {
        console.error("Error while marking expired deposits:", error.message);
    }
};

let depositSchedulerInterval = null;

export const startDepositExpiryScheduler = (intervalMs = 60000) => {
    if (depositSchedulerInterval) {
        return;
    }

    depositSchedulerInterval = setInterval(() => {
        markExpiredDeposits().catch((error) => {
            console.error("Deposit expiry scheduler error:", error.message);
        });
    }, intervalMs);
};


