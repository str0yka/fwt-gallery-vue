import { API_URL } from '@shared/constants';

interface CreateInstanceParams {
  baseUrl?: string;
}

export type InstanceRequestConfig = Omit<RequestInit, 'method' | 'body'>;

const create = ({ baseUrl = '' }: CreateInstanceParams = {}) => {
  const request = async <ResponseBody extends unknown = unknown>(
    url: string,
    config: RequestInit,
  ) => {
    const response = await fetch(`${baseUrl}${url}`, config);

    const data = (await response.json()) as ResponseBody;

    return {
      ok: response.ok,
      status: response.status,
      headers: response.headers,
      data,
    };
  };

  const get = <ResponseBody extends unknown = unknown>(
    url: string,
    config?: InstanceRequestConfig,
  ) => request<ResponseBody>(url, { ...config, method: 'GET' });

  const post = <ResponseBody extends unknown = unknown>(
    url: string,
    body?: unknown,
    config?: InstanceRequestConfig,
  ) =>
    request<ResponseBody>(url, {
      ...config,
      method: 'POST',
      ...((body && { body: JSON.stringify(body) }) ?? {}),
    });

  return { get, post };
};

export const api = create({ baseUrl: API_URL });
