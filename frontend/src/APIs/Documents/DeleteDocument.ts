
export const DeleteDocument = async (documentId:number) => {
     try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/documents/${documentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Response status:', response);

            if(response.status === 204) {
                // alert('Document deleted successfully');
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Error during delete document:', error);

            throw error;
        }



  }