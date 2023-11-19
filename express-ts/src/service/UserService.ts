import { User } from "../entities/User";
import { gerarJWT } from "../resource/auth";
import conn from "../configs/db";
import { IsNull, Not } from "typeorm";
import { compareSync, hash, hashSync } from "bcrypt";

class UserService {
  static async registar(
    nome: string,
    senha: string,
    email: string,
    matricula: string
  ): Promise<any> {
    console.log("Registrando");
    const userRepository = conn.getRepository(User);
    senha = await hash(senha, 8);
    const user = await userRepository.save({ nome, senha, email, matricula });
    return user;
  }

  static async permitirUsuario(id: number, tipo: string): Promise<any> {
    const userRepository = conn.getRepository(User).createQueryBuilder();
    const user = await userRepository
      .update()
      .set({ tipo })
      .where({ id })
      .execute();
    return user;
  }

  static async alterarStatus(id: number, tipo: string): Promise<any> {
    const userRepository = conn.getRepository(User).createQueryBuilder();
    const user = await userRepository
      .update()
      .set({ tipo })
      .where({ id })
      .execute();
    return user;
  }

  static async alterarUsuario(
    id: number,
    nome: string,
    email: string,
    matricula: string,
    tipo: string | null
  ): Promise<any> {
    console.log("alterando usuariooo")
    const userRepository = conn.getRepository(User).createQueryBuilder();
    if(tipo === null){
      await userRepository
      .update()
      .set({ nome, email, matricula})
      .where({ id })
      .execute();
    }else{  
    await userRepository
      .update()
      .set({ nome, email, matricula, tipo})
      .where({ id })
      .execute();
    }
    const user = await userRepository
      .select(["id", "nome", "email", "matricula", "tipo"])
      .where({ id })
      .execute();
    return user;
  }

  static async alterarMeuUsuario(
    id: number,
    nome: string,
    email: string,
    matricula: string,
    senhaAntiga: string,
    senha: string
  ): Promise<any> {
    console.log("alterando meu usuario")
    const userRepository = conn.getRepository(User).createQueryBuilder();
    const Dadosuser = await userRepository
      .select(["senha"])
      .where({ id })
      .execute();
    console.log(Dadosuser);
    if (compareSync(senhaAntiga, Dadosuser[0].senha)) {
      senha = hashSync(senha, 8);
      await userRepository
        .update()
        .set({ nome, email, matricula, senha })
        .where({ id })
        .execute();
    } else {
      throw Error("Senha antiga incorreta");
    }
    const user = await userRepository
      .select(["id", "nome", "email", "matricula"])
      .where({ id })
      .execute();
    return user;
  }

  static async login(matricula: string, senha: string) {
    const user =await gerarJWT(matricula, senha);
    return user;
  }

  static async deletar(id: number): Promise<any> {
    const userRepository = conn.getRepository(User).createQueryBuilder();
    await userRepository.delete().from(User).where({ id }).execute();
  }

  static async listarUsuariosPendentes(): Promise<any> {
    const userRepository = conn.getRepository(User).createQueryBuilder();
    const users = await userRepository
      .select(["id", "nome", "email", "matricula", 'createdat'])
      .where({ tipo: IsNull() })
      .execute();
    return users;
  }

  static async listarUsuarios(): Promise<any> {
    const userRepository = conn.getRepository(User).createQueryBuilder();
    const users = await userRepository
      .select(["id", "nome", "email", "matricula", "tipo"])
      .where({ tipo: Not(IsNull()) })
      .execute();
    return users;
  }
}

export default UserService;
