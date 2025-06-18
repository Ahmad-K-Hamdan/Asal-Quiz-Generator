
export type QuizQuestion = {
  question_number: number;
  question: string;
  type: 'multiple_choice' | 'short_answer';
  choices: string[];
  correct_answer: string;
  explanation: string;
}
export type Answer = {
  question_number: number;
  question: string;
  type: 'multiple_choice' | 'short_answer';
  choices: string[];
  correct_answer: string;
  explanation: string;
  user_answer: string
}
