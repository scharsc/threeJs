import { Router } from "express";

import {
  createPrimitive,
  getPrimitiveIds,
  deletePrimitive,
  getPrimitive,
} from "../controllers/primitives";

const router = Router();

router.post("/:type", createPrimitive);
router.get("/:type", getPrimitiveIds);
router.get("/:type/:uuid", getPrimitive);
router.delete("/:uuid", deletePrimitive);

export default router;
