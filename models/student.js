import mongoose from "mongoose";

const Schema = mongoose.Schema;

let StudentSchema = new Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    checkbox: { type: Boolean, required: true, default: false },
    // TODO: other fields
}, { 
    getters: true,
});

StudentSchema.virtual("name").get(function(){
    return `${this.fName} ${this.lName}`;
});

StudentSchema.virtual("url").get(function(){
    return `/student/${this._id.valueOf()}`;
});

export const Student = mongoose.model("Student", StudentSchema);