import { loadPlaylist,shuffle,fetchData } from './helper.js';


// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", onPageLoad);


async function onPageLoad() {
    console.log("Page Loaded");


    let data = await fetchData("../")

  // Generate a random playlist number
    let playNumber = Math.floor(Math.random() * data[0].playlists.length);
    loadPlaylist(playNumber, data, "../")
}

document.querySelector("#home-button").addEventListener('click', (e)=>{
    window.location.href = '/music-playlist-creator/index.html'
});


document.querySelector("#playlist-shuffle").addEventListener("click",  shuffle);



