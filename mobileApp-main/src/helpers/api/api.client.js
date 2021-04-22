import axios from 'axios';
import { getToken } from 'helpers/storage';
import { Alert } from 'react-native';

import config from 'resources/config';

import ApiError from './api.error';

const axiosClient = axios.create({
  baseURL: config.apiUrl,
});

const eventHandlers = new Map();

function isNetworkError(err) {
  return !!err.isAxiosError && !err.response;
}

// Do not throw errors on 'bad' server response codes
axiosClient.interceptors.response.use(
  (axiosConfig) => axiosConfig,
  (error) => {
    const errorResponse = error.response || {
      status: error.code,
      statusText: error.message,
      data: error.data,
    };

    const errorHandlers = eventHandlers.get('error') || [];
    errorHandlers.forEach((handler) => {
      handler(errorResponse);
    });

    return error.response || {};
  },
);

axiosClient.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

const serverError =
  'Server returned an error. Please, contact the support team.';
const connectionError =
  'Connection error. Please, check your Internet connection.';

const throwApiError = ({ data = {}, status = 500 }) => {
  throw new ApiError(data, status);
};

const httpRequest = (method) => async (url, data) => {
  const options = {
    method,
    url,
  };

  if (data) {
    if (data.blob) {
      options.responseType = 'blob';
    }

    if (method === 'get') {
      options.params = data;
    } else {
      options.data = data;
    }
  }

  const axiosResponse = await axiosClient(options);

  if (isNetworkError(axiosResponse)) {
    Alert.alert('', connectionError);
    throwApiError({
      data: { errors: [] },
      status: 500,
    });
    return null;
  }

  const response = {};
  response.data = axiosResponse.data || {};
  response.status = axiosResponse.status || 500;

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  if (response.status === 400) {
    throwApiError(response);
  }

  if (response.status === 500) {
    Alert.alert('', serverError);
    throwApiError({
      data: { errors: [] },
      status: 500,
    });
  }

  if (!axiosResponse.data.errors) {
    Alert.alert('', serverError);
  }
  response.data.errors = axiosResponse.data.errors || [];
  throwApiError(response);
  return null;
};

export const getRequest = httpRequest('get');
export const postRequest = httpRequest('post');
export const putRequest = httpRequest('put');
export const patchRequest = httpRequest('patch');
export const deleteRequest = httpRequest('delete');

const apiClient = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
  patch: patchRequest,
  on: (event, handler) => {
    if (eventHandlers.has(event)) {
      eventHandlers.get(event).add(handler);
    } else {
      eventHandlers.set(event, new Set([handler]));
    }

    return () => eventHandlers.get(event).remove(handler);
  },
};

export default apiClient;
