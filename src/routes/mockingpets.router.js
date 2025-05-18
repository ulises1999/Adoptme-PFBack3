import { Router } from "express";
import { mockingPetsController } from "../controllers/mockingpets.controller.js";

const router = Router();

router.get('/', mockingPetsController);

export default router;