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
          <div class="box"
                    data-artistName=${artistName} 
                    data-trackName=${trackName}
                    data-artworkUrl100=${artworkUrl100}
                    data-previewUrl=${previewUrl}
                    onclick="playThis(
                        this.dataset.artistname, 
                        this.dataset.artworkurl100, 
                        this.dataset.previewurl, 
                        this.dataset.trackname            
                      )">
              <!--<img src=${artworkUrl100} alt=${artworkUrl100}" />-->
              <span class="singer">${artistName}</span>
              <span class="song">${trackName}</span>
              <!--<audio src=${previewUrl} controls onpause="pauseScript()" 
                onplaying="myScript()"></audio>-->
          </div>
        `);
      });
    };
  });

// click event to display player and play audio

  $(document).on('click', '.track-link', function () {
    current["preview"] = $(this).data('preview');
    current["artist"] = $(this).data('artist');
    current["poster"] = $(this).data('poster');
  });
  

const player = document.querySelector('.player')
const songName = document.querySelector('.songName')
const artist = document.querySelector('.artist')
const disc = document.querySelector('.disc')
const audioSrc = document.querySelector('.audioSrc')

function playThis(artistname, artworkurl100, previewurl, trackname) {
  
  document.querySelector('.player').style.display = 'block'
  document.querySelector('.container').style.display = 'none'

  artist.textContent = artistname 
  songName.textContent = trackname 
  disc.setAttribute('src', artworkurl100)
  audioSrc.setAttribute('src', previewurl)
  audioSrc.setAttribute('data-discImg', artworkurl100)
}

function handlePlaying() {
  disc.classList.add('animate')
}

function handlePause() {
  disc.classList.remove('animate')
}

//////////////////////
document.addEventListener('click', (e) => {
  console.log(e.target)

  if (e.target === document.body) {
    document.querySelector('.player').style.display = 'none'
    document.querySelector('.container').style.display = 'block'
  }
})
