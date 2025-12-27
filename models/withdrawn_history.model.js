import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const WithdrawHistoryModel = sequelize.define('WithdrawHistory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bankAccountName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    bankAccountNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: false
    },
    withdraw_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'success', 'failed'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'withdrawn_history'
});

export default WithdrawHistoryModel;


