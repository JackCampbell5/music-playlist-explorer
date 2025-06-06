import { loadPlaylist,shuffle,fetchData,editAddSong,doneEdit,editSetup} from './helper.js';


// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", onPageLoad);
let data = undefined;

async function onPageLoad() {
    console.log("Page Loaded");
    const temp  = localStorage.getItem('data');
    if(!temp){
      console.log("Getting data")
      data = await fetchData("../");
    }else{
      data = JSON.parse(temp);
    }
    console.log(data)
    let playNumber = Math.floor(Math.random() * data[0].playlists.length);
    loadPlaylist(playNumber, data, "../")
}

document.querySelector("#home-button").addEventListener('click', (e)=>{
    localStorage.setItem('data', JSON.stringify(data));  
    window.location.href = '/music-playlist-creator/index.html'
});


document.querySelector("#playlist-edit").addEventListener('click', ()=>{editSetup(data)});
document.querySelector("#add-button").addEventListener("click",  ()=>editAddSong(data));
document.querySelector("#done-button").addEventListener("click",  ()=>doneEdit(data,"../"));


document.querySelector("#playlist-shuffle").addEventListener("click",  shuffle);



