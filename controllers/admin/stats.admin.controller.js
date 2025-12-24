import { UserModel, ClassesModel, ExamModel } from "../../models/index.model.js";
import { Op } from "sequelize";
import sequelize from "../../config/db.config.js";

// ==================== STATS 30 DAYS ====================

export const getStats30Days = async (req, res) => {
    try {
        // Get date range for the last 30 days
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 29);
        startDate.setHours(0, 0, 0, 0);
        
        // Generate array of dates for the last 30 days
        const dates = [];
        const dateKeys = [];
        for (let i = 0; i < 30; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            dates.push(`${day}/${month}`);
            dateKeys.push(date.toISOString().split('T')[0]);
        }
        
        // Get all users created up to the end date
        const allUsers = await UserModel.findAll({
            where: {
                created_at: {
                    [Op.lte]: endDate
                }
            },
            attributes: [
                [sequelize.fn('DATE', sequelize.col('created_at')), 'date']
            ],
            raw: true
        });
        
        // Get all classes created up to the end date
        const allClasses = await ClassesModel.findAll({
            where: {
                created_at: {
                    [Op.lte]: endDate
                }
            },
            attributes: [
                [sequelize.fn('DATE', sequelize.col('created_at')), 'date']
            ],
            raw: true
        });
        
        // Get all exams created up to the end date
        const allExams = await ExamModel.findAll({
            where: {
                created_at: {
                    [Op.lte]: endDate
                }
            },
            attributes: [
                [sequelize.fn('DATE', sequelize.col('created_at')), 'date']
            ],
            raw: true
        });
        
        // Calculate cumulative counts for each day
        const newUsers = [];
        const newClasses = [];
        const newExams = [];
        
        for (let i = 0; i < 30; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i);
            currentDate.setHours(23, 59, 59, 999);
            
            // Count all records created up to this date
            const userCount = allUsers.filter(u => new Date(u.date) <= currentDate).length;
            const classCount = allClasses.filter(c => new Date(c.date) <= currentDate).length;
            const examCount = allExams.filter(e => new Date(e.date) <= currentDate).length;
            
            newUsers.push(userCount);
            newClasses.push(classCount);
            newExams.push(examCount);
        }
        
        return res.status(200).json({
            success: true,
            data: {
                dates,
                "new-users": newUsers,
                "new-classes": newClasses,
                "new-exams": newExams
            }
        });
        
    } catch (error) {
        console.error("Error getting 30 days stats:", error);
        return res.status(500).json({
            success: false,
            message: "Error getting 30 days statistics",
            error: error.message
        });
    }
};
