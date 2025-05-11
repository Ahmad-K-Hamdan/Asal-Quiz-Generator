import  { useState, ChangeEvent, FormEvent } from 'react';
import {
  Field,
  Input,
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
} from './Login.styles';

type LoginFormData = {
  email: string;
  password: string;
};

function Login(): JSX.Element {
  const [formData, setFormData] = useState < LoginFormData > ({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
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
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </Field>

          <StyledButton appearance="primary" type="submit">
            Login
          </StyledButton>
        </form>
      </FormContainer>
    </Container>
  );
}

export default Login;
