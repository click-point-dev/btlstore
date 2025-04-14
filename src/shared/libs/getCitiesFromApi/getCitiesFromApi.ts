export async function getCitiesFromApi(url: string) {
   try {
      const response = await fetch(url, {
         method: 'GET',
      });
      if (response.ok) {
         const data = await response.json();
         // console.log(data);
         return data;
      }
   } catch (error) {
      console.error('Error fetching cities:', error);
   }
}
