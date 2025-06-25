export const StartQuiz = async (indexName:string) => {
   console.log(indexName)
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/quizzes/start?indexName=${indexName}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error during start quiz:', error);
        throw error;
    }
}
