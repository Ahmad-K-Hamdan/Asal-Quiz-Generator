import { QuizInfo, QuizQuestion } from "../../components/QuizGenerator/data/quiz";

export const GetQuizById = async (categoryId: number, quizId: number, setQuiz: React.Dispatch<React.SetStateAction<QuizInfo | null>>, setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/{category_id}/quizzes/${quizId}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        const quiz: QuizInfo = {
            id: data.id,
            name: data.name,
            level: data.level,
            path: data.path,
            category_id: data.category_id,
            created_at: data.created_at,
            questions: data.questions || [],
        };

        setQuiz(quiz);
        setQuestions(data.questions)
        return data;
    } catch (error) {
        console.error('Error during get quiz:', error);
        throw error;
    }
}
