
export const DeleteAttempt = async (attemptId: number) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/attempts/${attemptId}`, {
            method: 'DELETE',
            headers: {
                'accept': ' */*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error during delete attempt:', error);
    }
}
