import { describe, expect, it } from 'vitest';
import { buildJobShareUrl, getJobShareTitle, getJobShareDescription } from './jobShare';

describe('job share metadata', () => {
  it('builds a job share URL with the title in the query string', () => {
    const url = buildJobShareUrl('https://example.com/careers', {
      id: 6,
      title: 'Registered Midwife',
    });

    const params = new URL(url).searchParams;

    expect(params.get('job')).toBe('6');
    expect(params.get('title')).toBe('Registered Midwife');
  });

  it('uses a readable job title in the share text', () => {
    const title = getJobShareTitle({ id: 6, title: 'Registered Midwife' });
    const description = getJobShareDescription({ id: 6, title: 'Registered Midwife' });

    expect(title).toBe('Registered Midwife — Keyawell Medical Center');
    expect(description).toContain('Registered Midwife');
  });
});
