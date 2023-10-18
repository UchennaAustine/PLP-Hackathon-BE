import {Request,Response} from "express"
import jwt from "jsonwebtoken"
import { HTTP } from "../error/error"

export const Verification = async(req:Request,res:Response)=>{
    try {
        const token = req.headers.authorization
        if(token){
            const realValue = token.split(" ")[1]
            if(realValue){
                jwt.verify(realValue,"decode",(err,payload)=>{
                    if(err){
                        return res.status(HTTP.BAD_REQUEST).json({
                            message:"jwt encountered an error"
                        })
                    }else{
                        const userID = payload
                        console.log(userID)
                    }
                })
            }else{
                return res.status(HTTP.BAD_REQUEST).json({
                    message:"invalid token"
                })
            }
        }else{
            return res.status(HTTP.BAD_REQUEST).json({
                message:"Token not found!"
            })
        }
    } catch (error) {
        return res.status(HTTP.BAD_REQUEST).json({
            message:"An error occurred"
        })
    }
}