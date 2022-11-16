import mongoose from "mongoose";

const documentschema = mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    data:{
        type:Object,
        required: true
    }
})

const Document = mongoose.model("documenttable", documentschema);

export default Document; 