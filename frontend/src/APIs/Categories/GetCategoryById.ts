export const GetCategoryById = async (categoryId:number,setCategoryName:React.Dispatch<React.SetStateAction<string>>) => { 

     try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${categoryId}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            const name = data.name;
            if(response.status === 200) {
                setCategoryName(name);
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return data;
        } catch (error) {
            console.error('Error during get category:', error);
            throw error;
        }


 }
