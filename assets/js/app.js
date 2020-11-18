
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

const themeOptions = [
  {themeName: 'winter', bgImg: '../assets/images/winter_snowy.svg', bgColor: '#4d87b0'},
  {themeName: 'night', bgImg: '../assets/images/pondNightsky.svg', bgColor: '#29495e'},
  {themeName: 'sunset', bgImg: '../assets/images/pondSunset.svg', bgColor: '#141c3a'}
]

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

///////////////////////////////////////////
document.addEventListener('click', (e) => {
  if (e.target === document.body) {
    document.querySelector('.player').style.display = 'none'
    document.querySelector('.container').style.display = 'block'
  }
})

const themeOption = document.querySelector('#themeOption')
const firstThemeBtn = document.querySelector('#themeOption li:nth-child(1)')
const secondThemeBtn = document.querySelector('#themeOption li:nth-child(2)')
const lastThemeBtn = document.querySelector('#themeOption li:nth-child(3)')

// firstThemeBtn
  themeOption.addEventListener('mouseover', () => { 
  firstThemeBtn.style.transform = "translateY(-10px)"
  lastThemeBtn.style.transform = "translateY(10px)"
  
})

themeOption.addEventListener('mouseleave', () => { 
  firstThemeBtn.style.transform = "translateY(30px)"
  lastThemeBtn.style.transform = "translateY(-30px)"
})

/// click on each theme button
const allThemeBtns = document.querySelectorAll('#themeOption li')
const docBody = document.querySelector('.body')

allThemeBtns.forEach(themeBtn => {
  themeBtn.addEventListener('click', (e) => {
    if (e.target.dataset.themename === 'winter') {
      docBody.style.backgroundColor = `#29495e`
      docBody.style.backgroundImage = `url('${themeOptions[0].bgImg}')`
    } 
    else if (e.target.dataset.themename === 'night') {
      docBody.style.backgroundColor = `#091a3e`
      docBody.style.backgroundImage = `url('${themeOptions[1].bgImg}')`
    }
    else if (e.target.dataset.themename === 'sunset') {
      docBody.style.backgroundColor = `#692016`
      docBody.style.backgroundImage = `url('${themeOptions[2].bgImg}')`
    }
  })
})

//////////////////////////////////////////////////////
const closeBtn = document.querySelector('.closeBtn');

closeBtn.addEventListener('click', () => {
  handlePause();
  document.querySelector('.player').style.display = 'none'
  document.querySelector('.container').style.display = 'block'
})