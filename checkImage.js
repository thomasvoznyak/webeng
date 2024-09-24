const checkImage = url => new Promise((resolve) => {
  const img = new Image();
  img.src = url;

  img.onload = () => resolve(url);
  img.onerror = () => resolve('./media/fhcampus.png');
});