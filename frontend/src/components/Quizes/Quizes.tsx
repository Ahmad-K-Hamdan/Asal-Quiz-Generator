import React, { useEffect } from 'react';
import {
  Text,
  Title2,
  Subtitle1,
  Button,
  Divider,
} from "@fluentui/react-components";
import { QuizCard, Section } from './Quizes.styles';
import { useParams } from 'react-router-dom';
import { GetQuizesByCategoryId } from '../../APIs/Quizes/GetQuizesByCategoryId';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { GetAttempts } from '../../APIs/Quizes/GetAttempts';

export type Quiz = {
  name: string,
  level: string,
  id: number,
  path: string,
  category_id: number,
  created_at: string,
}
export type QuizAttempt = {
  id: number,
  submitted_at: string
}



const Quizes: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [availableQuizzes, setAvailableQuizzes] = React.useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = React.useState<QuizAttempt[]>([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    GetQuizesByCategoryId(parseInt(id), setAvailableQuizzes)
      .finally(() => {
        setLoading(false);
      }
      );
    setLoading(true);
    GetAttempts(setCompletedQuizzes)
      .finally(() => {
        setLoading(false);
      });

  }, [id])


  return (
    <Section>
      <Title2>Quizzes</Title2>
      <Divider />

      <Section>
        <Subtitle1>Available Quizzes</Subtitle1>
        {loading ? <Spinner label="Loading Quizes..." size={SpinnerSize.medium} /> : availableQuizzes.length === 0 ? (
          <Text>No pending quizzes.</Text>
        ) : (
          availableQuizzes.map((quiz) => (
            <QuizCard key={quiz.id}>
              <Text size={400} weight="bold" block>
                {quiz.name.toUpperCase()}
              </Text>
              <Text size={300} weight="regular" block >
                Difficulty: {quiz.level}
              </Text>
              <div style={{ marginTop: 8 }}>
                <Button appearance="primary">Start Quiz</Button>
              </div>
            </QuizCard>
          ))
        )}
      </Section>

      <Divider style={{ marginTop: 32, marginBottom: 16 }} />

      <Section>
        <Subtitle1>Attempts</Subtitle1>
        {loading ? <Spinner label="Loading Attempts..." size={SpinnerSize.medium} /> : completedQuizzes.length === 0 ? (
          <Text>No attempts yet.</Text>
        ) : (
          completedQuizzes.map((quiz) => (
            <QuizCard key={quiz.id}>
              <Text weight="semibold">{quiz.id}</Text>
              <Text>
                Completed on: {new Date(quiz.submitted_at).toLocaleDateString()}
              </Text>
              <div style={{ marginTop: 8 }}>
                <Button appearance="secondary">View Quiz</Button>
              </div>
            </QuizCard>
          ))
        )}
      </Section>
    </Section>
  );
};

export default Quizes;
