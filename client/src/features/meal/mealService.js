import axios from "axios"

 const fetchMeal = async (mid) => {
    const response = await axios.get('/api/meal/'+mid)
    return response.data
}

const fetchMeals = async (token) => {
     
    const options = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    }
   const response = await axios.get('/api/meal/',options );
   return response.data;
 };


const mealService = { fetchMeal , fetchMeals }

export default mealService
