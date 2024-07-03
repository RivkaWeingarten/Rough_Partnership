// app/routes/api/rapnet.js

import axios from "axios";
import { getAuth } from "@clerk/nextjs/server"; // Assuming you're using getAuth directly

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

const handler = async (req, res) => {
  const { shape, size, color, clarity } = req.query;

  try {
    const { userId } = getAuth(req);

    // Ensure the user is authenticated via Clerk
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const token = await fetchLoginToken();

    const url = "https://technet.rapnetapis.com/pricelist/api/Prices";

    const response = await axios.get(url, {
      params: { shape, size, color, clarity },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from RapNet:", error);
    res.status(500).json({ error: "Failed to fetch data from RapNet" });
  }
};

export default handler;
