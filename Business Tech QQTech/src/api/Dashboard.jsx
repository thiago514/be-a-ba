import axios from "axios";
import { usuarioInvalido } from "./User";

export function getDashboard(setDados) {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["token"] = user.token;

  axios
    .get("http://localhost:8000/dashboard")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
    })
    .catch((error) => {
      usuarioInvalido(error.response);
      console.log(error);
    });
}
