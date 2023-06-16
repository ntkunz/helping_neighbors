import axios from "axios";
export default async function addSkills(arr, id) {

   const api = process.env.REACT_APP_API_URL;

   // Call the API to add user skills
   try {
      const response = await axios.post(
         `${api}/userskills`,
         {
            user_id: id,
            skills: arr,
         },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );
      return response;
   } catch (err) {
      console.log("Error adding skills: ", err);
   }
}