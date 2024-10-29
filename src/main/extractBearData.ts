import { fetchImageUrl } from './fetchImage.ts';

export const extractBears = async (wikitext: string): Promise<void> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/(?<=\|range=)[^|]+/);

      if (
        nameMatch !== null &&
        binomialMatch !== null &&
        imageMatch !== null &&
        rangeMatch !== null
      ) {
        const fileName: string = imageMatch[1].trim().replace('File:', '');
        const range = rangeMatch[0].trim();

        try {
          // Fetch the image URL and handle the bear data
          const imageUrl = await fetchImageUrl(fileName);
          const bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range,
          };
          bears.push(bear);

          // Only update the UI after all bears are processed
          if (bears.length === rows.length) {
            const moreBearsSection = document.querySelector('.more_bears');
            if (moreBearsSection !== null) {
              bears.forEach((bear) => {
                moreBearsSection.innerHTML += `
                  <div>
                      <h3>${bear.name} (${bear.binomial})</h3>
                      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                      <p><strong>Range:</strong> ${bear.range}</p>
                  </div>
              `;
              });
            }
          }
        } catch (error) {
          console.error(
            `An error occurred trying to fetch image URL for ${fileName}:`,
            error
          );
        }
      }
    }
  }
};
