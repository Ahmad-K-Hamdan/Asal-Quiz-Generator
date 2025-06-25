import { Answer } from "../../components/QuizGenerator/data/quiz";

export const SubmitQuizAttempt = async (categoryId:number,answers:Answer[]) => {
    console.log("Submitting quiz attempt with answers:", answers);
    console.log(localStorage.getItem('token'))
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/attempts`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                category_id: categoryId,
                answers: answers
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error during submit quiz:', error);
        throw error;
    }
}
