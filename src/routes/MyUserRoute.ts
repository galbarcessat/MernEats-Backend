import express from "express"
import myUserController from "../controllers/MyUserController"

const router = express.Router()

router.post("/", myUserController.createCurrentUser)

export default router