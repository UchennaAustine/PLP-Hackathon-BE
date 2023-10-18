import express, { Application } from "express"
import { mainApp } from "./mainApp"
import { DataBase } from "./database/dbConfig"
import { envs } from "./config/envs"


const port: number = envs.PORT

const app:Application = express()
mainApp(app)

const server = app.listen(port,()=>{
    console.log("")
   DataBase();
    console.log(`server is listening to port${port}`)
})

process.on("uncaughtException",(error: any)=>{
    console.log(`server is shutting down due to uncaughtException: ${error}`)
    process.exit(1);
})
process.on("unhandledRejection",(error: any)=>{
    console.log(`server is shutting down due to unhandledRejection: ${error}`)

server.close(()=>{
    process.exit(1);
})
})