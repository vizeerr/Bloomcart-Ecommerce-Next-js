import axios from 'axios';

const getAuthData = async () => {
    try {
        const response = await axios.get('/api/user'); // Replace with your actual API endpoint
        if (!response.data.error) {
            return response.data.data
        }
        return false; // Return false if user is not an admin or if there was an error
    } catch (error) {
        console.error('Error fetching initial profile data:', error);
        return false; // Return false in case of any error
    }
};

export default getAuthData;
