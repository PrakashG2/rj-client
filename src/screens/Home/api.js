// Copyright © 2022 G2 Tech, All Rights Reserved
import apiManager, { mainAxios } from '../../api';
import { API_METHODS } from '../../api/constants';

export const homeApi = async (payload) => {
  // try {
  //   console.log("------------------------- _-__---_-_______------_", payload.page);

  // const { data } = await mainAxios.get(
  //   `${API_METHODS.GET_JOBS}?page=${payload.page}&limit=10`,
  //   payload
  // );

  const { page, limit, priority, hold, escalated, completedFilter, draftFilter } = payload;

  // Construct the query parameters string
  const queryParams = new URLSearchParams({
    page: page,
    // limit: 20,
    // priority: '',
    // hold: hold || 0,
    // escalated: escalated || 0,
    ...(completedFilter ? { completed: 1 } : {}), // Add completed filter if completedFilter is truthy
    ...(draftFilter ? { draft: 0 } : {draft: 0}), // Add completed filter if completedFilter is truthy
  }).toString();

  // Construct the URL with the query parameters
  const url = `${API_METHODS.GET_JOBS}?${queryParams}`;

  const { data } = await mainAxios.get(url);


  

    return data;
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

export const updateJobApi = async (payload) => {
  
  const jobData = {
    jobId: payload.jobId,
    action: payload.action,
    timesheetId: payload.timesheetId ?? null,
  };

  console.log("###########################################", jobData)

  const { data } = await mainAxios.post(API_METHODS.POST_UPDATE_JOB, jobData);

  console.log("**************************************", data)


  

    return data;
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
