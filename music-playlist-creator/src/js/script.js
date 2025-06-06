import { loadPlaylist,shuffle,fetchData,rainbow,swapProp} from './helper.js';

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
  playId.setAttribute('class',"play-likes")
  playId.innerText = `Likes: ${playlists[a].likes}`
  likeContainer.appendChild(playId);         


  const likeIcon = document.createElement('img')
  likeIcon.setAttribute('class',"play-icon");
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
      const playId = img.parentNode.querySelector(".play-likes")
      playlists[a].likes = likes
      playId.innerText = `Likes: ${likes}`
  });
  likeContainer.appendChild(likeIcon)

  const deleteButton = document.createElement('div')
  deleteButton.setAttribute('class',"play-delete")
  deleteButton.innerText = `Delete`
  deleteButton.addEventListener('click', (e)=>{
      e.stopPropagation();
     const playlisOverall = deleteButton.parentNode.parentNode;
     playlisOverall.remove();
  });
  likeContainer.appendChild(deleteButton);
  
  playlistInfo.appendChild(likeContainer)
  tiles.appendChild(playlistInfo);
}



document.querySelector("#sort-playlists").addEventListener('change',()=>{
  let whatSort = document.querySelector("#sort-playlists").value;
  let tiles = document.getElementsByClassName("tile");
  let order = Array.from({ length: data[0].playlists.length }, (_, i) => i);
  let assend = true

  // Check if assending
  if(whatSort.substring(whatSort.length-1)==='D'){
    assend = false;
  }

  whatSort  =  whatSort.substring(0,whatSort.length-1);// Get sort type

  let namesOrigonal, namesToSort;
  
  // Get the new order
  switch(whatSort){
    case "title":
      //Sort by title
      namesOrigonal = Array.from(tiles).map(element => element.querySelector(".play-name").innerText);
      namesToSort = Array.from(namesOrigonal).sort();
      order = namesToSort.map(a => namesOrigonal.indexOf(a));
      break;
    case "author":
      // Sort by author
      namesOrigonal = Array.from(tiles).map(element => element.querySelector(".play-author").innerText);
      namesToSort = Array.from(namesOrigonal).sort();
      order = namesToSort.map(a => namesOrigonal.indexOf(a));
      break;
    case "like":
      //Sort by likes
      namesOrigonal = Array.from(tiles).map(element => parseInt(element.querySelector(".play-likes").innerText.substring(7)));
      console.log(namesOrigonal)
      namesToSort = Array.from(namesOrigonal).sort((a, b) => b-a);
      console.log(namesToSort)
      order = namesToSort.map(a => namesOrigonal.indexOf(a));
  }

  // Reverse the resulting list if the list is decending
  if(!assend){
    order.reverse();
  }
  
  let help = Array.from({ length: data[0].playlists.length }, (_, i) => i);

    // Swap the tiles so they are in the given order
   for(const a in order){
    let b = help.indexOf(order[a]);
    swapTiles(tiles,a,b);
    let oneTemp = help[a];
    help[a] = help[b]
    help[b] = oneTemp
   }


});



function swapTiles(playlist,songOne, songTwo){
      const swapSongprop = swapProp(playlist,songOne,songTwo);
      swapSongprop("src","",'.play-select-cover');
      swapSongprop("innerText","",'.play-name');
      swapSongprop("innerText","",'.play-author');
      swapSongprop("innerText","",'.play-likes');
      swapSongprop("style","borderColor")
}


document.querySelector("#search-box").addEventListener('change',()=>{
    let searchFor = document.querySelector("#search-box").value.toLowerCase();
    let tiles = document.getElementsByClassName("tile");
    const names = Array.from(tiles).map(element => element.querySelector(".play-name").innerText.toLowerCase());
    const authors = Array.from(tiles).map(element => element.querySelector(".play-author").innerText.toLowerCase());
    const likes = Array.from(tiles).map(element => element.querySelector(".play-likes").innerText.substring(7));

    let help = Array.from({ length: names.length }, (_, i) => i);
    for(let a =0; a<names.length;a++){
      // console.log(names[a])
      // console.log(a);
      // console.log(names[a].includes(searchFor))
      if(names[a].includes(searchFor)||authors[a].includes(searchFor)||likes[a].includes(searchFor)){
        tiles[a].style.display = 'block'
        // help.splice(help.indexOf(a),1);
      }else{
        tiles[a].style.display = 'none'
      }
    }
    
  });



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