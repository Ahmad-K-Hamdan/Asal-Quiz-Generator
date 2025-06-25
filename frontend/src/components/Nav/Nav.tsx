
import { useContext } from 'react';
import { TokenContext } from '../../context/TokenContext';
import NavAuth from './NavAuth';
import NavQuest from './NavQuest';

function Nav() {
  const {token} = useContext(TokenContext);
  return (
    token ? <NavAuth /> : <NavQuest />
   
  );
}

export default Nav;
