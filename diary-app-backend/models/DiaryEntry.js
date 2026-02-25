const mongoose =require('mongoose');
const DiaryEntrySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        required:true,
    },

},{
    timestamps:true 
});

module.exports = mongoose.model('DiaryEntry',DiaryEntrySchema)