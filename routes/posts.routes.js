import { verifyTeacher,verifyStudent, verifyToken } from "../middleware/authJWT.js";
import { CreatePost,GetPostsClass } from "../controllers/posts.controller.js";
const postRoutes = (app) =>{
    

    // Create Post

    app.post('/api/posts/create',verifyToken,verifyTeacher,CreatePost)
    app.get('/api/classes/:classId/posts',verifyToken,GetPostsClass)
}

export default postRoutes;