import EstilosGlobais from "./components/EstilosGlobais";
import "./_app.css";
import Rotas from "./Rotas";
import { useState } from "react";

function App() {
  if (!localStorage.getItem("user") || localStorage.getItem("user") == "") {
    console.log("Não possui user no local storage");
    localStorage.setItem(
      "user",
      JSON.stringify({
        nome: "",
        email: "",
        token: "",
        matricula: "",
        tipo: "",
      })
    );
  }

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  console.log(user);

  return (
    <>
      <EstilosGlobais />
      <Rotas user={user} setUser={setUser} />
    </>
  );
}

export default App;
