import mongoose from "mongoose";
import app from "./app";
import config from "./config";


const port = config.port as string || 8000
const boostrap = async()=>{
    try{
        await mongoose.connect(config.database_url as string)
        console.log(`DB is connected successfully`);
        app.listen(port, () => {
            console.log(`app listening on port ${port}`)
          })
    }catch(e){
        console.log(e);
        
    }
}

boostrap()