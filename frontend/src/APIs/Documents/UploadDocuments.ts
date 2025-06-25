export const UploadDocuments = async (categoryId:number,file:File) => {   
    const formData = new FormData();
    formData.append('files', file);

    try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${categoryId}/documents?status_code=201`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
            });
            console.log(response);  

            if(response.status === 200) {
                // alert("Document uploaded successfully");
                
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during upload document:', error);

            throw error;
        }
}