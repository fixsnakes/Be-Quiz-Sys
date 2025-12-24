import { upload, uploadExamImage } from "../controllers/upload.controller.js";
import { verifyToken } from "../middleware/authJWT.js";

const uploadRoutes = (app) => {
    // Upload ảnh đề thi
    app.post('/api/upload/exam-image', verifyToken, upload.single('image'), uploadExamImage);
}

export default uploadRoutes;

