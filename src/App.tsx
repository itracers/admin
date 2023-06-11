import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/Layout";
import { ListNginxConfigs } from "./resources/NginxConfig";

import { Storage } from "@material-ui/icons";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    layout={AdminLayout}
    requireAuth={true}
  >
    <Resource
      icon={Storage}
      name="nginx"
      options={{ label: "NGINX Config" }}
      list={ListNginxConfigs}
    />
  </Admin>
);
