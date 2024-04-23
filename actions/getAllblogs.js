import axios from 'axios';

async function getAllBlogs() {
  try {
    const data = await axios.get('/api/compose');
    // Check if data is undefined, and return an empty array if it is
    if (data === undefined) {
      return [];
    }

    return data; // Assuming your API returns an array of blog objects
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}
export default getAllBlogs;
