import { forwardRef } from "react";
import { MenuItem } from "@mui/material";
import ExitIcon from "@mui/icons-material/PowerSettingsNew";
import { useLogout } from "react-admin";

export const LogoutButton = forwardRef((props, ref) => {
  const logout = useLogout();
  const handleClick = () => logout();
  return (
    // @ts-ignore
    <MenuItem onClick={handleClick} ref={ref} {...props}>
      <ExitIcon /> Logout
    </MenuItem>
  );
});
