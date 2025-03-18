"use server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";
import GIAQuery from "./GIAQuery";

const query = GIAQuery;
const variables = {
  ReportNumber: report_number
};  
 

async function getGIA(report_number) {
  const apiKey = process.env.REPORT_RESULTS_API_KEY;

  try {
    const response = await axios.post(process.env.REPORT_RESULTS_API_ENDPOINT, {
      query,
      variables
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      }
    });

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 

export default getGIA;
