import { useEffect } from 'react';

interface StructuredDataProps {
  /** The Schema.org JSON-LD object to inject into the document <head>. */
  schema: object;
  /** Unique id for the <script> tag so it can be replaced on re-renders. */
  id?: string;
}

/**
 * Injects a JSON-LD <script type="application/ld+json"> block into the
 * document <head>. The block is removed when the component unmounts so that
 * page-specific schemas (e.g. BreadcrumbList) do not "leak" between routes.
 */
export default function StructuredData({ schema, id = 'structured-data' }: StructuredDataProps) {
  useEffect(() => {
    // Remove any previous instance with the same id before inserting.
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(schema, null, 0);
    document.head.appendChild(script);

    return () => {
      const toRemove = document.getElementById(id);
      if (toRemove) toRemove.remove();
    };
    // schema is reconstructed on every render, so stringify for comparison.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(schema), id]);

  return null;
}
