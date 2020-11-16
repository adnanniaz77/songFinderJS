$(document).ready(function () {
  let singer = "beyonce";
  const limit = 30;

  $("form").on("submit", function (e) {
    e.preventDefault();

    $(".container").empty();

    const searchValue = $("#search").val();

    if (!searchValue) alert("Please enter Atrist name");

    singer = searchValue;

    // fetch the results
    fetchData();

    // clear the form input
    $("#search").val("");
  });

  // fetch results function
  const fetchData = async function () {
    let result = await fetch(
      `https://itunes.apple.com/search?term=${singer}&limit=${limit}`
    );
    result = await result.json();
    result = result.results;

    console.log(result);

    result.forEach((each) => {
      const { artistName, artworkUrl100, previewUrl, trackName } = { ...each };
      $(".container").append(`
        <div class="box">
            <img src=${artworkUrl100} alt=${artworkUrl100} />
            <span class="singer">${artistName}</span>
            <span class="song">${trackName}</span>
            <audio src=${previewUrl} controls onpause="pauseScript()" 
              onplaying="myScript()"></audio>
        </div>
      `);
    });
  };
});

function myScript() {
  const img = document.querySelector(`.box img`)
  // console.log(img[0])

  img.classList.add('animate')
  const tt = img.parentNode[2];
  console.log(tt)
}

function pauseScript() {
  document.querySelector('.box img').classList.remove('animate')
}