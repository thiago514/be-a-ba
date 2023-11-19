import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import CadastroArquivoPage from "./pages/CadastroArquivoPage";
import CadastroTemplatePage from "./pages/CadastroTemplatePage";
import VisualizarArquivosPage from "./pages/VisualizarArquivosPage";
import VisualizarTemplatesPage from "./pages/VisualizarTemplatesPage";
import PermitirTemplatesPage from "./pages/PermitirTemplatesPage";
import GerenciarTemplatesPage from "./pages/GerenciarTemplatesPage";
import PermitirUsuariosPage from "./pages/PermitirUsuariosPage";
import ErroPage from "./pages/ErroPage";
import { verificarToken } from "./api/User";
import DashboardPage from "./pages/DashboardPage";
import GerenciarUsuarios from "./pages/GerenciarUsuarioPage";
import MeuUsuarioPage from "./pages/MeuUsuarioPage";

const Rotas = ({ user, setUser }) => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: usuarioLogado(user) ? (
        <VisualizarArquivosPage setUser={setUser} user={user} />
      ) : (
        <LoginPage setUser={setUser} user={user} />
      ),
    },
    {
      path: "/cadastro",
      element: <CadastroPage user={user} setUser={setUser} />,
    },
    {
      path: "/cadastro-arquivo",
      element: <CadastroArquivoPage user={user} setUser={setUser} />,
    },
    {
      path: "/consultar-arquivos",
      element: <VisualizarArquivosPage user={user} setUser={setUser} />,
    },
    {
      path: "/cadastro-template",
      element: <CadastroTemplatePage user={user} setUser={setUser} />,
    },
    {
      path: "/gerenciar-template",
      element: <GerenciarTemplatesPage user={user} setUser={setUser} />,
    },
    {
      path: "/visualizar-templates",
      element: <VisualizarTemplatesPage user={user} setUser={setUser} />,
    },
    {
      path: "/permitir-templates",
      element: <PermitirTemplatesPage user={user} setUser={setUser} />,
    },
    {
      path: "/permitir-usuarios",
      element: <PermitirUsuariosPage user={user} setUser={setUser} />,
    },
    {
      path: "/gerenciar-usuarios",
      element: <GerenciarUsuarios user={user} setUser={setUser} />,
    },
    {
      path: "*",
      element: <ErroPage />,
    },
    {
      path: "/meu-usuario",
      element: <MeuUsuarioPage user={user} setUser={setUser} />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage user={user} setUser={setUser} />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

function usuarioLogado(user) {
  try {
    if(user == null || user == undefined)
      return false;
    
    if (user.token == "" || user.token == null || user.token == undefined)
      return false;
    verificarToken();
    return true;
  } catch (error) {
    return false;
  }
}

export default Rotas;
