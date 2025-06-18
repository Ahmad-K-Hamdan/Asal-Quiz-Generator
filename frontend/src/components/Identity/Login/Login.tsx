import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Field,
  Input,
  Link,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Title1,
} from '@fluentui/react-components';
import logo from '../../../assets/images/logo.png';
import {
  Container,
  LogoSection,
  FormContainer,
  Title,
  StyledLabel,
  StyledButton,
  ToggleIcon,
  PasswordWrapper,
} from './Login.styles';
import { LoginAPI } from '../../../APIs/Identity/LoginAPI';
import { ErrorMessage, Hint } from '../SignUp/SignUp.styles';
import { Eye16Regular, EyeOff16Regular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

type LoginFormData = {
  email: string;
  password: string;
};


function Login(): JSX.Element {
  const navigate = useNavigate() 
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoginAPI(formData, setError, setSuccess, navigate);
  };

  return (
    <Container>
      <LogoSection>
        <img src={logo} alt="Logo" height={60} />
        <Title1>Quiz Generator</Title1>
      </LogoSection>

      <FormContainer>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Field label={<StyledLabel>Email</StyledLabel>}>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Field>

          <Field label={<StyledLabel>Password</StyledLabel>}>
          <PasswordWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={{width: '100%'}}
            />
            <ToggleIcon onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <EyeOff16Regular /> : <Eye16Regular />}
            </ToggleIcon>
            </PasswordWrapper>
          </Field>
          <Hint>Doesn't have an account?
            <Link href='/signup'>Signup</Link>
          </Hint>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <StyledButton disabled={!formData.email || !formData.password} appearance="primary" type="submit">
            Login
          </StyledButton>
          {success && <MessageBar intent="success">
            <MessageBarBody>
              <MessageBarTitle>Login Successfully!</MessageBarTitle>
            </MessageBarBody>
          </MessageBar>}

        </form>
      </FormContainer>
    </Container>
  );
}

export default Login;
