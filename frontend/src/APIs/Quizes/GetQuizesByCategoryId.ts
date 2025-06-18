import { Quiz } from "../../components/Quizes/Quizes";

export const GetQuizesByCategoryId = async (categoryId:number,setAvailableQuizzes:React.Dispatch<React.SetStateAction<Quiz[]>>) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${categoryId}/quizzes`, {
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
        setAvailableQuizzes(data);
        return data;
    } catch (error) {
        console.error('Error during adding category:', error);
        throw error;
    }
}
