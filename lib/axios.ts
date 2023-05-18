import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// import { WHITELABEL_ID } from 'src/config/env';

interface Headers {
  [key: string]: any;
  'whitelabel-id'?: string;
  wallet?: any;
  ticket?: any;
}

const getInstance = (headers: Headers = {}): AxiosInstance => {
  const instance = axios.create({});

  // instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  //   const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');
  //   const ticket = JSON.parse(localStorage.getItem('ticket') || '{}');
  //   config.headers = { ...config.headers, ...headers };
  //   config.headers['whitelabel-id'] = WHITELABEL_ID;
  //   config.headers.wallet = wallet;
  //   config.headers.ticket = ticket;
  //   return config;
  // });

  return instance;
};

const withPromise = <T>(axiosInstance: Promise<AxiosResponse<T>>): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    axiosInstance.then(
      (res: AxiosResponse<T>) => {
        resolve(res.data);
      },
      (err) => {
        // service is unavailable
        if (!err.response) {
          reject(new Error('Service is unavailable'));
          return;
        }

        if (err.response.status === 403) {
          // redirect to the homepage if permission is denied
          document.location.href = '/';
        }

        // general error
        reject(
          Object.assign(err.response.data || {}, {
            status: err.response.status,
          })
        );
      }
    );
  });

function get<T>(endpoint: string, params: any = {}): Promise<T> {
  return withPromise<T>(
    getInstance().get(endpoint, {
      params,
    })
  );
}

function post<T>(endpoint: string, body: any = {}): Promise<T> {
  return withPromise<T>(getInstance().post(endpoint, body));
}

function put<T>(endpoint: string, body: any = {}): Promise<T> {
  return withPromise<T>(getInstance().put(endpoint, body));
}

function del<T>(endpoint: string): Promise<T> {
  return withPromise<T>(getInstance().delete(endpoint));
}

const api = {
  get,
  post,
  put,
  del,
};

export default api;
