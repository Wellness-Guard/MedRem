import {
  PostRequestType,
  GetRequestType,
  PatchRequestType,
  DeleteRequestType,
  PutRequestTypes,
} from '../../global/types';

export const PostRequest = async ({url, headers, body}: PostRequestType) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (response.status >= 400 && response.status <= 500) {
    const {errors} = await response.json();
    throw new Error(errors[0].message);
  }
  if (response.status >= 200 && response.status <= 208) {
    return await response.json();
  }

  return response.json();
};

export const GetRequest = async ({url, headers}: GetRequestType) => {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers,
  });
  if (response.status >= 400 && response.status <= 500) {
    const {errors} = await response.json();
    throw new Error(errors[0].message);
  }
  if (response.status >= 200 && response.status <= 208) {
    return await response.json();
  }
  return response.json();
};

export const PatchRequest = async ({url, headers, body}: PatchRequestType) => {
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.status >= 400 && response.status <= 500) {
    const {errors} = await response.json();
    throw new Error(errors[0].message);
  }
  if (response.status >= 200 && response.status <= 208) {
    return await response.json();
  }
  return response.json();
};

export const DeleteRequest = async ({url, params}: DeleteRequestType) => {
  const response = await fetch(`${url}/${params}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status >= 400 && response.status <= 500) {
    const {errors} = await response.json();
    throw new Error(errors[0].message);
  }
  if (response.status >= 200 && response.status <= 208) {
    return await response.json();
  }
  return response.json();
};

export const PutRequest = async ({url, body}: PutRequestTypes) => {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body,
  });
  if (response.status >= 400 && response.status <= 500) {
    const {errors} = await response.json();
    throw new Error(errors[0].message);
  }
  if (response.status >= 200 && response.status <= 208) {
    return await response.json();
  }
  return response.json();
};
