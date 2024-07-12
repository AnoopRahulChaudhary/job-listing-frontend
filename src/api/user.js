import axios from "axios";

const baseURL = "http://localhost:4000";

async function registerUser(data) {
  try {
    const response = await axios.post(`${baseURL}/user/register`, {
      ...data,
    });

    console.debug(response);
    return response;
  } catch (error) {
    console.error(error);

    if (error.response) {
      return error.response;
    }

    throw error;
  }
}

export { registerUser };
