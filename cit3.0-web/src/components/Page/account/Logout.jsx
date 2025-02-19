import { useHistory } from "react-router-dom";

export const LogoutPage = () => {
  const history = useHistory();
  history.push("/");
  return <></>;
};

export default LogoutPage;
