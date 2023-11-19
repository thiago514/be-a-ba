import axios from "axios";

export function login(matricula, senha, setUser) {
  const userLogin = {
    matricula: matricula,
    senha: senha,
  };
  console.log(userLogin);
  axios
    .post("http://localhost:3000/user/login", userLogin)
    .then((response) => {
      console.log(response.data);
      const userResponse = response.data.user;
      localStorage.setItem("user", JSON.stringify(userResponse));
      axios.defaults.headers.common["token"] = userResponse.token;
      setUser(response.data.user);
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
}

export function register(user) {
  axios
    .post("http://localhost:3000/user/registrar", user)
    .then((response) => {
      console.log(response.data);
      const userResponse = response.data;
      alert("Usuário cadastrado com sucesso");
      localStorage.setItem("user", JSON.stringify(userResponse));
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
}

export function alterarStatusUsuario(id, tipo) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .post("http://localhost:3000/user/alterarStatus", { tipo: tipo, id: id })
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      alert(error.response.data.mensagem);
      console.log(error);
    });
  
}

export function editarUsuario(user) {
  const userLogado = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = userLogado.token;

  axios
    .put("http://localhost:3000/user/alterarUsuario", user)
    .then((response) => {
      alert("Usuário editado com sucesso");
      window.location.reload();
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
}

export function alterarMeuUsuario(user, setUser) {
  let userLogado = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = userLogado.token;

  axios
    .put("http://localhost:3000/user/alterarMeuUsuario", user)
    .then((response) => {
      alert("Usuário editado com sucesso");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userLogado,
          nome: user.nome,
          email: user.email,
          matricula: user.matricula,
        })
      );
      setUser(JSON.parse(localStorage.getItem("user")));
      // window.location.reload();
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
}

export function listarUsuarioPendentes(setDados) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;
  axios
    .get("http://localhost:3000/user/listarUsuariosPendentes")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
}

export function listarUsuario(setDados) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;
  axios
    .get("http://localhost:3000/user/listarUsuarios")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
}

export function permitirUsuario(id, tipo) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .post("http://localhost:3000/user/permitirUsuario", { tipo: tipo, id: id })
    .then((response) => {})
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
}

export function deletarUsuario(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .delete("http://localhost:3000/user/deletar/" + id)
    .then((response) => {})
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
}

export function verificarToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;
  if (user.token == "" || user.token == null || user.token == undefined) {
    return false;
  }
  axios
    .get("http://localhost:3000/user/tokenValido")
    .then((response) => {
      console.log("voltou");
      if (response.status == 200) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      usuarioInvalido(error.response);
      return false;
    });
}

export function verificaADM() {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;
  try {
    axios.get("http://localhost:3000/user/verificaADM").then((response) => {
      if (response.status == 200) {
        return true;
      }
      return false;
    });
  } catch (error) {
    return false;
  }
}

export function usuarioInvalido(response) {
  console.log(response);
  if (response.data.mensagem.includes("jwt inválido")) {
    console.log("jwt inválido");
    localStorage.removeItem("user");
    const a = document.createElement("a");
    a.href = "/";
    a.click();
  }
}
