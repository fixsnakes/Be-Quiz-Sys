import { ExamModel, ClassesModel } from "../models/index.model.js";

export const createExam = async (req, res) => {
    try {
        const {
            class_id,
            title,
            des,
            total_score,
            minutes,
            start_time,
            end_time,
            is_paid,
            fee,
            is_public
        } = req.body;

        const created_by = req.userId; // Get from middleware

        // Validate required fields
        if (!class_id || !title || !minutes || !start_time || !end_time) {
            return res.status(400).send({ 
                message: 'Missing required fields: class_id, title, minutes, start_time, end_time' 
            });
        }

        // Validate that the class exists and belongs to the teacher
        const classInfo = await ClassesModel.findOne({
            where: {
                id: class_id,
                teacher_id: created_by
            }
        });

        if (!classInfo) {
            return res.status(404).send({ 
                message: 'Class not found or you do not have permission to create exam for this class' 
            });
        }

        // Validate dates
        const startDate = new Date(start_time);
        const endDate = new Date(end_time);

        if (startDate >= endDate) {
            return res.status(400).send({ 
                message: 'End time must be after start time' 
            });
        }

        // Validate fee if is_paid is true
        if (is_paid && (!fee || fee <= 0)) {
            return res.status(400).send({ 
                message: 'Fee is required when is_paid is true' 
            });
        }

        // Create exam
        const exam = await ExamModel.create({
            class_id,
            title,
            des: des || null,
            total_score: total_score || 100,
            minutes,
            start_time: startDate,
            end_time: endDate,
            is_paid: is_paid || false,
            fee: is_paid ? fee : 0,
            created_by,
            is_public: is_public || false,
            count: 0
        });

        return res.status(201).send(exam);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
