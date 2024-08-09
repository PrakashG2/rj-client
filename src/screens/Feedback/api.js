// Copyright © 2022 G2 Tech, All Rights Reserved
import apiManager, { mainAxios } from '../../api';
import { API_METHODS } from '../../api/constants';

export const jobFeedBackApi = async (payload) => {
  // try {
  //   console.log("------------------------- _-__---_-_______------_", payload.page);

  // const { data } = await mainAxios.get(
  //   `${API_METHODS.GET_JOBS}?page=${payload.page}&limit=10`,
  //   payload
  // );

  const { jobId, rating, comment, base64data } = payload;

  
  const feedBackData = {
    jobId:jobId,
    rating:rating,
    comment:comment
  };

  const signatureData = {
    jobId: jobId,
    base64data: base64data,
  }

  console.log("########################################### --->s", feedBackData)

  // const  data  = await mainAxios.post(API_METHODS.POST_UPDATE_JOB, feedBackData);
  const sign = await mainAxios.post(API_METHODS.POST_JOB_FEEDBACK, feedBackData);
  const feedback = await mainAxios.post(API_METHODS.POST_JOB_FEEDBACK_SIGNATURE, signatureData);



//   console.log("**************************************", data)

  

    return sign;
  // } catch (error) {
  //   // If an error occurs, check if there's a response with an error message
  //   if (error.response && error.response.data && error.response.data.message) {
  //     const errorMessage = error.response.data.message;
  //     console.error("Error:", errorMessage);
  //     // You can handle the error message here, like displaying it to the user
  //     return { error: errorMessage };
  //   } else {
  //     // If there's no specific error message in the response, log the error object
  //     console.error("Error:", error);
  //     return { error: "An unexpected error occurred" };
  //   }
  // }
};

