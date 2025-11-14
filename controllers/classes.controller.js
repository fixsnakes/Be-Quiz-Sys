import { UserModel, ClassesModel } from "../models/index.model.js";  // Import từ index.model.js

export const createClass = async (req, res) => {
    try {
        const { className } = req.body;
        const teacher_id = req.userId; // Get from middleware

        if (!className) {
            return res.status(400).send({ message: 'Missing classname !!!' });
        }

        const classCreate = await ClassesModel.create({
            className: className,
            teacher_id: teacher_id
        });

        return res.status(201).send(classCreate);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const getClasses = async (req, res) => {
    const teacher_id = req.userId;

    try {
        const taughtClasses = await ClassesModel.findAll({
            where: {
                teacher_id: teacher_id
            },
            include: [
                {
                    model: UserModel,
                    as: 'teacher' // Sử dụng alias 'teacher' trong include
                }
            ]
        });

        return res.status(200).send(taughtClasses);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
