// import { songs } from "./data"; 

// Variables 
var modal = document.getElementById("myModal");
const playlistNum = 6;
const max = 7;
const maxSongs  = 46;
const rainbow = ["red","orange","yellow","green","blue","purple"]
const rainbowGrad = ['linear-gradient(to right, rgba(255, 60, 60, 0.5), rgb(255, 4, 4, 0.5))','linear-gradient(to right, rgba(255, 165, 0, 0.5), rgb(255, 140, 0, 0.5))','linear-gradient(to right, rgba(255, 255, 0, 0.5), rgb(240, 230, 0, 0.5))','linear-gradient(to right, rgba(0, 128, 0, 0.5), rgb(0, 100, 0, 0.5))','linear-gradient(to right, rgba(0, 0, 255, 0.5), rgb(0, 0, 200, 0.5))','linear-gradient(to right, rgba(75, 0, 130, 0.5), rgb(50, 0, 100, 0.5))','linear-gradient(to right, rgba(238, 84, 144, 0.5), rgb(200, 70, 120, 0.5))']
let data = undefined;

async function onPageLoad() {
    console.log("Page Loaded");


data = await fetch('./data.js')
   .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Assuming the server sends JSON 
  })
  .then(todos => {
    console.log(todos); // An array of to-do objects
    return todos
  })
  .catch(error => {
    console.error('There was a problem:', error);
    return null
  });

  let playlists = data[0].playlists;
  console.log(playlists);


    // Changes Border Color and Adds event listener to all playlists
    tiles = document.getElementsByClassName("tile")
    let color = 0;
    for(let a of tiles){
        a.addEventListener("click",  function() {onPlaylistClicked.call(this)});
        console.log(color);
        if(color<max){
            a.style.borderColor = rainbow[color++];
            a.getElementsByClassName("play-select-cover")[0].src = `${playlists[color].cover}`
            a.getElementsByClassName("play-name")[0].textContent = `${playlists[color].name}`
            a.getElementsByClassName("play-author")[0].textContent = `${playlists[color].author}`
            a.getElementsByClassName("play-id")[0].textContent = `${playlists[color].likes}`
        }else{
            a.style.visibility= "hidden"
        }
    }
}


function onPlaylistClicked(){
    modal.style.display = "block";
    playlists = document.getElementsByClassName("tile")
    let playNumber = -1;
    for(let a =0; a<playlists.length; a++){
        if(playlists[a]===this){
            console.log(`Yippee! ${a}`)
            playNumber = a+1;
            break;
        }
    }
    if( playNumber === -1){
        console.error('Can not find which playlist was clicked:', error);
    }

    let songs = document.getElementsByClassName("song-info")
    console.log(songs.length);
    let thisPlaylist = data[0].playlists[playNumber]
    let songData = data[0].songs;

    document.getElementById("playlist-image").src = thisPlaylist.cover
    document.getElementById("playlist-name").textContent = thisPlaylist.name
    document.getElementById("playlist-author").textContent = thisPlaylist.author
    document.getElementById("playlist-length").textContent = thisPlaylist.length
    document.getElementById("playlist-likes").textContent = thisPlaylist.likes



    for(let a = 0; a<songs.length; a++){
        if(a<maxSongs&&a<thisPlaylist.songs.length){
            // Reoranize code so variable names are changed 
            let num = thisPlaylist.songs[a];
            songs[a].style.borderColor = rainbow[a%6]; /* Change names and udpate where they get values from*/
            songs[a].style.background = rainbowGrad[a%6];
            songs[a].getElementsByClassName("song-image")[0].src = songData[num].cover
            songs[a].getElementsByClassName("song-title")[0].textContent = `Title: ${songData[num].name}`
            songs[a].getElementsByClassName("song-artist")[0].textContent = `Artist: ${songData[num].artist}`
            songs[a].getElementsByClassName("song-album")[0].textContent = `Album: ${songData[num].album}`
            songs[a].getElementsByClassName("song-length")[0].textContent = songData[num].length
        }else{
            songs[a].style.visibility= "hidden"
        }
    }


}

// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", onPageLoad);



// When the user clicks on <span> (x), close the modal
 document.getElementById("model-close").onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
