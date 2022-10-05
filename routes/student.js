import express from "express";
import * as studentController from "../controllers/studentController.js";

export let router = express.Router();

router.get("/new", studentController.student_create_get);
router.post("/new", studentController.student_create_post);
router.get("/pdf", studentController.student_qrcode_pdf);
router.get("/:id", studentController.student_detail_get);
router.post("/:id", studentController.student_detail_post);
router.get("/", studentController.student_list)