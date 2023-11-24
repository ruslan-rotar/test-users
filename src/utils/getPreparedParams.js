export const getPreparedParams = (params) => {
  const result = {};
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      result[key] = params[key];
    }
  });
  return result;
};
