export const rainbow = ["red","orange","yellow","green","blue","purple"]
export const rainbowGrad = ['linear-gradient(to right, rgba(255, 60, 60, 0.5), rgb(255, 4, 4, 0.5))','linear-gradient(to right, rgba(255, 165, 0, 0.5), rgb(255, 140, 0, 0.5))','linear-gradient(to right, rgba(255, 255, 0, 0.5), rgb(240, 230, 0, 0.5))','linear-gradient(to right, rgba(0, 128, 0, 0.5), rgb(0, 100, 0, 0.5))','linear-gradient(to right, rgba(0, 0, 255, 0.5), rgb(0, 0, 200, 0.5))','linear-gradient(to right, rgba(75, 0, 130, 0.5), rgb(50, 0, 100, 0.5))','linear-gradient(to right, rgba(238, 84, 144, 0.5), rgb(200, 70, 120, 0.5))']


export function loadPlaylist(playNumber, data,path=""){
    
    let thisPlaylist = data[0].playlists[playNumber]
    let songData = data[0].songs;
    
    let songs = document.getElementsByClassName("song-info")

    // Setup the overall playlist information
    document.getElementById("playlist-image").src = `./${path}`+thisPlaylist.cover.substring(1);
    document.getElementById("playlist-name").textContent = thisPlaylist.name
    document.getElementById("playlist-author").textContent = thisPlaylist.author
    document.getElementById("playlist-length").textContent = thisPlaylist.length
    document.getElementById("playlist-likes").textContent = "Likes: "+thisPlaylist.likes
    
    
    
    const songDiv = document.getElementById('playlist-songs');
    for(let a = 0; a<thisPlaylist.songs.length; a++){
        let num = thisPlaylist.songs[a];
        const songInfo = document.createElement('div')
        songInfo.setAttribute('class','song-info')
        songInfo.style.borderColor = rainbow[a%6]; /* Change names and udpate where they get values from*/
        songInfo.style.background = rainbowGrad[a%6];
        
        const songImage = document.createElement('img');
        songImage.setAttribute('class',"song-image");
        songImage.src = `./${path}`+songData[num].cover.substring(1);
        songInfo.appendChild(songImage);

        const songParams = document.createElement('div')
        songParams.setAttribute('class','song-params')

        const songTitle = document.createElement('p');
        songTitle.setAttribute('class',"song-title");
        songTitle.innerText = `Title: ${songData[num].name}`
        songParams.appendChild(songTitle);

        const songArtist = document.createElement('p');
        songArtist.setAttribute('class',"song-artist");
        songArtist.innerText = `Artist: ${songData[num].artist}`
        songParams.appendChild(songArtist);

        const songAlbum = document.createElement('p');
        songAlbum.setAttribute('class',"song-album");
        songAlbum.innerText = `Album: ${songData[num].album}`
        songParams.appendChild(songAlbum);

        songInfo.appendChild(songParams);

        const songLength = document.createElement('p');
        songLength.setAttribute('class',"song-length");
        songLength.innerText = `${songData[num].length}`
        songInfo.appendChild(songLength)

        songDiv.appendChild(songInfo);

    }


}
function swapSongs(songOne, songTwo,playlist){
    const swapSongprop = swapProp(playlist,songOne,songTwo);
    
    swapSongprop("src","",'.song-image');
    swapSongprop("innerText","",'.song-title');
    swapSongprop("innerText","",'.song-artist');
    swapSongprop("innerText","",'.song-album');
    swapSongprop("innerText","",'.song-length');
    swapSongprop("style","borderColor")
    swapSongprop("style","backgroundImage")


}

function swapProp(doc, name1, name2){
  return (prop1,prop2="",className="") =>{
  let val1 = doc[name1];
  let val2 = doc[name2];
  if(className){
    val1 = doc[name1].querySelector(className);
    val2 = doc[name2].querySelector(className);
  }
  if(prop2){
    const valTemp = val1[prop1][prop2]
    val1[prop1][prop2] = val2[prop1][prop2]
    val2[prop1][prop2] = valTemp
  }else{
    const valTemp = val1[prop1]
    console.log(val1[prop1])
    val1[prop1] = val2[prop1]
    val2[prop1] = valTemp
  }
}


}



export function shuffle() {
    
    const playlist  = document.getElementsByClassName("song-info");
    let currentIndex = playlist.length;
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    swapSongs(currentIndex,randomIndex,playlist)

  }
}


export async function fetchData(path=""){
    return await fetch(`./${path}src/js/data.js`)
   .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Assuming the server sends JSON 
  })
  .then(todos => {
    return todos
  })
  .catch(error => {
    console.error('There was a problem:', error);
    return null
  });
}