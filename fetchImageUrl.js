const fetchImageUrl = async (fileName) => {
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
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        return Object.values(pages)[0].imageinfo[0].url;
    } catch (error) {
        console.error("An error occurred trying to fetch image URL:", error);
        throw error;
    }
};