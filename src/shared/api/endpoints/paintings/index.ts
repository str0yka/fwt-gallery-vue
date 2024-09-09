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
}

export const getPaintings = async ({ limit, page }: GetPaintingsParams = {}) => {
  const searchParams = `${typeof page === 'number' ? `&_page=${page}` : ''}${typeof limit === 'number' ? `&_limit=${limit}` : ''}`;

  const response = await fetch(
    `${API_URL}/paintings?_expand=author&_expand=location${searchParams}`,
  );
  const data = (await response.json()) as Painting[];

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};
