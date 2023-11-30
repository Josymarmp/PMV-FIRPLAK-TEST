import express  from "express";
import * as EntregasController from "../controllers/entrega.js"
const router = express.Router();

router.get("/",EntregasController.getEntregas);
router.get("/reports",EntregasController.getReports);
export default router; 