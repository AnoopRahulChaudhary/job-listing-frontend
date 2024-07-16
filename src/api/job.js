import axios from "axios";
import { successResponse, errorResponse } from "./responseHandler";

const baseURL = "http://localhost:4000";

async function getJobs({title, skills}) {
    try {
        const response = await axios.get(`${baseURL}/job`, {params : {title, skills}})
        console.debug(response);
        return successResponse(response);
    }catch(error) {
        console.error(error);
        if (error.response) {
            return errorResponse(error.response);
        }

        throw error;
    }
    
}

async function getJob(id) {
  try {
      console.debug(`received id to fetch data : ${id}`);
      const response = await axios.get(`${baseURL}/job/${id}`);
      console.debug(response);
      return successResponse(response);
  }catch(error) {
      console.error(error);
      if (error.response) {
          return errorResponse(error.response);
      }

      throw error;
  }
  
}

async function addJob(jobDetails) {
  try {
    const config = {
      headers: {
        Authorization: window.sessionStorage.getItem("token"),
      },
    };
    const response = await axios.post(
      `${baseURL}/job/add`,
      { ...jobDetails },
      config
    );
    console.debug(response);
    return successResponse(response);
  } catch (error) {
    console.error(error);
    if (error.response) {
      return errorResponse(error.response);
    }

    throw error;
  }
}

export {addJob, getJobs, getJob}