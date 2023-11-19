import { Router } from "express";
import UserController from "../controller/UserController.js";
import { usuarioADM, usuarioAutorizado } from "../resource/auth.js";

const userRouter = Router();

userRouter.post('/registrar', UserController.registar);
userRouter.post('/permitirUsuario', usuarioADM, UserController.permitirUsuario);
userRouter.post('/login', UserController.login);
userRouter.delete('/deletar/:id', usuarioADM, UserController.deletar);
userRouter.get('/listarUsuariosPendentes', usuarioADM, UserController.listarUsuariosPendentes);
userRouter.get('/listarUsuarios',usuarioADM, UserController.listarUsuarios);
userRouter.post('/alterarStatus', usuarioADM, UserController.alterarStatus);
userRouter.put('/alterarUsuario', usuarioADM, UserController.alterarUsuario);
userRouter.put('/alterarMeuUsuario', usuarioAutorizado, UserController.alterarMeuUsuario);
userRouter.get('/tokenValido', usuarioAutorizado, UserController.tokenValido);
userRouter.get('/verificaADM', usuarioADM, UserController.usuarioADM);



export default userRouter;