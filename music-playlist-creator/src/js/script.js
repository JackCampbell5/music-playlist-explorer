import { loadPlaylist,shuffle,fetchData,rainbow} from './helper.js';

// Variables 
var modal = document.getElementById("myModal");
let data = undefined;

async function onPageLoad() {
    console.log("Page Loaded");


data = await fetchData();

  const playlists = data[0].playlists;

  // Create all the tiles based on the number of playlists tha exist 
  const tiles = document.getElementById("tiles")
  for(let a = 0; a<playlists.length; a++){
      createTile(playlists,a, tiles)
  }
}


function onPlaylistClicked(){
    modal.style.display = "block";
    const playlists = document.getElementsByClassName("tile")

    // Figure out which playlist was clicked on 
    let playNumber = -1;
    for(let a =0; a<playlists.length; a++){
        if(playlists[a]===this){
            playNumber = a+1;
            break;
        }
    }

    // Confirm tha we acually got a playlist(This should not occur) 
    if( playNumber === -1){
        console.error('Can not find which playlist was clicked:', error);
    }

   loadPlaylist(playNumber,data)


}

function createTile(playlists,a,tiles){
  const playlistInfo = document.createElement('div')
  playlistInfo.setAttribute('class','tile')
  playlistInfo.addEventListener("click",  function() {onPlaylistClicked.call(this)});
  playlistInfo.style.borderColor = rainbow[a%6];

  const playSelect = document.createElement('img')
  playSelect.setAttribute('class',"play-select-cover")
  playSelect.src = playlists[a].cover
  playSelect.alt = "Playlist Image"
  playlistInfo.appendChild(playSelect); 

  const playName = document.createElement('p')
  playName.setAttribute('class',"play-name")
  playName.innerText = playlists[a].name
  playlistInfo.appendChild(playName); 

  const playAuthor = document.createElement('p')
  playAuthor.setAttribute('class',"play-author")
  playAuthor.innerText =playlists[a].author
  playlistInfo.appendChild(playAuthor); 

  const likeContainer = document.createElement('div')
  likeContainer.setAttribute('class','like-container')


  const playId = document.createElement('p')
  playId.setAttribute('class',"play-id")
  playId.innerText = `Likes: ${playlists[a].likes}`
  likeContainer.appendChild(playId);         


  const likeIcon = document.createElement('img')
  likeIcon.setAttribute('class',"tile-like");
  likeIcon.src = playlists[a].liked ? "./assets/Heart/liked.png" : "./assets/Heart/unliked.png"
  let likes = parseInt(playlists[a].likes)
  likeIcon.addEventListener('click', (e)=>{
      e.stopPropagation();
      const img = e.target;
      if(img.src.endsWith("/assets/Heart/liked.png")){
          img.src = "./assets/Heart/unliked.png"
          likes--
      }else{
          img.src = "./assets/Heart/liked.png"
          likes++
      }
      const playId = img.parentNode.querySelector(".play-id")
      playlists[a].likes = likes
      playId.innerText = `Likes: ${likes}`
  });
  likeContainer.appendChild(likeIcon)
  playlistInfo.appendChild(likeContainer)
  tiles.appendChild(playlistInfo);
}



//Event Listeners

// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", onPageLoad);

document.querySelector("#playlist-shuffle").addEventListener("click",  shuffle);


// When the user clicks on <span> (x), close the modal
 document.querySelector("#model-close").addEventListener('click', (e)=>{
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e)=>{
  if (e.target == modal) {
    modal.style.display = "none";
  }
});


document.querySelector("#featured-button").addEventListener('click', (e)=>{
    window.location.href = './pages/featured.html'
});