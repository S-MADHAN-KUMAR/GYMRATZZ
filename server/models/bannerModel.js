import mongoose from 'mongoose'

const BannerSchema = new mongoose.Schema({
    name:{type:String, requird:true},
    imageUrl:{type:String,required:true},
    status:{type : Boolean , default:true }
},{
    timestamps:true
})

const BannerModel =  mongoose.model('Banner',BannerSchema)
export default BannerModel