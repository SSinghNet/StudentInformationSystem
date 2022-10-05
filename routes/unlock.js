import express from "express";
import bodyParser from "body-parser";
import * as unlockController from "../controllers/unlockController.js";

export let router = express.Router();

router.get("/", unlockController.unlock_get, unlockController.redirect);
router.post("/", unlockController.unlock_post, unlockController.redirect);
router.get("/lock", unlockController.lock_get);