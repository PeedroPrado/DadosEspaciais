// rotas.ts
import { Router } from "express";
import { cidade, buscarIrradiacaoPorCidade } from "../controllers/consulta";

const router = Router();

router.get("/cidade", cidade);

// workaround: forçar tipagem correta
router.get("/cidade/:id", buscarIrradiacaoPorCidade as any);

export default router;
