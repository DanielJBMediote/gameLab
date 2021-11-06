import React, { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Message } from 'semantic-ui-react';
import { AuthContext } from '@src:Contexts/AuthContextProvider';
import GameLogo from '@src:Assets/logo.svg';
import AnimatedBackground from '@src:Components/AnimatedBackground';
import { CustomButton } from '@src:Components/Buttons';

export default function LoginPage() {
  const [error, setError] = React.useState({ status: false, message: '' });
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user, apiSignIn } = React.useContext(AuthContext);
  const history = useHistory();

  if (user) {
    history.push('/home');
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setData({ ...data, [name]: value });
  }

  async function handleBlur(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    target.className = value === '' ? 'required' : '';
  }

  /**
   * Submit function to Post new User
   * @param event
   */
  async function handleSubmit(event: FormEvent): Promise<void> {
    setIsLoading(true);

    await apiSignIn(data).catch((error: { response: { status: number; }; }) => {
      if ([400, 401, 422].includes(error.response.status)) {
        setError({ status: true, message: 'Invalid username or password' });
      }
    });
    setIsLoading(false);

    event.preventDefault();
  }

  return (
    <>
      <div className="container">
        <AnimatedBackground />
        <div className="form-modal">
          <div>
            <img src={GameLogo} alt="Logo" />
            <Form error={error.status}>
              <div className="form-inputs">
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="E-mail"
                  iconPosition="left"
                  icon="user"
                  size="large"
                  disabled={isLoading}
                />
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  iconPosition="left"
                  loading={isLoading}
                  n="left"
                  icon="key"
                  size="large"
                  disabled={isLoading}
                />
                <Message error content={error.message} floating />
                <CustomButton
                  styles={{ color: 'primary', size: 'medium' }}
                  className="btn-primary"
                  onClick={handleSubmit}
                  loading={isLoading}
                  label="Sign In"
                />
              </div>
            </Form>
            <div className="form-links">
              <p>Does not have account? &nbsp;</p>
              <Link to="/register">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
