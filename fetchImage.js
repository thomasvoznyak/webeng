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

const fetchImageUrl = async fileName => {
    const imageParams = {
        action: "query",
        titles: `File:${fileName}`,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
    };

    const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
    try {
        const  res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        const imageInfo = Object.values(pages)[0].imageinfo;

        if (imageInfo && imageInfo.length > 0) {
            return imageInfo[0].url;
        } else {
            throw new Error('Image has not been found!')
        }

    } catch (error) {
        console.error("An error occurred trying to fetch image URL:", error);
        console.error("Returning fallback image...");
        return ('media/fallback.png');
    }

};