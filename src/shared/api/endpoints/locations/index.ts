import { type InstanceRequestConfig, api } from '@shared/api/instance';

export interface PaintingLocation {
  id: number;
  location: string;
}

interface GetLocationsParams {
  config?: InstanceRequestConfig;
}

type GetLocationsResponse = PaintingLocation[];

export const getLocations = ({ config }: GetLocationsParams = {}) =>
  api.get<GetLocationsResponse>('/locations', config);
