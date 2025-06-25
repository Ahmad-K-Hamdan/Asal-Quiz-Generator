import * as React from 'react';
import { Text } from '@fluentui/react-components';
import { ContentContainer, StatContainer,StatCard  } from './Dashboard.styles';



const DashboardContent = ({
  userName,
  categoriesCount,
  documentsCount,
  quizzesCount,
  attemptsCount,
}: {
  userName: string;
  categoriesCount: number;
  documentsCount: number;
  quizzesCount: number;
  attemptsCount: number;
}) => {
  return (
    <ContentContainer>
      <Text size={700} weight="bold">Welcome back, {userName}!</Text>
      <Text size={400} block>Here’s a quick overview of your dashboard.</Text>

      <StatContainer>
        <StatCard>
          <Text weight="semibold">Categories</Text>
          <Text>{categoriesCount}</Text>
        </StatCard>
        <StatCard>
          <Text weight="semibold">Documents</Text>
          <Text>{documentsCount}</Text>
        </StatCard>
        <StatCard>
          <Text weight="semibold">Quizzes</Text>
          <Text>{quizzesCount}</Text>
        </StatCard>
        <StatCard>
          <Text weight="semibold">Attempts</Text>
          <Text>{attemptsCount}</Text>
        </StatCard>
      </StatContainer>
    </ContentContainer>
  );
};

export default DashboardContent;