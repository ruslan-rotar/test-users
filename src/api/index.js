import { getPreparedParams } from "../utils/getPreparedParams";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = (params) => {
  const preparedParams = getPreparedParams(params);
  const url = `${BASE_URL}/users?` + new URLSearchParams(preparedParams);
  return fetch(url).then((response) => response.json());
};

export const getUserPosts = (userId, params) => {
  const preparedParams = getPreparedParams(params);
  const url =
    `${BASE_URL}/users/${userId}/posts?` + new URLSearchParams(preparedParams);
  return fetch(url).then((response) => response.json());
};

export const getUserAlbums = (userId, params) => {
  const preparedParams = getPreparedParams(params);
  const url =
    `${BASE_URL}/users/${userId}/albums?` + new URLSearchParams(preparedParams);
  return fetch(url).then((response) => response.json());
};
