import { JWT_SECRET, JWT_ADMIN_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken"

export const authenticateUser = (req, res, next)=>{
    const {token} = req.headers;
    const verified = jwt.verify(token, JWT_SECRET)

    if(verified){
       req.userId = verified.userId;
       next()  
    } else{
        res.status(403).json({
            message: "You're not signed in"
        })
    }
}

export const authenticateAdmin = (req, res, next)=>{
    const {token} = req.headers;
    const verified = jwt.verify(token, JWT_ADMIN_SECRET)

    if(verified){
       req.body.creatorId = verified.userId;
       next()  
    } else{
        res.status(403).json({
            message: "You're not signed in"
        })
    }
}