import { QuizQuestion } from "../../components/QuizGenerator/data/quiz";

export const SaveQuiz = async (categoryId:number,quizName:string,difficulty:string,indexName:string,quiz:QuizQuestion[]) => {
    console.log(categoryId,quizName,difficulty,indexName,quiz);
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${categoryId}/quizzes`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: quizName,
                level: difficulty,
                index_name: indexName,
                questions: quiz
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error during adding category:', error);
        throw error;
    }
}
