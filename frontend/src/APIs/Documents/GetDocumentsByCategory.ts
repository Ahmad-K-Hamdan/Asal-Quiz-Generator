import { Document } from "../../components/Category/Category";

export const GetDocumentsByCategory = async (categoryId:number,setDocuments:React.Dispatch<React.SetStateAction<Document[]>>) => {

    try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${categoryId}/documents`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                            });

            const data = await response.json();
            console.log(data);
            console.log(response.status);
            if(response.status === 200) {
                setDocuments(data);
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
