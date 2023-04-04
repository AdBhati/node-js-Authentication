import express from 'express'
import { create, findAll, login, test } from '../controller/userController.js';
import { auth } from '../middleware/auth.js'

const router = express.Router();

router.get("/", auth, findAll)
router.get("/test", test)
router.post("/", create);
router.post("/authenticate", login)

export default router;