const API_BASE_URL = "https://uxcandy.com/~shapoval/test-task-backend/v2";
const DEVELOPER = "Diana";

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJSON = (res) => res.json();

const injectDeveloperName = (path) => {
  const newPath = new URL(path);
  newPath.searchParams.set("developer", DEVELOPER);
  return newPath.toString();
};

function ServerValidateException(payload) {
  this.payload = payload;
  this.message = "Запрос завершился ошибкой";
}

const validateServerResponse = (response) => {
  if (response.status === "ok") {
    return response;
  }
  if (response.status === "error") {
    throw new ServerValidateException(response);
  }
  throw new Error("Server response validation error");
};

const Fetcher = {
  get: (path, params) => {
    const processedPath = injectDeveloperName(API_BASE_URL + path);
    return fetch(processedPath, params)
      .then(checkStatus)
      .then(parseJSON)
      .then(validateServerResponse);
  },
  post: (path, data, params) => {
    const processedPath = injectDeveloperName(API_BASE_URL + path);

    const formData = new FormData();

    Object.keys(data).map((key) => formData.append(key, data[key]));

    return fetch(processedPath, {
      ...params,
      method: "POST",
      body: formData,
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(validateServerResponse);
  },
};



export const getTasks = async (page = 0, sortField, sortDirection) => {
  const result = await Fetcher.get(
    `/?page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`
  );
  return result.message;
};

export const addTask = async (username, email, text) => {
  const result = await Fetcher.post(`/create`, {
    username,
    email,
    text,
  });

  return result.message;
};

export const login = async (username, password) => {
  const result = await Fetcher.post(`/login`, { username, password });

  return result.message;
};

export const editTask = async (token, taskId, text, status) => {
  const result = await Fetcher.post(`/edit/${taskId}`, {
    token,
    status,
    text,
  });

  return result.message;
};
