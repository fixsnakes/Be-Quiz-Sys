import { verifyTeacher,verifyStudent, verifyToken } from "../middleware/authJWT.js";
import { CreatePost,GetPostsClass,CreateCommentPost ,GetCommentPost, DeletePost} from "../controllers/posts.controller.js";

const postRoutes = (app) =>{
    

    // Create Post
    app.post('/api/posts/create',verifyToken,verifyTeacher,CreatePost)

    //Get All Post From A Class
    app.get('/api/classes/:classId',verifyToken,GetPostsClass)

    // Create Comment A Post
    app.post('/api/posts/comment',verifyToken,CreateCommentPost)

    // Get comments a post
    app.get('/api/posts/comment/:postId',verifyToken,GetCommentPost)

    // Delete post
    app.delete('/api/posts/:postId',verifyToken,verifyTeacher,DeletePost)
}

export default postRoutes;