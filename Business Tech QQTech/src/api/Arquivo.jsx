import axios from "axios";
import { usuarioInvalido } from "./User";

export async function testarArquivo(arquivo, id_template) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  console.log("template id" + id_template);
  console.log(arquivo);

  const formData = new FormData();
  formData.append("arquivo", arquivo);
  formData.append("id_template", id_template);

  console.log(formData);
  if (!arquivo) {
    alert("Selecione um arquivo");
    return;
  }
  if (!id_template) {
    alert("Selecione um template");
    return;
  }
  await axios
    .post("http://localhost:8000/arquivo/testar", formData, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    })
    .then((response) => {
      alert("Arquivo testado com sucesso");

      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      alert("Erro ao testar arquivo " + error.response.data);
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export async function salvarArquivo(arquivo, id_template, categoria) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  console.log("template id" + id_template);
  console.log(arquivo);

  const formData = new FormData();
  formData.append("arquivo", arquivo);
  formData.append("id_template", id_template);
  formData.append("categoria", categoria)

  console.log(formData);
  if (!arquivo) {
    alert("Selecione um arquivo");
    return;
  }
  if (!id_template) {
    alert("Selecione um template");
    return;
  }

  if (!categoria) {
    alert("Selecione uma categoria");
    return;
  }
  await axios
    .post("http://localhost:8000/arquivo/", formData, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    })
    .then((response) => {
      alert("Arquivo salvo com sucesso");

      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      alert("Erro ao testar arquivo " + error.response.data);
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export async function getArquivosTemplate(id_template) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;
  axios
    .get("http://127.0.0.1:8000/template/" + id_template, {
      responseType: "blob",
    })
    .then((response) => {
      if (response.status != 200) {
        throw new Error("Erro ao baixar arquivo");
      }
      console.log(response);

      let url = window.URL.createObjectURL(response.data);
      let a = document.createElement("a");
      a.href = url;
      a.download = response.headers.filename;
      a.click();
    })
    .catch((error) => {
      alert("Erro ao baixar o arquivo");
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export function getArquivos(setDados) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;
  axios
    .get("http://localhost:8000/arquivo/")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
    })
    .catch((error) => {
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export async function getArquivo(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;
  axios
    .get("http://127.0.0.1:8000/arquivo/" + id, {
      responseType: "blob",
    })
    .then((response) => {
      if (response.status != 200) {
        throw new Error("Erro ao baixar arquivo");
      }
      console.log(response);

      let url = window.URL.createObjectURL(response.data);
      let a = document.createElement("a");
      a.href = url;
      a.download = response.headers.filename;
      a.click();
    })
    .catch((error) => {
      alert("Erro ao baixar o arquivo");
      usuarioInvalido(error.response);
      console.log(error);
    });
}

export async function deletarArquivo(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .delete("http://localhost:8000/arquivo/" + id)
    .then((response) => {
      alert("Arquivo deletado com sucesso");
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      alert("Erro ao deletar arquivo");
      usuarioInvalido(error.response);
      console.log(error);
    });
}
