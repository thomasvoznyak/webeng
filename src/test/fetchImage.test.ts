import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchImageUrl } from '../main/fetchImage.ts';
import { baseUrl } from '../main/vars.ts';

describe('fetchImageUrl', () => {
  const sampleFileName = 'example.jpg';
  const sampleImageUrl = 'https://example.com/image.jpg';

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the image URL when the image is found', async () => {
    const mockResponse = {
      query: {
        pages: {
          '12345': {
            imageinfo: [{ url: sampleImageUrl }],
          },
        },
      },
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => await Promise.resolve(mockResponse),
      })
    );

    const url = await fetchImageUrl(sampleFileName);
    expect(url).toBe(sampleImageUrl);
    expect(fetch).toHaveBeenCalledWith(
      `${baseUrl}?${new URLSearchParams({
        action: 'query',
        titles: `File:${sampleFileName}`,
        prop: 'imageinfo',
        iiprop: 'url',
        format: 'json',
        origin: '*',
      }).toString()}`
    );
  });

  it('should return the fallback image URL if the image is not found', async () => {
    const mockResponse = {
      query: {
        pages: {
          '12345': {},
        },
      },
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => await Promise.resolve(mockResponse),
      })
    );

    const url = await fetchImageUrl('nonexistent.jpg');
    expect(url).toBe('media/fallback.png');
    expect(fetch).toHaveBeenCalled();
  });

  it('should return the fallback image URL if an error occurs during fetching', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error'))
    );

    const url = await fetchImageUrl(sampleFileName);
    expect(url).toBe('media/fallback.png');
    expect(fetch).toHaveBeenCalled();
  });
});
