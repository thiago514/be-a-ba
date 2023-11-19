import { Router } from "express";
import TemplateController from "../controller/TemplateController.js";
import { usuarioAutorizado } from "../resource/auth.js";
import { usuarioADM } from "../resource/auth.js";

const templateRouter = Router();

templateRouter.use(usuarioAutorizado)

templateRouter.post("/",TemplateController.criarTemplate);
templateRouter.get("/", usuarioADM,TemplateController.listarTodosTemplates);
templateRouter.get("/pendente", usuarioADM, TemplateController.listarTemplatesPendentes);
templateRouter.post("/status", usuarioADM, TemplateController.alterarStatus);
templateRouter.get("/visualizar", TemplateController.visualizarTemplateUser);
templateRouter.get("/ativos", TemplateController.visualizarTemplatesAtivos)




export default templateRouter;