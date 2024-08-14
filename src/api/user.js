import axios from "axios";
import { successResponse, errorResponse } from "./responseHandler";
import { baseURL } from "./constants";

async function registerUser(data) {
  try {
    const response = await axios.post(`${baseURL}/user/register`, {
      ...data,
    });

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

async function login(loginDetails) {
  try {
    const response = await axios.post(`${baseURL}/user/login`, {
      ...loginDetails,
    });

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

export { registerUser, login };
