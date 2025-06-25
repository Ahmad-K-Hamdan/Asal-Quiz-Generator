import { Card } from "@fluentui/react-components";
import { NavDrawer } from "@fluentui/react-nav-preview";
import styled from "styled-components";

export const Root = styled.div`
display: flex;
  `;

export const Nav = styled(NavDrawer)`
 min-width: 200px;
    height: 100vh;
    `;
export const Content = styled.div`
     flex: 1;
    padding: 16px;
    `;

//     export const WelcomeHeading = styled.div`
//   margin-top: 16px;
// `;

// export const SubText = styled.div`
//   margin-top: 4px;
// `;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 16px;
`;

export const StatContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

export const StatCard = styled(Card)`
  min-width: 150px;
  padding: 16px;
  text-align: center;
`;