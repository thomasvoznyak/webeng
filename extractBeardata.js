const extractBears = async (wikitext) => {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears = [];

    for (const table of speciesTables) {
        const rows = table.split('{{Species table/row');

        for (const row of rows) {
            const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
            const binomialMatch = row.match(/\|binomial=(.*?)\n/);
            const imageMatch = row.match(/\|image=(.*?)\n/);
            const rangeMatch = row.match(/(?<=\|range=)[^|]+/);

            if (nameMatch && binomialMatch && imageMatch) {
                const fileName = imageMatch[1].trim().replace('File:', '');

                try {
                    // Fetch the image URL and handle the bear data
                    const imageUrl = await fetchImageUrl(fileName);
                    const bear = {
                        name: nameMatch[1],
                        binomial: binomialMatch[1],
                        image: imageUrl,
                        range: rangeMatch
                    };
                    bears.push(bear);

                    // Only update the UI after all bears are processed
                    if (bears.length === rows.length) {
                        const moreBearsSection = document.querySelector('.more_bears');
                        bears.forEach(bear => {
                            moreBearsSection.innerHTML += `
                  <div>
                      <h3>${bear.name} (${bear.binomial})</h3>
                      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                      <p><strong>Range:</strong> ${bear.range}</p>
                  </div>
              `;
                        });
                    }
                } catch (error) {
                    console.error(`An error occurred trying to fetch image URL for ${fileName}:`, error);
                }
            }
        }
    }
};

const getBearData = async () => {
    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const wikitext = data.parse.wikitext['*'];
        await extractBears(wikitext); // No need to handle promises here
    } catch (error) {
        console.error('An error occurred trying to fetch bear data:', error);
    }

};