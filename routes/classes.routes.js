import { createClass,getClasses,joinClassByCode } from "../controllers/classes.controller.js";
import { verifyToken,verifyTeacher, verifyStudent } from "../middleware/authJWT.js";


const authClasses = (app) =>{
    //Create class
    app.post('/api/classes',verifyToken,verifyTeacher,createClass)

    //Get all class
    app.get('/api/classes',verifyToken,getClasses)

    //Join Class
    app.get('/api/classes/join',verifyToken,verifyStudent,joinClassByCode)
}


export default authClasses;