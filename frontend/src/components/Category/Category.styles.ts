import { Button, Table, tokens } from "@fluentui/react-components"
import styled from "styled-components"

 export const Container = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingVerticalXL};
  `
  export const StyledTable= styled(Table)`
    max-width: 100%;
  ` 
  export const FormGroup = styled.div`
    display: flex;
    align-items: center;
    gap: ${tokens.spacingHorizontalM};
`
  export const StyledButton = styled(Button)`
    margin-top: ${tokens.spacingVerticalM};
`
  export const HiddenInput= styled.input`
    display: none;
    `
  export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
`;
