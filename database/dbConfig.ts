import mongoose from "mongoose"
import { envs } from "../config/envs"

const whetherURL: string = envs.MONGODB

export const DataBase = async()=>{
    try {
        mongoose.connect(whetherURL).then(()=>{
            console.log(`whetherDataBase connected on ${whetherURL}`)
        })
    } catch (error) {
        console.log(`error from database ${error}`)
    }
}