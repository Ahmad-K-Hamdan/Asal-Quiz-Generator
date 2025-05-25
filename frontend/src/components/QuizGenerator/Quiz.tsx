import React, { useState } from 'react'
import { Btn, ButtonsContainer, Choice, Container, Question, QuizContainer, Title } from './Quiz.styles';
import { Button, Radio, RadioGroup } from '@fluentui/react-components';
import {initialQuiz} from './data/quiz'

const Quiz = () => {
  const [quiz,setQuiz] =useState(initialQuiz)
  
      const [isStart,setIsStart] =useState(false)
      const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

      function handleStartQuiz(){
        setIsStart(true)
      }
      function handleClear(questionNumber: number){
        setSelectedAnswers({
          ...selectedAnswers,
          [questionNumber] : ''
        })
      }
      function handleRegenerate(questionNumber :number){
        const newQuiz = quiz.map((question)=>{
          if(question.number === questionNumber){
            return {
              number: questionNumber,
              question: 'What is the chemical symbol for gold?',
              choices: ['Au', 'Ag', 'Gd', 'Go'],
              type: 'multiple-choice',
              answer: 'Au'
            }
          }else 
          return question
        })
        setQuiz(newQuiz)
      }
   
  return (
    <QuizContainer>
        <Title>Quiz</Title>
        {quiz.map((question)=>(
            <Container className='question-container'>
                <Question className='question'>{question.number}.{question.question}</Question>
                {!isStart ? <ul className='choices'>
                    {question.choices.map((choice)=>(
                        <Choice>{choice}</Choice>
                    ))}
                </ul> :(
                  <RadioGroup 
                  value={selectedAnswers[question.number] || ''}
                  onChange={(e,data)=>setSelectedAnswers({...selectedAnswers, [question.number]:data.value})}>
                    {question.choices.map((choice)=>(
                        <Radio key={choice} value={choice} label={choice} />
                    ))}
                  </RadioGroup>
                )}
                <ButtonsContainer>
                {!isStart? <Button onClick={()=>handleRegenerate(question.number)}>Regenerate Question</Button> :<Button onClick={()=>handleClear(question.number)}>Clear Answer</Button>}
                </ButtonsContainer>
            </Container>
        ))}
        {!isStart ? <Btn onClick={handleStartQuiz}>Start Quiz</Btn> :<Btn>Finish Attempt</Btn>}
      
    </QuizContainer>
  )
}

export default Quiz
