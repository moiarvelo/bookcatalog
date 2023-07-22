import axios from "axios";

  const axiosFetch = axios.create({
    baseURL: "https://laravel-api-lyart.vercel.app/api/api",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
        
  });
  
  export default axiosFetch;