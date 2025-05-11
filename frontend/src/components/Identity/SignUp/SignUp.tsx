import {
  Field,
  Input,
  Title1,
} from '@fluentui/react-components';
import  { ChangeEvent, FormEvent, useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { Container, LogoSection, FormContainer, Title, StyledLabel, StyledButton } from './SignUp.styles';
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}
function SignUp() : JSX.Element{

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
  }

  return (
    <Container>
      <LogoSection>
        <img src={logo} alt="Logo" height={60} />
        <Title1>Quiz Generator</Title1>
      </LogoSection>

      <FormContainer>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
          <Field label={<StyledLabel>Name</StyledLabel>}>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </Field>

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

          <Field label={<StyledLabel>Confirm Password</StyledLabel>}>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </Field>

          <StyledButton appearance="primary" type="submit">
            Sign Up
          </StyledButton>
        </form>
      </FormContainer>
    </Container>
  );
}

export default SignUp;
