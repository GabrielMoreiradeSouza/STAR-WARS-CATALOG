import { Link } from 'react-router-dom';
import { extractId, extractCategory } from '../../api/resolve';

interface ResourceLinkProps {
  url: string;
  name?: string;
}

export function ResourceLink({ url, name }: ResourceLinkProps) {
  const id = extractId(url);
  const category = extractCategory(url);
  const display = name || `${category} #${id}`;

  return (
    <Link to={`/${category}/${id}`} style={{ fontSize: '13px' }}>
      {display}
    </Link>
  );
}
