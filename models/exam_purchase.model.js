import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const ExamPurchaseModel = sequelize.define('ExamPurchase', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        // Foreign key được tạo tự động từ belongsTo relationships trong index.model.js
        // Không cần references ở đây để tránh conflict
    },
    exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        // Foreign key được tạo tự động từ belongsTo relationships trong index.model.js
        // Không cần references ở đây để tránh conflict
    },
    purchase_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'ExamPurchase',
    indexes: [
        // Removed unique constraint to allow multiple purchases (pay-per-attempt)
        {
            fields: ['user_id', 'exam_id']
        }
    ]
});

export default ExamPurchaseModel;

