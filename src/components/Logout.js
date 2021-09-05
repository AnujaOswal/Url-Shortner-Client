import { useEffect } from "react";
import { useHistory } from "react-router";

export default function Logout(props) {
  const history = useHistory();

  useEffect(() => {
    if (!props.login) {
      history.push("/");
    } else {
      const logout = async () => {
        try {
          await fetch("https://db-url-shortner.herokuapp.com/signout", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          props.setLogin(false);
          history.push("/", { replace: true });
        } catch (err) {
          console.log(err);
        }
      };

      logout();
    }
  });
  return <div></div>;
}