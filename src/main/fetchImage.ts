import { baseUrl } from './vars.ts';

export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages as Record<
      string,
      { imageinfo?: Array<{ url: string }> }
    >;
    const imageInfo: Array<{ url: string }> = Object.values(pages)[0].imageinfo;

    if (imageInfo.length > 0) {
      return imageInfo[0].url;
    } else {
      throw new Error('Image has not been found!');
    }
  } catch (error) {
    console.error('An error occurred trying to fetch image URL:', error);
    console.error('Returning fallback image...');
    return 'media/fallback.png';
  }
};
