import { API_URL } from '@shared/constants';

export interface Painting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
  author: {
    id: number;
    name: string;
  };
  location: {
    id: number;
    location: string;
  };
}

interface GetPaintingsParams {
  page?: number;
  limit?: number;
  query?: string;
}

export const getPaintings = async ({ limit, page, query }: GetPaintingsParams = {}) => {
  const searchParams = `${typeof page === 'number' ? `&_page=${page}` : ''}${typeof limit === 'number' ? `&_limit=${limit}` : ''}${typeof query === 'string' ? `&q=${query}` : ''}`;

  const response = await fetch(
    `${API_URL}/paintings?_expand=author&_expand=location${searchParams}`,
  );

  const count = Number(response.headers.get('X-Total-Count'));
  const pages = Math.ceil(count / (limit ?? count));

  const paintings = (await response.json()) as Painting[];

  return {
    ok: response.ok,
    status: response.status,
    headers: response.headers,
    data: { paintings, count, pages },
  };
};
