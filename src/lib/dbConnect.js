import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI){
  throw new Error("Please Define the MONGO_URI environment variable")
}

let cashed = global.mongoose || {conn : null , promise : null}

export async function connect(){
    try {
      if(cashed.conn) return cashed.conn;

      if(!cashed.promise){
        cashed.promise = mongoose.connect(MONGO_URI,{
          dbName: 'NotesTest',
        })
      }

      cashed.conn = await cashed.promise;
      global.mongoose = cashed
      // mongoose.connect(process.env.MONGO_URI , {dbName: 'NotesTest'});
      const connection =  mongoose.connection
  
      connection.on('connected',()=>{
        console.log("MongoDB is connected")
      })
  
      connection.on('error',(err)=>{
        console.log("MongoDb connection Error, make sure Db is up and running " + err)
        process.exit();
      })
      return cashed.conn
    } catch (error) {
      console.log("While Establishing connection to database Something went wrong")
      console.log(error);
    }
  }