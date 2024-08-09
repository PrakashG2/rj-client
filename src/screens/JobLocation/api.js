// import axios from 'axios';
// import { Alert } from 'react-native';
// import { put } from 'redux-saga/effects';

// // Function to fetch job location data using address
// export const jobLocationApi = async (payload) => {
//   try {

//     // Destructure payload to extract address
//     const { jobLocation } = payload;

//     // API key for accessing the geocoding service
//     const apiKey = "6637be848d10e873456642izt87e9f3";

//     console.log("[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]", jobLocation)
//     console.log("[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]", data)

  
//     // Construct the URL with the query parameters
//     const url = `https://geocode.maps.co/search?q=${jobLocation}&api_key=${apiKey}`;


    
  
//     // Make GET request to fetch location data
//     const { data } = await axios.get(url);


  
//     // Return the fetched data
//     return {lat: data[0].lat, long: data[0].lon};
//   } catch (error) {
//     // If an error occurs, log the error
//     console.error("Error fetching job location data:", error);

   

//     // Return an object with error information
//     return { error: "An unexpected error occurred while fetching job location data" };
//   }
// };

import axios from 'axios';
import { Alert } from 'react-native';

// Define default latitude and longitude values
const DEFAULT_LATITUDE = 37.78825;
const DEFAULT_LONGITUDE = -122.4324;

export const jobLocationApi = async (payload) => {
  try {
    const { jobLocation } = payload;
    const apiKey = "6637be848d10e873456642izt87e9f3"; // Replace with your actual API key

    const encodedLocation = encodeURIComponent(jobLocation); // Encode address for URL

    // const url = `https://geocode.xyz/search?q=${encodedLocation}&auth=${apiKey}&json=1`;
        const url = `https://geocode.maps.co/search?q=${jobLocation}&api_key=${apiKey}`;


    console.log("Fetching job location data from URL:", url);

    const { data } = await axios.get(url);

    console.log("Received data from API:", data);

    // Check if the response contains valid data
    if (data && data.length > 0 && data[0].lat && data[0].lon) {
      console.log("Valid data found in response. Latitude:", data[0].lat, "Longitude:", data[0].lon);
      return { lat: parseFloat(data[0].lat), long: parseFloat(data[0].lon) };
    } else {
      console.log("Invalid or empty response. Returning default latitude and longitude.");
      // If the response is invalid, return default lat long
      return { lat: DEFAULT_LATITUDE, long: DEFAULT_LONGITUDE };
    }
  } catch (error) {
    console.error("Error fetching job location data:", error);
    // Return an object with error information
    return { error: "An unexpected error occurred while fetching job location data" };
  }
};
