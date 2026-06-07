export interface PersonRaw {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  url: string;
  created: string;
  edited: string;
}

export interface FilmRaw {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
  created: string;
  edited: string;
}

export interface PlanetRaw {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export interface StarshipRaw {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export interface VehicleRaw {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export interface SpeciesRaw {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type SwapiCategory = 'people' | 'films' | 'planets' | 'starships' | 'vehicles' | 'species';

export type ResourceRaw = PersonRaw | FilmRaw | PlanetRaw | StarshipRaw | VehicleRaw | SpeciesRaw;

export interface ResolvedPerson extends Omit<PersonRaw, 'homeworld' | 'films' | 'species' | 'vehicles' | 'starships'> {
  homeworld: ResolvedPlanet | null;
  films: ResolvedFilm[];
  species: ResolvedSpecies[];
  vehicles: ResolvedVehicle[];
  starships: ResolvedStarship[];
}

export interface ResolvedFilm extends Omit<FilmRaw, 'characters' | 'planets' | 'starships' | 'vehicles' | 'species'> {
  characters: ResolvedPerson[];
  planets: ResolvedPlanet[];
  starships: ResolvedStarship[];
  vehicles: ResolvedVehicle[];
  species: ResolvedSpecies[];
}

export interface ResolvedPlanet extends Omit<PlanetRaw, 'residents' | 'films'> {
  residents: ResolvedPerson[];
  films: ResolvedFilm[];
}

export interface ResolvedStarship extends Omit<StarshipRaw, 'pilots' | 'films'> {
  pilots: ResolvedPerson[];
  films: ResolvedFilm[];
}

export interface ResolvedVehicle extends Omit<VehicleRaw, 'pilots' | 'films'> {
  pilots: ResolvedPerson[];
  films: ResolvedFilm[];
}

export interface ResolvedSpecies extends Omit<SpeciesRaw, 'homeworld' | 'people' | 'films'> {
  homeworld: ResolvedPlanet | null;
  people: ResolvedPerson[];
  films: ResolvedFilm[];
}

export interface CategoryInfo {
  slug: SwapiCategory;
  label: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { slug: 'people', label: 'People' },
  { slug: 'films', label: 'Films' },
  { slug: 'planets', label: 'Planets' },
  { slug: 'starships', label: 'Starships' },
  { slug: 'vehicles', label: 'Vehicles' },
  { slug: 'species', label: 'Species' },
];
