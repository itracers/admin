import * as React from "react";

import { AppBar, Layout, LayoutProps, UserMenu } from "react-admin";
import { LogoutButton } from "./components/LogoutButton";

const AdminUserMenu = () => (
  <UserMenu>
    <LogoutButton />
  </UserMenu>
);

const AdminAppBar = () => <AppBar userMenu={<AdminUserMenu />} />;

const AdminLayout = (props: LayoutProps) => (
  <Layout {...props} appBar={AdminAppBar} />
);

export default AdminLayout;
