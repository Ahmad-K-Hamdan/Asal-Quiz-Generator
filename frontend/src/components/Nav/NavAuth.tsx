import React, { useContext } from 'react'
import { Button as FluentButton } from '@fluentui/react-components';
import { Navigation, Logo, LogoImage, Identity, Button } from './Nav.styles';
import logo from '../../assets/images/logo.png';
import { TokenContext } from '../../context/TokenContext';
function NavAuth() {
  const {setToken} = useContext(TokenContext);
  function handleLogout() {
    localStorage.removeItem('token');
    setToken('');
  }
  return (
    <Navigation>
      <Logo>
        <LogoImage src={logo} alt="logo" />
      </Logo>
      <Identity>
          <Button onClick={handleLogout} as={FluentButton} appearance="primary">
            Log out
          </Button>
      </Identity>
    </Navigation>
  )
}

export default NavAuth
