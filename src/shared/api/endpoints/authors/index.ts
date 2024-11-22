import { type InstanceRequestConfig, api } from '@shared/api/instance';

export interface Author {
  id: number;
  name: string;
}

interface GetAuthorsParams {
  config?: InstanceRequestConfig;
}

type GetAuthorsResponse = Author[];

export const getAuthors = ({ config }: GetAuthorsParams = {}) =>
  api.get<GetAuthorsResponse>('/authors', config);
