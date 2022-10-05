import { Student } from "../models/student.js";
import { __dirname } from "../app.js"
import fs from "fs";
import pug from "pug";
import * as pdf from "html-pdf";

export const student_create_get = (req, res, next) => {
    res.render("newStudent", {title:"New Student"});
};

export const student_create_post = (req, res) => {

    //TODO: content validation

    let stud = new Student({ fName: req.body.fName, lName: req.body.lName, checkbox: (req.body.checkbox == null) ? false : true });
    // console.log(req.body);
    // res.send(req.body.image);
    stud.save();
    res.redirect(`/student/${stud._id}`);
};

export const student_qrcode_pdf = async (req, res) => {
    await Student.find().sort({ "lName": 1 }).then(async (list) => {
        const compPug = pug.compileFile(__dirname + "views/qrcodespdf.pug");
        const compCont = compPug({ studentList: list });
        
        const filepath = __dirname + "public/qrcodes.pdf";

        pdf.create(compCont, {"border": ".4in"}).toFile(filepath, async function (err, fileRes) {
            if (err) {
                res.send(err);
            } else {
                fs.readFile(filepath, (err, data) => {
                    res.contentType("application/pdf");
                    res.send(data);
                }); 
            }
        });
    }).catch((err) =>{
        res.send(err);
    });
};

export const student_detail_get = async (req, res) => {
    try {
        let stud = await Student.findById(req.params.id).exec();
        res.render("student", {title: stud.name, student: stud});
    } catch (err){
        res.redirect(`/student?msg=student with id "${req.params.id}" not found`);
    }
};
 
export const student_detail_post = async (req, res) => {
    let stud = await Student.findById(req.body.id).exec();
    try {
        //TODO: content validation
        stud.fName = req.body.fName;
        stud.lName = req.body.lName;
        stud.checkbox = (req.body.checkbox == null) ? false : true;
        stud.save();
        res.redirect("back");    
    } catch (err) {
        res.redirect("back");    
    }
    
}
export const student_list = async (req, res) => {
    await Student.find().sort({ "lName": 1 }).then(async (list) => {   
        res.render("studentList", { title: "Student List", msg: req.query.msg, studentList: list});
    }).catch((err) =>{
        res.send(err);
    });
};


