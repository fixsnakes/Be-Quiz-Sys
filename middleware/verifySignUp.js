import { where } from "sequelize";
import db from "../models/index.model.js";

const User = db.User


const CheckDuplicateEmail = async(req,res,next) => {
    try{
        const user = await User.findOne({where: {
            email:req.body.email
        }});

        if(user){
            return res.status(400).send({message: 'Email existed'})
        }

        next()
    } catch(error){
        return res.status(500).send({message: error.message})
    }
}


export default CheckDuplicateEmail;