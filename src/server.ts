import mongoose from "mongoose";


const main = async()=>{
    try{
        await mongoose.connect("mongodb+srv://alamgir:Az6908819789@cluster0.9inlzqr.mongodb.net/university-management")
        console.log(`DB is connected successfully`);
        
    }catch(e){
        console.log(e);
        
    }
}

main()