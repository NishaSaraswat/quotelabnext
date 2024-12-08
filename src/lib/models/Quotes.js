import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema)
