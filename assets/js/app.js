$(document).ready(function () {
  $('.player-wrapper').hide();

  let singer = "";
  const limit = 30;
  let current = {}

  $("form").on("submit", function (e) {
    e.preventDefault();

    $(".container").empty();

    const searchValue = $("#search").val();

    if (!searchValue) alert("Please enter Artist name");

    singer = searchValue;

    // fetch the results
    fetchData();

    // clear the form input
    $("#search").val("");
  });

  // prevent other audio from playing
  $(document).on("play", (e) => {
    const allAudio = $("audio");
    console.log(e.target);
  });

  // fetch results function
  const fetchData = async function () {
    let result = await fetch(
      `https://itunes.apple.com/search?term=${singer}&limit=${limit}`
    );
    result = await result.json();
    result = result.results;

    // console.log(result);

    result.forEach((res) => {
      const { 
        artistName, 
        artworkUrl100, 
        previewUrl, 
        trackName, 
        collectionName 
      } = { ...res };
      $(".container").append(`
        <div class="track-link" data-preview=${previewUrl} 
                                data-artist=${artistName} 
                                data-trackName=${trackName} 
                                data-poster=${artworkUrl100}>
          <div class="box">
              <img src=${artworkUrl100} alt=${artworkUrl100} />
              <span class="singer">${artistName}</span>
              <span class="song">${trackName}</span>
              <span class="song">${collectionName}</span>
              <!-- <audio src=${previewUrl} controls></audio> -->
          </div>
        </div>
      `);
    });
  };

  // click event to display player and play audio

  $(document).on('click', '.track-link', function () {
    console.log(this);

    current["preview"] = $(this).data('preview');
    current["artist"] = $(this).data('artist');
    current["poster"] = $(this).data('poster');

    console.log(current)

    // player

    $('.player-wrapper').show();
    $('.artist').text(current.artist);
    $('.disc').attr('src', current.poster);
    $('#audio').attr('src', current.preview)
  });
});
