import React from 'react';
import {
  FooterContainer,
  FooterText,
  FooterList,
  FooterListItem
} from './Footer.styles';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2025 QuizGen AI. All rights reserved.</FooterText>
      <FooterList>
        <FooterListItem>Privacy Policy</FooterListItem>
        <FooterListItem>Terms of Use</FooterListItem>
        <FooterListItem>Support</FooterListItem>
      </FooterList>
    </FooterContainer>
  );
};

export default Footer;
