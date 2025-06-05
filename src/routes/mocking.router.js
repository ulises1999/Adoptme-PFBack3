import { Router } from "express";
import { mockingPetsController, mockingUsersController } from "../controllers/mocks.controller.js";
import { generateDataController} from "../controllers/generateData.controller.js";

const router = Router();

router.get('/mockingpets', mockingPetsController);
router.get('/mockingusers', mockingUsersController);
router.post('/generateData', generateDataController);

export default router;