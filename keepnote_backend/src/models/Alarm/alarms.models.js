import mongoose from "mongoose";

const alarmSchema = new mongoose.Schema({
    noteid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Note", 
        required: true
    }, 
    time: {
        type: Date, 
        required: true, 
    }
})

export const Alarm = mongoose.model('Alarm', alarmSchema);

