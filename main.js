// functionality for showing/hiding the comments section

const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';

const showHideBtnClicked = () => {
  const showHideText = showHideBtn.textContent;
  if(showHideText === 'Show comments') {
    showHideBtn.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
  } else {
    showHideBtn.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
  }
};

// functionality for adding a new comment via the comments form

const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.onsubmit = e => {
  e.preventDefault();
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  const nameValue = nameField.value;
  const commentValue = commentField.value;

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  nameField.value = '';
  commentField.value = '';
};

// Function to fetch the image URLs based on the file names
const baseUrl = "https://en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

const params = {
  action: "parse",
  page: title,
  prop: "wikitext",
  section: 3,
  format: "json",
  origin: "*"
};

// Function to extract bear data from the wikitext
const extractBears = async (wikitext) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)]]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/(?<=\|range=)[^|]+/);

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');

        try {
          // Fetch the image URL using await
          const imageUrl = await fetchImageUrl(fileName);

          const testedImageUrl = await checkImage(imageUrl);

          const bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: testedImageUrl,
            range: rangeMatch
          };

          bears.push(bear);

        } catch (error) {
          console.error(`An error occurred trying to fetch image URL for ${fileName}:`, error);
        }
      }
    }
  }

  // Update the UI after all bears are processed
  const moreBearsSection = document.querySelector('.more_bears');
  for (const bear of bears) {
    moreBearsSection.innerHTML += `
      <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
        <p><strong>Range:</strong> ${bear.range}</p>
      </div>
    `;
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

// Fetch and display the bear data
getBearData();
