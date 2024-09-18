import { getAuthors } from './authors';
import type { Author } from './authors';
import { getLocations } from './locations';
import type { PaintingLocation } from './locations';
import { getPaintings } from './paintings';
import type { Painting } from './paintings';

export { getPaintings, getAuthors, getLocations };
export type { Painting, Author, PaintingLocation };
