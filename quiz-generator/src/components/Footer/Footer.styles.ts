import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #f1f1f1;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.95rem;
`;

export const FooterText = styled.p`
  margin-bottom: 1rem;
  color: #cccccc;
`;

export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 0;
`;

export const FooterListItem = styled.li`
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #00bfff;
  }
`;
