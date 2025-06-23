import { QuizAttempt } from "../../components/Quizzes/Quizzes";

export const GetAttempts = async (setCompletedQuizzes:React.Dispatch<React.SetStateAction<QuizAttempt[]>>) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/attempts`, {
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
        setCompletedQuizzes(data);
        return data;
    } catch (error) {
        console.error('Error during adding category:', error);
        throw error;
    }
}
