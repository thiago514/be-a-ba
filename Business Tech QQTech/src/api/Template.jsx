import axios from "axios";
import { usuarioInvalido } from "./User";

export function post_template(e, templateData) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  // criando uma copia da variavel para não alterar a original
  let template = JSON.parse(JSON.stringify(templateData));

  if (!template.extencao_do_arquivo) {
    e.preventDefault();
    alert("template sem tipo de arquivo definido");
    return;
  }

  if (!template.nome) {
    e.preventDefault();
    alert("template sem nome definido");
    return;
  }
  try {
    template.tabelas.forEach((tabela) => {
      if (tabela.campos.length <= 0) {
        alert("tabela sem campos definidas");
        throw new Error("tabela sem campos definidas");
      }
      if (!tabela.nome) {
        alert("tabela sem nome definido");
        throw new Error("tabela sem nome definido");
      }
    });
  } catch (error) {
    e.preventDefault();
    console.log(error);
    return;
  }

  template.id = undefined;

  template.tabelas = template.tabelas.map((tabela) => {
    (tabela.id = undefined),
      (tabela.campos = tabela.campos.map((campos) => {
        campos.id = undefined;
        return campos;
      }));
    return tabela;
  });
  e.preventDefault();
  axios
    .post("http://localhost:3000/template", template)
    .then((response) => {
      console.log(response.data);
      alert("template criado com sucesso");
      window.location.reload();

      return response.data;
    })
    .catch((error) => {
      alert(error.response.data);
      e.preventDefault();
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export function getTemplatePendente(setDados) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .get("http://localhost:3000/template/pendente")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
    })
    .catch((error) => {
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export function alterarStatusTemplate(id, status) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .post("http://localhost:3000/template/status", { id, status })
    .then((response) => {
      window.location.reload();
      return response;
    })
    .catch((error) => {
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export function getTodosTemplates(setDados) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .get("http://localhost:3000/template")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
    })
    .catch((error) => {
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export function getTemplateUsuario(setDados) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .get("http://localhost:3000/template/visualizar")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
    })
    .catch((error) => {
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export function getTemplatesAtivos(setDados) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .get("http://localhost:3000/template/ativos")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
    })
    .catch((error) => {
      usuarioInvalido(error.response);
      console.log(error);
    });
}
