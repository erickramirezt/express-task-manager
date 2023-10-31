class CustomApiError extends Error {
  constructor(message) {
    super(message);
  }
}

const createCustomError = (msg) => {
  return new CustomApiError(msg);
};

module.exports = { createCustomError, CustomApiError };
