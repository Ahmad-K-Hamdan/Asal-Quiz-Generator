import { Button, Title1, tokens } from "@fluentui/react-components";
import styled from "styled-components";


export const Choice = styled.li`
list-style-type:upper-alpha;
padding:5px;

&:hover{
background-color:rgba(0,0,0,0.05)
}
`
export const Question = styled.p`
font-weight:bold;
font-size:1rem
`

export const Container = styled.div`
border: 1px solid lightgray;
border-radius:10px;
padding:10px;
margin:10px;
background-color:white
`
export const QuizContainer = styled.div`
background-color: ${tokens.colorNeutralBackground1Hover}
`
export const Title = styled(Title1)`
text-align:center;
display:block;
padding:10px;
`

export const ButtonsContainer = styled.div`
display:flex;
justify-content:flex-end;
gap:20px
`

export const Btn = styled(Button)`
margin:10px
`