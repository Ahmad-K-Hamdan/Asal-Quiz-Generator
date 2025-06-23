import {
  Field,
  Input,
  Link,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Title1,
} from '@fluentui/react-components';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { Container, LogoSection, FormContainer, Title, StyledLabel, StyledButton, ErrorMessage, Hint } from './SignUp.styles';
import { SignUpAPI } from '../../../APIs/Identity/SignUpAPI';
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}
function SignUp(): JSX.Element {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
    } else if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter')
    } else if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter')
    }
    else if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one Digit')
    }
    else if (!/[!@#$%^&*]/.test(password)) {
      setError('Password must contain at least one special character')
    }
    else {
      setError('')
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    SignUpAPI(formData, setError, setSuccess)
  }
  useEffect(() => {
    if (formData.password) {
      validatePassword(formData.password)
    }

  }, [formData.password])

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
          <Hint>Already have an account?
            <Link href='/login'> Login</Link>
          </Hint>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <StyledButton appearance="primary" type="submit" disabled={!formData.name || !formData.email || !formData.password || Boolean(error)}>
            Sign Up
          </StyledButton>
          {success && <MessageBar intent="success">
            <MessageBarBody>
              <MessageBarTitle>Sign Up Successfully!</MessageBarTitle>
            </MessageBarBody>
          </MessageBar>}
        </form>
      </FormContainer>
    </Container>
  );
}

export default SignUp;
