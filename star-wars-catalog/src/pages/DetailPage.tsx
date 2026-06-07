import { useParams, Link } from 'react-router-dom';
import { useSwapiDetail } from '../hooks/useSwapiList';
import { useCharacterImages } from '../hooks/useCharacterImages';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { DetailField } from '../components/detail/DetailField';
import { RelationshipList } from '../components/detail/RelationshipList';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { type ResourceRaw } from '../types/swapi';
import { formatValue, formatDate, formatReleaseDate, formatCredits, formatMass, formatHeight } from '../utils/formatters';

interface FieldDef {
  label: string;
  get: (item: any) => string;
}

interface RelationshipDef {
  label: string;
  get: (item: any) => string[];
}

interface CategoryDetailConfig {
  fields: FieldDef[];
  relationships: RelationshipDef[];
  displayName: (item: any) => string;
}

const DETAIL_CONFIGS: Record<string, CategoryDetailConfig> = {
  people: {
    displayName: (item: any) => item.name,
    fields: [
      { label: 'Height', get: (i) => formatHeight(i.height) },
      { label: 'Mass', get: (i) => formatMass(i.mass) },
      { label: 'Hair Color', get: (i) => formatValue(i.hair_color) },
      { label: 'Skin Color', get: (i) => formatValue(i.skin_color) },
      { label: 'Eye Color', get: (i) => formatValue(i.eye_color) },
      { label: 'Birth Year', get: (i) => formatValue(i.birth_year) },
      { label: 'Gender', get: (i) => formatValue(i.gender) },
    ],
    relationships: [
      { label: 'Homeworld', get: (i) => i.homeworld ? [i.homeworld] : [] },
      { label: 'Films', get: (i) => i.films },
      { label: 'Species', get: (i) => i.species },
      { label: 'Vehicles', get: (i) => i.vehicles },
      { label: 'Starships', get: (i) => i.starships },
    ],
  },
  films: {
    displayName: (item: any) => item.title,
    fields: [
      { label: 'Episode', get: (i) => i.episode_id?.toString() },
      { label: 'Director', get: (i) => formatValue(i.director) },
      { label: 'Producer', get: (i) => formatValue(i.producer) },
      { label: 'Release Date', get: (i) => formatReleaseDate(i.release_date) },
    ],
    relationships: [
      { label: 'Characters', get: (i) => i.characters },
      { label: 'Planets', get: (i) => i.planets },
      { label: 'Starships', get: (i) => i.starships },
      { label: 'Vehicles', get: (i) => i.vehicles },
      { label: 'Species', get: (i) => i.species },
    ],
  },
  planets: {
    displayName: (item: any) => item.name,
    fields: [
      { label: 'Rotation Period', get: (i) => formatValue(i.rotation_period) },
      { label: 'Orbital Period', get: (i) => formatValue(i.orbital_period) },
      { label: 'Diameter', get: (i) => formatValue(i.diameter) },
      { label: 'Climate', get: (i) => formatValue(i.climate) },
      { label: 'Gravity', get: (i) => formatValue(i.gravity) },
      { label: 'Terrain', get: (i) => formatValue(i.terrain) },
      { label: 'Surface Water', get: (i) => formatValue(i.surface_water) },
      { label: 'Population', get: (i) => formatValue(i.population) },
    ],
    relationships: [
      { label: 'Residents', get: (i) => i.residents },
      { label: 'Films', get: (i) => i.films },
    ],
  },
  starships: {
    displayName: (item: any) => item.name,
    fields: [
      { label: 'Model', get: (i) => formatValue(i.model) },
      { label: 'Manufacturer', get: (i) => formatValue(i.manufacturer) },
      { label: 'Cost', get: (i) => formatCredits(i.cost_in_credits) },
      { label: 'Length', get: (i) => formatValue(i.length) },
      { label: 'Max Speed', get: (i) => formatValue(i.max_atmosphering_speed) },
      { label: 'Crew', get: (i) => formatValue(i.crew) },
      { label: 'Passengers', get: (i) => formatValue(i.passengers) },
      { label: 'Cargo Capacity', get: (i) => formatValue(i.cargo_capacity) },
      { label: 'Consumables', get: (i) => formatValue(i.consumables) },
      { label: 'Hyperdrive Rating', get: (i) => formatValue(i.hyperdrive_rating) },
      { label: 'MGLT', get: (i) => formatValue(i.MGLT) },
      { label: 'Class', get: (i) => formatValue(i.starship_class) },
    ],
    relationships: [
      { label: 'Pilots', get: (i) => i.pilots },
      { label: 'Films', get: (i) => i.films },
    ],
  },
  vehicles: {
    displayName: (item: any) => item.name,
    fields: [
      { label: 'Model', get: (i) => formatValue(i.model) },
      { label: 'Manufacturer', get: (i) => formatValue(i.manufacturer) },
      { label: 'Cost', get: (i) => formatCredits(i.cost_in_credits) },
      { label: 'Length', get: (i) => formatValue(i.length) },
      { label: 'Max Speed', get: (i) => formatValue(i.max_atmosphering_speed) },
      { label: 'Crew', get: (i) => formatValue(i.crew) },
      { label: 'Passengers', get: (i) => formatValue(i.passengers) },
      { label: 'Cargo Capacity', get: (i) => formatValue(i.cargo_capacity) },
      { label: 'Consumables', get: (i) => formatValue(i.consumables) },
      { label: 'Class', get: (i) => formatValue(i.vehicle_class) },
    ],
    relationships: [
      { label: 'Pilots', get: (i) => i.pilots },
      { label: 'Films', get: (i) => i.films },
    ],
  },
  species: {
    displayName: (item: any) => item.name,
    fields: [
      { label: 'Classification', get: (i) => formatValue(i.classification) },
      { label: 'Designation', get: (i) => formatValue(i.designation) },
      { label: 'Average Height', get: (i) => formatValue(i.average_height) },
      { label: 'Skin Colors', get: (i) => formatValue(i.skin_colors) },
      { label: 'Hair Colors', get: (i) => formatValue(i.hair_colors) },
      { label: 'Eye Colors', get: (i) => formatValue(i.eye_colors) },
      { label: 'Average Lifespan', get: (i) => formatValue(i.average_lifespan) },
      { label: 'Language', get: (i) => formatValue(i.language) },
    ],
    relationships: [
      { label: 'Homeworld', get: (i) => i.homeworld ? [i.homeworld] : [] },
      { label: 'People', get: (i) => i.people },
      { label: 'Films', get: (i) => i.films },
    ],
  },
};

const backLinkStyle: React.CSSProperties = {
  display: 'inline-block',
  marginBottom: '24px',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
};

const openingCrawlStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontStyle: 'italic',
  fontSize: '15px',
  lineHeight: '1.8',
  color: 'var(--color-accent)',
  padding: '20px',
  background: 'var(--color-bg-elevated)',
  borderRadius: '4px',
  margin: '16px 0',
  textAlign: 'center',
};

export default function DetailPage() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const config = category ? DETAIL_CONFIGS[category] : null;
  const { data: imageMap } = useCharacterImages();

  const { data: item, isLoading, error, refetch } = useSwapiDetail<ResourceRaw>(
    (category as any) || 'people',
    id || '1',
  );

  if (!config) {
    return (
      <div className="page">
        <Header />
        <main className="main">
          <div className="container">
            <ErrorMessage message={`Unknown category: ${category}`} />
            <Link to="/" style={backLinkStyle}>Back to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="page">
        <Header />
        <main className="main">
          <div className="container">
            <Loading variant="skeleton" count={8} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="page">
        <Header />
        <main className="main">
          <div className="container">
            <ErrorMessage
              message={error?.message || 'Failed to load item'}
              onRetry={refetch}
            />
            <Link to="/" style={backLinkStyle}>Back to Catalog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const name = config.displayName(item);

  return (
    <div className="page">
      <Header />
      <main className="main">
        <div className="container">
          <Link to="/" style={backLinkStyle}>
            &larr; Back to Catalog
          </Link>

          {category === 'people' && imageMap && (
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <img
                src={imageMap[(item as any).name?.toLowerCase()]}
                alt={(item as any).name}
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '8px',
                  objectFit: 'contain',
                  background: 'var(--color-bg-card)',
                  border: '2px solid var(--color-bg-card)',
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <h1 style={{ marginBottom: '24px' }}>{name}</h1>

          {category === 'films' && (item as any).opening_crawl && (
            <div style={openingCrawlStyle}>
              {(item as any).opening_crawl}
            </div>
          )}

          <div
            style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-bg-card)',
              borderRadius: '4px',
              padding: '20px',
              marginBottom: '24px',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', letterSpacing: '1px', marginBottom: '16px' }}>
              Attributes
            </h2>
            {config.fields.map((field) => (
              <DetailField key={field.label} label={field.label} value={field.get(item)} />
            ))}
          </div>

          <div
            style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-bg-card)',
              borderRadius: '4px',
              padding: '20px',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', letterSpacing: '1px', marginBottom: '16px' }}>
              Relationships
            </h2>
            {config.relationships.map((rel) => (
              <RelationshipList key={rel.label} label={rel.label} urls={rel.get(item)} />
            ))}
          </div>

          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            <p>Created: {formatDate(item.created)}</p>
            <p>Edited: {formatDate(item.edited)}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
