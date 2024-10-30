export const baseUrl = 'https://en.wikipedia.org/w/api.php';
export const title = 'List_of_ursids';
export const params: Record<string, string | number> = {
  action: 'parse',
  page: title,
  prop: 'wikitext',
  section: 3,
  format: 'json',
  origin: '*',
};
