import { Router } from "express";
import {
    addUser,
    fetchAllUser,
    fetchUserById,
    removeUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post('/',addUser);

router.get("/",fetchAllUser);
router.get('/:id', fetchUserById);

router.delete('/:id',removeUser);

export default router;