import express from "express"
import myUserController from "../controllers/MyUserController"
import { jwtCheck } from "../middleware/auth"

const router = express.Router()

router.post("/", jwtCheck, myUserController.createCurrentUser)
router.put("/", myUserController.updateCurrentUser)

export default router