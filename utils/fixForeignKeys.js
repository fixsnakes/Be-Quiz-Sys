import sequelize from '../config/db.config.js';

/**
 * Fix foreign key constraints cho bảng ExamPurchase
 * Đảm bảo FK có tên rõ ràng: ExamPurchase_user_id_fk và ExamPurchase_exam_id_fk
 */
export async function fixExamPurchaseForeignKeys() {
    try {

        const [tables] = await sequelize.query(`
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'ExamPurchase'
        `);

        const [existingFKs] = await sequelize.query(`
            SELECT 
                CONSTRAINT_NAME,
                COLUMN_NAME,
                REFERENCED_TABLE_NAME,
                REFERENCED_COLUMN_NAME
            FROM 
                INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE 
                TABLE_SCHEMA = DATABASE()
                AND TABLE_NAME = 'ExamPurchase'
                AND REFERENCED_TABLE_NAME IS NOT NULL
        `);

        const desiredFKs = {
            'ExamPurchase_user_id_fk': {
                column: 'user_id',
                referencedTable: 'User',
                referencedColumn: 'id'
            },
            'ExamPurchase_exam_id_fk': {
                column: 'exam_id',
                referencedTable: 'Exams',
                referencedColumn: 'id'
            }
        };

        const existingFKNames = existingFKs.map(fk => fk.CONSTRAINT_NAME);

        // Kiểm tra và fix từng FK
        for (const [desiredName, config] of Object.entries(desiredFKs)) {
            // Nếu FK với tên mong muốn đã tồn tại, kiểm tra xem có đúng không
            const existingFK = existingFKs.find(
                fk => fk.CONSTRAINT_NAME === desiredName &&
                      fk.COLUMN_NAME === config.column &&
                      fk.REFERENCED_TABLE_NAME === config.referencedTable &&
                      fk.REFERENCED_COLUMN_NAME === config.referencedColumn
            );

            // Tìm FK cũ trên cùng cột (nếu có)
            const oldFK = existingFKs.find(
                fk => fk.COLUMN_NAME === config.column &&
                      fk.REFERENCED_TABLE_NAME === config.referencedTable &&
                      fk.REFERENCED_COLUMN_NAME === config.referencedColumn &&
                      fk.CONSTRAINT_NAME !== desiredName
            );

            // Xóa FK cũ nếu có
            if (oldFK) {
                try {
                    await sequelize.query(`
                        ALTER TABLE ExamPurchase 
                        DROP FOREIGN KEY ${oldFK.CONSTRAINT_NAME}
                    `);
                } catch (error) {
                    if (!error.message.includes("doesn't exist") && 
                        !error.message.includes("Unknown key")) {
                    }
                }
            }

            // Tạo FK mới với tên mong muốn
            try {
                // Kiểm tra xem FK với tên này đã tồn tại chưa (có thể từ lần chạy trước)
                if (!existingFKNames.includes(desiredName)) {
                    console.log(`  ➕ Tạo FK mới: ${desiredName}`);
                    await sequelize.query(`
                        ALTER TABLE ExamPurchase 
                        ADD CONSTRAINT ${desiredName} 
                        FOREIGN KEY (${config.column}) 
                        REFERENCES ${config.referencedTable}(${config.referencedColumn})
                        ON DELETE RESTRICT
                        ON UPDATE CASCADE
                    `);
                } 
            } catch (error) {
                // Nếu lỗi do FK đã tồn tại, bỏ qua
                if (error.message.includes("Duplicate foreign key constraint name") ||
                    error.message.includes("already exists")) {
                } 
            }
        }

        // Xóa các unique indexes không mong muốn (nếu có)
        try {
            const [indexes] = await sequelize.query(`
                SHOW INDEX FROM ExamPurchase
            `);

            const uniqueIndexesToRemove = [
                'ExamPurchase_exam_id_user_id_unique',
                'exam_purchase_user_id_exam_id'
            ];

            for (const indexName of uniqueIndexesToRemove) {
                const indexExists = indexes.some(idx => idx.Key_name === indexName && idx.Non_unique === 0);
                if (indexExists) {
                    await sequelize.query(`
                        ALTER TABLE ExamPurchase DROP INDEX ${indexName}
                    `);
                }
            }
        } catch (error) {
            if (!error.message.includes("doesn't exist") && 
                !error.message.includes("Unknown key")) {
            }
        }
    } catch (error) {
    }
}

