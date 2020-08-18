
  // Needed Variables ==== connenting to API + HTML
  const searchButton = document.getElementById('searchButton');
  const apiLink = 'https://api.lyrics.ovh/suggest/' ;
  const suggestionTabs = document.getElementById('fancyResults') ;
  const lyricsLink = "https://api.lyrics.ovh/v1/";
  const lyricsArea = document.getElementById('lyricsArea');
  

// input form + search Button handling

  searchButton.addEventListener('click', function foundLyrics() {
    const searchedSong = document.getElementById('search-song') ;
    fetch(`${apiLink}${searchedSong.value}`)
    .then(response => response.json())
    .then(data => {
      allSuggestion(data.data)
    })

        })

// after having inputs  -- -- suggessiton bars handling  & limited only 10 outputs
      
    let allSuggestion = (suggest) => {
      for (let i = 0; i < suggest.length; i++) {
        if (i > 9 ) {

        } 
        else {
          const element = suggest[i];
          var songName = (element.title)
          var artistName = (element.artist.name) ;
          var artistPic = (element.artist.picture);
          var albumName = (element.album.title) ;
          info_items(songName , artistName , artistPic , albumName)
          // you can found ditails on console log
          console.log(songName);
          console.log(artistName);
          console.log(artistPic);
          console.log(albumName);
        }
      }
    }


//  Making Multiple suggition bars  - - -  

    function info_items(songName , artistName , artistPic , albumName){
      suggestionTabs.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
      <div class="col-md-3" height=100px>
          <img src=${artistPic} style="max-width: 100%;" alt="" srcset="">
      </div>
      <div class="col-md-6">
          <div class="m-auto">
              <h3 class="lyrics-name" id="song-name" style="font-size: 45px;color: greenyellow;"">${songName}</h3>
              <p class="author lead">Artist : <span id="artist-name" style="color:mediumaquamarine; font-weight: 500;">${artistName}</span>
              </p>
              <p class="author lead">Album : <span id="artist-name" style="color:mediumaquamarine; font-weight: 500;">${albumName}</span>
              </p>
          </div>
      </div>
      <div class="col-md-3 text-md-right text-center">
          <button class="btn btn-success" id="lyricsButton" onclick="getLyric('${artistName}', '${songName}')" class="btn btn-success">Get Lyrics</button>
      </div>
  </div>`

  
    }

//  getting Lyrics Handlings
    
    const getLyric = (artistName, songName) => { 
      fetch(`${lyricsLink}/${artistName}/${songName}`)
          .then(res => res.json())
          .then(data => {
              showLyric(songName, artistName, data.lyrics);
          })
  }

  const showLyric = (songName, artistName, lyric = 'Lyric not available! Please try another one.') => {
    lyricsArea.innerHTML = ` <button class="btn go-back">&lsaquo;</button>
                            <h2 class="text-success mb-4">${songName} - ${artistName}</h2>
                            <pre class="lyric text-white">${lyric}</pre>
                          `;
}