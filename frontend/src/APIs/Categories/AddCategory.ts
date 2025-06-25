export const AddCategory = async (category:string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: category,
            }),
        });

        console.log(response);

        if (response.status === 200) {
            // alert("Category added successfully");
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during adding category:', error);
        throw error;
    }
}
