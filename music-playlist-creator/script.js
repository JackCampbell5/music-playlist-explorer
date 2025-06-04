// import { songs } from "./data"; 

// Variables 
var modal = document.getElementById("myModal");
const playlistNum = 6;
const max = 7;
const rainbow = ["red","orange","yellow","green","blue","purple"]

async function onPageLoad() {
    console.log("Page Loaded");


let data = await fetch('./data.js')
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


    // Changes Border Color and Adds event listener to all playlists
    tiles = document.getElementsByClassName("tile")
    console.log(tiles);
    let color = 0;
    for(let a of tiles){
        a.addEventListener("click",  function() {onPlaylistClicked.call(this)});
        console.log(color);
        if(color<max){
            a.style.borderColor = rainbow[color++];
            a.getElementsByClassName("play-name")[0].textContent = `${data[color].name}`
            a.getElementsByClassName("play-author")[0].textContent = `${data[color].artist}`
            a.getElementsByClassName("play-id")[0].textContent = `${data[color].length}`
        }else{
            a.style.visibility= "hidden"
        }
    }
}


function onPlaylistClicked(){
    modal.style.display = "block";
    console.log(this.id);

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
