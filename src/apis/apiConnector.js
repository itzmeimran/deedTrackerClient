import axios from "axios";
export const axiosInstance = axios.create({});
export const apiConnector = (
  method,
  url,
  bodyData,
  headers,
  params,
  contentType = "application/json"
) => {
  const token = sessionStorage.getItem("token");
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": contentType,
      ...headers,
    },
    params: params ? params : null,
  });
};
