import axios, { AxiosRequestConfig } from "axios";

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

interface ApiCallProps {
  endpoint: string;
  method: HttpMethod;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

export const apiCall = async ({
  endpoint,
  method,
  data = null,
  params = null,
  headers = {}
}: ApiCallProps) => {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (data) config.data = data;
    if (params) config.params = params;

    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    };
  }
};



// try {
//     // GET request
//     const getData = await apiCall({
//       endpoint: '/api/users',
//       method: 'GET',
//       params: { page: 1 }  // for query parameters
//     });

//     // POST request
//     const postData = await apiCall({
//       endpoint: '/api/users',
//       method: 'POST',
//       data: { name: 'John', email: 'john@example.com' }
//     });

//     // PATCH request
//     const patchData = await apiCall({
//       endpoint: '/api/users/1',
//       method: 'PATCH',
//       data: { name: 'Updated Name' }
//     });

//     // DELETE request
//     const deleteData = await apiCall({
//       endpoint: '/api/users/1',
//       method: 'DELETE'
//     });

//     // With custom headers
//     const withHeaders = await apiCall({
//       endpoint: '/api/protected',
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer token'
//       }
//     });
//   } catch (error) {
//     // Error handling
//     console.error(error.status, error.message);
//   }