class Response {
  constructor(statusCode, data, errorMessage) {
    this.statusCode = statusCode;
    this.data = data;
    this.errorMessage = errorMessage;
  }
}

function successResponse(apiResponse) {
  return new Response(apiResponse.status, apiResponse.data);
}

function errorResponse(apiResponse) {
  return new Response(
    apiResponse.status,
    apiResponse.data,
    apiResponse.data.message
  );
}

export { successResponse, errorResponse };
