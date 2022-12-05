import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import LoginPage from "./modules/login";
import HomePage from "./modules/homePage";
import { ClientHome } from "./modules/client/pages/home";
import EmployeHome from "./modules/employe/pages/home";
import { ClientView } from "./modules/client/pages/view";
import ClientLock from "./modules/client/pages/lock";
import ClientEdit from "./modules/client/pages/edit";
import EmployeView from "./modules/employe/pages/view";
import EmployeLock from "./modules/employe/pages/lock";
import EmployeEdit from "./modules/employe/pages/edit";
import Page404 from "./modules/shared/ResultPage/404";
import Page401 from "./modules/shared/ResultPage/401";
import { useSelector } from "react-redux";
import { UserStateType } from "./redux/userStore/reducer";
import ClientForm from "./modules/client/pages/form";
import EmployerForm from "./modules/employe/pages/form";

function App() {
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer
  ).user;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />

        {connectedUser.role.permission.clients && (
          <>
            <Route path="/client/home" element={<ClientHome />} />
            <Route path="/client/list" element={<ClientView />} />
            <Route path="/client/lock" element={<ClientLock />} />
            <Route path="/client/edit" element={<ClientEdit />} />
            <Route path="/client/edit/from/:id" element={<ClientForm />} />
          </>
        )}
        {connectedUser.role.permission.employer && (
          <>
            <Route path="/employe/home" element={<EmployeHome />} />
            <Route path="/employe/list" element={<EmployeView />} />
            <Route path="/employe/lock" element={<EmployeLock />} />
            <Route path="/employe/edit" element={<EmployeEdit />} />
            <Route path="/employe/edit/from/:id" element={<EmployerForm />} />
          </>
        )}
        <Route path="*" element={<Page404 />} />
        <Route path="/unauthorize" element={<Page401 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
