
'use server'
import axios from 'axios';
import { auth } from "@clerk/nextjs/server";

// async function fetchLoginToken() {
//   const client_id = process.env.RAPKEY;
//   const client_secret = process.env.RAPSECRET;
//   const tokenUrl = "https://authztoken.api.rapaport.com/api/get";

//   try {
//     const { userId } = auth(); 

//     // Ensure the user is authenticated via Clerk
//     if (!userId) {
//       throw new Error("Not authenticated");
//     }

//     const response = await axios.post(tokenUrl, {
//       client_id,
//       client_secret,
//     });

//     return response.data.access_token; // Assuming the response includes a token field
//   } catch (error) {
//     console.error('Error fetching login token:', error);
//     throw error; // Rethrow the error for further handling or logging
//   }
// }

async function fetchLoginToken() {
  const client_id = process.env.RAPKEY;
  const client_secret = process.env.RAPSECRET;
  const tokenUrl = "https://authztoken.api.rapaport.com/api/get";

  try {
    const response = await axios.post(tokenUrl, {
      client_id,
      client_secret,
    });

    return response.data.access_token; // Assuming the response includes a token field
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Server responded with an error:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from server:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error setting up the request:", error.message);
    }
    throw error; // Rethrow the error for further handling or logging
  }
}

async function getRap(shape, size, color, clarity) {
  try {
    const token = await fetchLoginToken(); // Get access token
    console.log(`token ${token}`)
  

    const url = 'https://technet.rapnetapis.com/pricelist/api/Prices';
    const response = await axios.get(url, {
      params: { shape, size, color, clarity },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

        // Assuming response.data contains an array or object with 'caratprice' field
    const caratprice = response.data.caratprice;
    const listPrice = {
      caratprice: caratprice,
      totalListPrice: caratprice * size,
    };

    return listPrice;
  } catch (error) {
    console.error('Error fetching data from RapNet:', error);
    throw error; // Handle or log the error as needed
  }
}

export default getRap;
