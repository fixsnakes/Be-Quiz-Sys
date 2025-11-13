import { signin,signup } from "../controllers/auth.controller.js";

import CheckDuplicateEmail from "../middleware/verifySignUp.js";
const authRoutes = (app) => {
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next()
    })

    app.post('/api/auth/signup' ,[CheckDuplicateEmail],signup);
    app.post('/api/auth/signin',signin)
}



export default authRoutes