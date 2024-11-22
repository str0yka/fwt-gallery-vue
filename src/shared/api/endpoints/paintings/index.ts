import { type InstanceRequestConfig, api } from '@shared/api/instance';

import type { Author } from '../authors';
import type { PaintingLocation } from '../locations';

export interface Painting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
  author: Author;
  location: PaintingLocation;
}

interface GetPaintingsParams {
  query?: {
    page?: number;
    limit?: number;
    search?: string;
  };
  config?: InstanceRequestConfig;
}

type GetPaintingsResponse = Painting[];

export const getPaintings = async (
  { query }: GetPaintingsParams = {},
  config?: InstanceRequestConfig,
) => {
  const queryParams = new URLSearchParams();
  if (typeof query?.page === 'number') queryParams.set('_page', query?.page.toString());
  if (typeof query?.limit === 'number') queryParams.set('_limit', query?.limit.toString());
  if (typeof query?.search === 'string') queryParams.set('q', query?.search);

  const response = await api.get<GetPaintingsResponse>(
    `/paintings?_expand=author&_expand=location&${queryParams}`,
    config,
  );

  const count = Number(response.headers.get('X-Total-Count'));
  const pages = typeof query?.limit === 'number' ? Math.ceil(count / query.limit) : 1;

  return {
    ...response,
    data: {
      count,
      pages,
      paintings: response.data,
    },
  };
};
