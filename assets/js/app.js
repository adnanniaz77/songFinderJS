$(document).ready(function () {
  const singer = "beyonce";
  const limit = 30;
  const url = `https://itunes.apple.com/search?term=${singer}&limit=${limit}`;

  const fetchData = async function () {
    let result = await fetch(url);
    result = await result.json();
    result = result.results;

    console.log(result);

    result.forEach((each) => {
      const { artistName, artworkUrl100, previewUrl } = { ...each };
    });
  };

  fetchData();
});
