import React, { FormEvent } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Input, Message } from 'semantic-ui-react';
import { AuthContext } from '@src:Contexts/AuthContextProvider';
import GameLogo from '@src:Assets/logo.svg';
import AnimatedBackground from '@src:Components/AnimatedBackground';
import { CustomButton } from '@src:Components/Buttons';
import { Axios } from '@src:Services/Axios';

export default function RegisterPage() {
  const [error, setError] = React.useState({ status: false, msg: '' });
  const [isInputUsername, setInputUsername] = React.useState({
    loading: false,
    detail: {},
  });
  const [registerData, setRegisterData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  if (user) {
    history.push('/home');
  }

  async function handleBlur(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'username') {
      Axios.get('');
    }

    setRegisterData({ ...registerData, [name]: value });
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    setIsLoading(true);

    Axios.post('/users', registerData)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        if ([400, 401, 422].includes(error.response.status)) {
          setError({ status: true, msg: 'deu pau' });
          console.log(error.response.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    event.preventDefault();
  }

  return (
    <div className="container">
      <AnimatedBackground />
      <div className="form-modal">
        <div>
          <img src={GameLogo} alt="Logo" />
          <Form error={error.status}>
            <div className="form-inputs">
              <Input
                name="username"
                placeholder="Username"
                onBlur={handleBlur}
                icon="user"
                iconPosition="left"
                size="large"
                type="text"
                loading={isInputUsername.loading}
                disabled={isLoading}
              />
              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                onBlur={handleBlur}
                icon="envelope"
                iconPosition="left"
                size="large"
                disabled={isLoading}
              />
              <Input
                type="password"
                name="repeat_password"
                onBlur={handleBlur}
                placeholder="Password"
                icon="key"
                iconPosition="left"
                size="large"
                disabled={isLoading}
              />
              <Input
                type="password"
                name="password"
                onBlur={handleBlur}
                iconPosition="left"
                placeholder="Repeat Password"
                icon="key"
                size="large"
                disabled={isLoading}
              />
              <Message error content={error.msg} compact />
              <CustomButton
                styles={{color: 'primary', size: 'medium'}}
                loading={isLoading} onClick={handleSubmit} label="Sign Up" />
            </div>
          </Form>
          <div className="form-links">
            <p>Already have an account? &nbsp;</p>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
