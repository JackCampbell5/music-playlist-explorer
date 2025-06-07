
export const rainbow = ["red","orange","yellow","green","blue","purple"]
export const rainbowGrad = ['linear-gradient(to right, rgba(255, 60, 60, 0.5), rgb(255, 4, 4, 0.5))',
  'linear-gradient(to right, rgba(255, 165, 0, 0.5), rgb(255, 140, 0, 0.5))',
  'linear-gradient(to right, rgba(255, 255, 0, 0.5), rgb(240, 230, 0, 0.5))',
  'linear-gradient(to right, rgba(0, 128, 0, 0.5), rgb(0, 100, 0, 0.5))',
  'linear-gradient(to right, rgba(0, 0, 255, 0.5), rgb(0, 0, 200, 0.5))',
  'linear-gradient(to right, rgba(75, 0, 130, 0.5), rgb(50, 0, 100, 0.5))',
  'linear-gradient(to right, rgba(238, 84, 144, 0.5), rgb(200, 70, 120, 0.5))']

// Loads a given playlist(playNumber) onto the screen
// Give path if not in root directory 
export function loadPlaylist(playNumber, data,path=""){
    
    let thisPlaylist = data[0].playlists[playNumber]
    let songData = data[0].songs;
    

    // Setup the overall playlist information
    if(thisPlaylist.cover.substring(0,4)!=="http"){
      document.getElementById("playlist-image").src = `./${path}`+thisPlaylist.cover.substring(1);
    }else{
      document.getElementById("playlist-image").src = thisPlaylist.cover
    }
    document.getElementById("playlist-name").textContent = thisPlaylist.name
    document.getElementById("playlist-author").textContent = thisPlaylist.author
    document.getElementById("playlist-length").textContent = thisPlaylist.length
    document.getElementById("playlist-likes").textContent = "Likes: "+thisPlaylist.likes
    
    // Remove previos songs(if they exist)
    const all = document.getElementsByClassName("song-info")
    while (all.length > 0) {
      all[0].remove();
    }
    
    // Add all the songs 
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
// Add a input to edit a song
  // addDiv: Where to put the song
  // data: data ot get song info from
  // whichSong: the song to add(if blank chooses randomly)
  // placeholder: should it go in placeholder or value
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


// From the on click function of the edit view 
export function editAddSong(data){
  const newDiv = document.querySelector("#edit-playlist")
  let addDiv = newDiv.querySelector("#new-song-list");
  addSong(addDiv,data)
}


//Add a label and input feild
  // name:class of input
  // text: text before input
  // example: placeholder text 
  // parent: where to put the elements
  // placeholder: do we have a placeholder or input
function add_field(name,text,example,parent, placeholder=true){
  // The label
  const label = document.createElement('p')
  label.setAttribute('class',"new-label")
  label.innerText = text
  parent.appendChild(label);

  // The input
  const input = document.createElement('input')
  input.setAttribute('class',name)
  if(placeholder){
  input.placeholder = example
  }else{
      input.value = example
  }
  parent.appendChild(input);
}

// Set up for playlist editing
export function editSetup(data){
  // Reveal the edit porition of the window 
  const newDiv = document.querySelector("#edit-playlist")
  if(newDiv.style.display !== "block"){
    newDiv.style.display ='block'
  }else{
    newDiv.style.display ='none'
  }

  // Find the playlist we are currently in to edit
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
  
  // Add all of the feilds for all the songs to be edited 
  for(let a of playlistInfo.songs){
    const song = data[0].songs[a];
    addSong(songDiv,data,a,false)
  }
}

// Done buton is clicked while editing
export function doneEdit(data,extend=""){
      let playlistDiv = document.querySelector("#edit-playlist");
      let addDiv = playlistDiv.getElementsByClassName("all-new-songs");
      let songs =  data[0].songs;
      let playlistSongs = []
      let playlistName = getValue(playlistDiv.querySelector("#new-name"),false)
      let playlistCover = getValue(playlistDiv.querySelector("#new-link"),false)
      let playlistAuthor = getValue(playlistDiv.querySelector("#new-author"),false)

      // Get all of the song details 
      for(let a of addDiv){
        let songName = getValue(a.querySelector(".new-song"),false)
        let artistName = getValue(a.querySelector(".new-artist"),false)
        let albumName = getValue(a.querySelector(".new-album"),false)
        let lengthName = getValue(a.querySelector(".new-length"),false)
        let vals = {name:songName,album:albumName,artist:artistName,length:lengthName,cover:'./assets/img/song.png'}
        let num = songs.length;
        // If they are the same as a song that already exists do not add it again to the songs array 
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

      // Make sure this playlist does not exist and if it does add a 1(Need for keying)
      const playlists = data[0].playlists;
       for(let b of playlists){
        if(b.name === playlistName){
          playlistName = playlistName + "1"
        }
      }

      // Get data form feilds and add to dict
      playlists.push({name:playlistName,author:playlistAuthor,likes:1,cover:playlistCover,songs:playlistSongs,liked:true})

      //Remove the old playlist from the data 
      const oldPlaylistName = document.querySelector("#playlist-name").innerText
      for(let a in playlists){
        if(playlists[a].name===oldPlaylistName){
          playlists.splice(a,1)
          break;
        }
      }

      // Remove all the song info elements and add them back 
      const all = document.getElementsByClassName("song-info")
      for(let a = 0; a<all.length;a++){
        all[0].remove()
      }
      if(all.length>0){
        all[0].remove()
      }
      loadPlaylist(data[0].playlists.length-1,data,extend)

      // Hide the edit window as we are now done editing
      const newDiv = document.querySelector("#edit-playlist")
      newDiv.style.display ="none"
}

// Helper method to get the value of a given param and placeholder if there is no value given
export function getValue(param, remove=true){
  let temp =  param.value ?  param.value : param.placeholder;
  if(remove){
  param.value = ""
  }
  return temp;
}


// Shuffle the songs randomly 
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

// Swap the songs positions (Helper method for shuffle)
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

//In the given array of objects swap the property(prop1 and prop2) at the given posiion(name1 and name2) for a spesific elemen(if classname is given)
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

//Fetch the data from the json file 
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