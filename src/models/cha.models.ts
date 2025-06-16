import mongoose from "mongoose";
import { Schema } from "mongoose";

const chaSchema = new Schema({
    name: {
        type: String,
    },
    email:{
        type: String,
    },
    reviews:{
        type:Number
    },
    photo: {
        type: String,
    },
    license: {
        type: String,
    },
    services: {
        type: Array<String>,
    },
    languages: {
        type: Array<String>,
    },
    specialization: {
        type: String,  
    },
    password: {
        type: String,
    },
    experience: {
        type: String,
    },
    location: {
        type: String,
    }
});

const CHA = mongoose.models.CHA || mongoose.model("CHA", chaSchema);

export default CHA;
