import { QuizAttempt } from "../../components/QuizGenerator/data/quiz";

export const GetAttempts = async (id:number,setCompletedQuizzes:React.Dispatch<React.SetStateAction<QuizAttempt[]>>) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/attempts?category_id=${id}`, {
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
        console.error('Error during get attempts:', error);
        throw error;
    }
}
