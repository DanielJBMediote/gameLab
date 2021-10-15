import React, { FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../App";
import GameLogo from "../assets/gameLab_logo.svg";
import LoginPageImage from "../assets/LoginPageImage.svg";
import AsideLayout from "../components/AsideLayout";
import { FlatButton } from "../components/CustomButtons";
import { InputText } from "../components/CustomInputs";

export default function LoginPage() {
  const [customAlert, setCustomAlert] = React.useState("");
  const [loginForm, setLoginForm] = React.useState({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { user, apiSignIn } = React.useContext(AuthContext);
  const history = useHistory();

  if (user) {
    history.push("/home");
  }

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setLoginForm({ ...loginForm, [name]: value });
  }

  async function handleBlur(
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // const name = target.name;

    target.className = value === "" ? "required" : "";
  }
  
  async function handleSubmit(event: FormEvent): Promise<void> {

    setIsLoading(true);

    apiSignIn(loginForm)
      .then((response) => {
        
        localStorage.setItem("auth-token", response.data.token);
        history.push("/home");
      })
      .catch((error) => {
        
        if ([400, 401, 422].includes(error.response.status)) {
          setCustomAlert(error.response.data.error.msg);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })

    event.preventDefault();
  }

  return (
    <div>
      <AsideLayout
        imageUrl={LoginPageImage}
        text="Uma nova forma de conectar com seus amigos"
      />
      <div className="form-modal">
        <img src={GameLogo} alt="Logo" />
        <form>
          <div className="form-login">
            <InputText
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="E-mail"
              disabled={isLoading}
              />
            <InputText
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Senha"
              disabled={isLoading}
            />
            <p className="alert">{customAlert}</p>
            <FlatButton disabled={isLoading} type="button" onClick={handleSubmit}>
              {isLoading ? <span className="spinner"></span> : "Entrar"}
            </FlatButton>
          </div>
        </form>
        <div>
          <p>É novo na area? &nbsp;</p>
          <Link to="/register">Criar conta</Link>
        </div>
      </div>
    </div>
  );
}
