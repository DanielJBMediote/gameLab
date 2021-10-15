import React, { FormEvent } from "react";
import AsideLayout from "../components/AsideLayout";
import GameLogo from "../assets/gameLab_logo.svg";
import RegisterPageImage from "../assets/horrorImage.svg";
import { InputText } from "../components/CustomInputs";
import { FlatButton } from "../components/CustomButtons";
import { useHistory } from "react-router";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";
import { Axios } from "../services/axios";

export default function RegisterPage() {
  const [customAlert, setCustomAlert] = React.useState("");
  const [registerForm, setRegisterForm] = React.useState({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingInput, setIsLoadingInput] = React.useState<boolean>(false);
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  if (user) {
    history.push("/home");
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setRegisterForm({ ...registerForm, [name]: value });
  }

  async function handleBlur(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "username") {
      setIsLoadingInput(true);

      await Axios.get(`/users/username-check/${value}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoadingInput(false);
        });
    }

    target.className = value === "" ? "required" : "";
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    // if (
    //   Object.values(registerForm)[0] === "" ||
    //   Object.values(registerForm)[1] === ""
    // ) {
    //   return;
    // }

    // setLoading(true);

    event.preventDefault();
  }

  return (
    <div>
      <AsideLayout
        imageUrl={RegisterPageImage}
        text="Uma nova forma de conectar com seus amigos"
      />
      <div className="form-modal">
        <img src={GameLogo} alt="Logo" />
        <form>
          <div className="form-login">
            <InputText
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Username"
              className="spinner"
              haveSpinner={isLoadingInput}
            />
            <InputText
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="E-mail"
            />
            <InputText
              type="password"
              name="repeat_password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
            />
            <InputText
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Reapeat Password"
            />
            <p className="alert">{customAlert}</p>
            <FlatButton type="button" onClick={handleSubmit}>
              {isLoading ? <span className="spinner"></span> : "Entrar"}
            </FlatButton>
          </div>
        </form>
        <div>
          <p>Já tem cadastro? &nbsp;</p>
          <Link to="/login">Entrar agora</Link>
        </div>
      </div>
    </div>
  );
}
