import { Category } from "../../components/Categories/Categories";

export const GetAllCategories = async (setCategories:React.Dispatch<React.SetStateAction<Category[]>>) => { 

     try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/details`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            const categories = data.categories;
            if(response.status === 200) {
                setCategories(categories);
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }


 }
