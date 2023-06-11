import { Card, CardActions, CardContent } from "@material-ui/core";
import * as React from "react";
import { useLogin, Button } from "react-admin";
import { Google } from "@mui/icons-material";

import "./index.css";
import { GoogleApiService } from "../../services/GoogleApiService";

const LoginPage = () => {
  const login = useLogin();

  React.useEffect(() => {
    const googleApiService = GoogleApiService.getInstance();
    if (googleApiService.isGoogleCallbackPage()) {
      const code = googleApiService.getCode();
      login({ code });
    }
  }, []);

  const onClick = () => {
    login({ codeRequest: true });
  };

  return (
    <div className="LoginPage">
      <Card className="LoginCard">
        <CardContent>Seems like you are not logged in yet</CardContent>
        <CardActions>
          <Button
            onClick={onClick}
            startIcon={<Google />}
            label="Login with Google"
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default LoginPage;
