
export const GetAttemptById = async (attemptId:number) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/attempts/${attemptId}`, {
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
        return data;
    } catch (error) {
        console.error('Error during get attempt:', error);
        throw error;

    }
}
