import { createExam } from "../controllers/exam.controller.js";
import { verifyToken, verifyTeacher } from "../middleware/authJWT.js";

const examRoutes = (app) => {
    // Create exam (only teacher)
    app.post('/api/exams', verifyToken, verifyTeacher, createExam);
}

export default examRoutes;

