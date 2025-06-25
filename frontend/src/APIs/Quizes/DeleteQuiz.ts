
export const DeleteQuiz = async (quizId: number) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/quizzes/${quizId}`, {
            method: 'DELETE',
            headers: {
                'accept': ' */*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        if (response.status === 204) {
            // alert('Quiz deleted successfully');
        }

    } catch (error) {
        console.error('Error during delete quiz:', error);
        throw error;
    }
}
