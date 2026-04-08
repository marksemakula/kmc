import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import StructuredData from '../StructuredData';

export interface BreadcrumbItem {
  label: string;
  /** React Router path, e.g. "/services" */
  path: string;
}

interface BreadcrumbProps {
  /** Items after "Home". Home is always prepended automatically. */
  items: BreadcrumbItem[];
  className?: string;
}

/** Canonical base URL used in schema markup. Update when the domain changes. */
const BASE_URL = 'https://www.keyawell.or.ug';

/**
 * Renders a visible breadcrumb trail and injects the matching
 * Schema.org BreadcrumbList JSON-LD into the document <head>.
 *
 * Usage:
 *   <Breadcrumb items={[{ label: 'Services', path: '/services' }]} />
 */
export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const crumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `${BASE_URL}${crumb.path}`,
    })),
  };

  return (
    <>
      <StructuredData schema={schema} id="breadcrumb-schema" />

      {/* Visible breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className={`mb-5 ${className}`}>
        <ol
          className="flex flex-wrap items-center gap-y-1 text-sm text-gray-500"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li
                key={crumb.path}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {isLast ? (
                  <span
                    className="font-medium text-gray-700"
                    aria-current="page"
                    itemProp="name"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      to={crumb.path}
                      className="hover:text-primary transition-colors duration-200"
                      itemProp="item"
                    >
                      <span itemProp="name">{crumb.label}</span>
                    </Link>
                    <FaChevronRight
                      className="mx-2 text-gray-400 text-xs"
                      aria-hidden="true"
                    />
                  </>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
