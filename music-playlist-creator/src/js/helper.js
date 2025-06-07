
export const rainbow = ["red","orange","yellow","green","blue","purple"]
export const rainbowGrad = ['linear-gradient(to right, rgba(255, 60, 60, 0.5), rgb(255, 4, 4, 0.5))',
  'linear-gradient(to right, rgba(255, 165, 0, 0.5), rgb(255, 140, 0, 0.5))',
  'linear-gradient(to right, rgba(255, 255, 0, 0.5), rgb(240, 230, 0, 0.5))',
  'linear-gradient(to right, rgba(0, 128, 0, 0.5), rgb(0, 100, 0, 0.5))',
  'linear-gradient(to right, rgba(0, 0, 255, 0.5), rgb(0, 0, 200, 0.5))',
  'linear-gradient(to right, rgba(75, 0, 130, 0.5), rgb(50, 0, 100, 0.5))',
  'linear-gradient(to right, rgba(238, 84, 144, 0.5), rgb(200, 70, 120, 0.5))']


export function loadPlaylist(playNumber, data,path=""){
    
    let thisPlaylist = data[0].playlists[playNumber]
    let songData = data[0].songs;
    

    // Setup the overall playlist information
    if(thisPlaylist.cover.substring(0,4)!=="http"){
    document.getElementById("playlist-image").src = `./${path}`+thisPlaylist.cover.substring(1);
    }
    document.getElementById("playlist-name").textContent = thisPlaylist.name
    document.getElementById("playlist-author").textContent = thisPlaylist.author
    document.getElementById("playlist-length").textContent = thisPlaylist.length
    document.getElementById("playlist-likes").textContent = "Likes: "+thisPlaylist.likes
    
    const all = document.getElementsByClassName("song-info")
    while (all.length > 0) {
      all[0].remove();
    }
    
    const songDiv = document.getElementById('playlist-songs');
    for(let a = 0; a<thisPlaylist.songs.length; a++){
        let num = thisPlaylist.songs[a];
        const songInfo = document.createElement('div')
        songInfo.setAttribute('class','song-info')
        songInfo.setAttribute('id',`song-info${a}`)
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

export function addSong(addDiv,data,whichSong=-1,placeholder = true){
      const songInfo = document.createElement('div')
      songInfo.setAttribute('class',"all-new-songs")
      if(whichSong == -1){
          whichSong = Math.floor(Math.random() * data[0].playlists.length);
      } 
      let randomSong = data[0].songs[whichSong]
      add_field("new-song","Song Name:",randomSong.name,songInfo,placeholder)
      add_field("new-artist","Artist Name:",randomSong.artist,songInfo,placeholder)
      add_field("new-album","Album name:",randomSong.album,songInfo,placeholder)
      add_field("new-length","Song Length:",randomSong.length,songInfo,placeholder)
      addDiv.appendChild(songInfo);
}

function add_field(name,text,example,parent, placeholder=true){
  const label = document.createElement('p')
  label.setAttribute('class',"new-label")
  label.innerText = text
  parent.appendChild(label);

  const input = document.createElement('input')
  input.setAttribute('class',name)
  if(placeholder){
  input.placeholder = example
  }else{
      input.value = example
  }
  parent.appendChild(input);
}

// From the on click function of the edit view 
export function editAddSong(data){
  const newDiv = document.querySelector("#edit-playlist")
  let addDiv = newDiv.querySelector("#new-song-list");
  addSong(addDiv,data)
}

export function editSetup(data){
  const newDiv = document.querySelector("#edit-playlist")
  if(newDiv.style.display !== "block"){
    newDiv.style.display ='block'
  }else{
    newDiv.style.display ='none'
  }

  const playlistName = document.querySelector("#playlist-name").innerText
  let  playlistInfo = undefined; 
  for(let a of data[0].playlists){
    if(a.name === playlistName){
      playlistInfo = a;
      break;
    }
  }

  newDiv.querySelector("#new-name").value = playlistInfo.name
  newDiv.querySelector("#new-link").value = playlistInfo.cover
  newDiv.querySelector("#new-author").value = playlistInfo.author
  const songDiv = newDiv.querySelector("#new-song-list")
  // Remove existing songs
  const all = songDiv.getElementsByClassName("all-new-songs")
  while (all.length > 0) {
      all[0].remove();
    }

  for(let a of playlistInfo.songs){
    const song = data[0].songs[a];
    addSong(songDiv,data,a,false)
  }
}

export function doneEdit(data,extend=""){
      let playlistDiv = document.querySelector("#edit-playlist");
      let addDiv = playlistDiv.getElementsByClassName("all-new-songs");
      let songs =  data[0].songs;
      let playlistSongs = []
      let playlistName = getValue(playlistDiv.querySelector("#new-name"),false)
      let playlistCover = getValue(playlistDiv.querySelector("#new-link"),false)
      let playlistAuthor = getValue(playlistDiv.querySelector("#new-author"),false)

      for(let a of addDiv){
        let songName = getValue(a.querySelector(".new-song"),false)
        let artistName = getValue(a.querySelector(".new-artist"),false)
        let albumName = getValue(a.querySelector(".new-album"),false)
        let lengthName = getValue(a.querySelector(".new-length"),false)
        let vals = {name:songName,album:albumName,artist:artistName,length:lengthName,cover:'./assets/img/song.png'}
        let num = songs.length;
        for(let b in songs){
          if(songs[b].name===songName&&songs[b].artist===artistName&&songs[b].album===albumName&&songs[b].length===lengthName){
            num = b;
          }
        }
        if(num===songs.length){
          songs.push(vals);
        }
        playlistSongs.push(parseInt(num));
      }
      const playlists = data[0].playlists;
       for(let b of playlists){
        if(b.name === playlistName){
          playlistName = playlistName + "1"
        }
      }

      // Get data form feilds and add to dict
      playlists.push({name:playlistName,author:playlistAuthor,likes:1,cover:playlistCover,songs:playlistSongs,liked:true})

      const oldPlaylistName = document.querySelector("#playlist-name").innerText
      for(let a in playlists){
        if(playlists[a].name===oldPlaylistName){
          playlists.splice(a,1)
          break;
        }
      }


      const all = document.getElementsByClassName("song-info")
      for(let a = 0; a<all.length;a++){
        all[0].remove()
      }
      if(all.length>0){
        all[0].remove()
      }
      loadPlaylist(data[0].playlists.length-1,data,extend)
      
      const newDiv = document.querySelector("#edit-playlist")
      newDiv.style.display ="none"
}
function getValue(param, remove=true){
  let temp =  param.value ?  param.value : param.placeholder;
  if(remove){
  param.value = ""
  }
  return temp;
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


export function swapProp(doc, name1, name2){
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
      val1[prop1] = val2[prop1]
      val2[prop1] = valTemp
    }
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