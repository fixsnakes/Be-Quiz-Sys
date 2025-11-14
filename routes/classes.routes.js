import { createClass,getClasses } from "../controllers/classes.controller.js";
import { verifyToken,verifyTeacher } from "../middleware/authJWT.js";


const authClasses = (app) =>{
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next()
    })

    app.post('/api/classes',verifyToken,verifyTeacher,createClass)
    app.get('/api/classes',verifyToken,getClasses)
}


export default authClasses;