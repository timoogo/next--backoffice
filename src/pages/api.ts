// api.ts
export const fetchStatData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log({data});
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data. Please try again later.');
    }
  };
  