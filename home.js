let currentSong = new Audio()

// for animation : 
function visible(card){
    let svg = card.querySelector("svg");
    if (getComputedStyle(document.querySelector(".card")).width === "120px"){
        svg.style.opacity = "1"
        svg.style.top = 63 + "px"
    }
    else if(svg){
        svg.style.opacity = "1"
        svg.style.top = 110 + "px"
        
    }
}
function notVisible(card){
    let svg = card.querySelector("svg");
    if (getComputedStyle(document.querySelector(".card")).width === "120px"){
        svg.style.opacity = "0"
        svg.style.top = 140 + "px"
    }
    else if(svg){
        svg.style.opacity = "0"
        svg.style.top = 140 + "px"
    }
}

// adding songs :
// not using fetch api instead maintaining it manually : 
let songs = []
songs.push("http://127.0.0.1:5500/songs/Paisa_Hai_To.mp3")
songs.push("http://127.0.0.1:5500/songs/Girls_Like_You.mp3")
songs.push("http://127.0.0.1:5500/songs/Aam_Jahe_Munde.mp3")
songs.push("http://127.0.0.1:5500/songs/Bajrang_Baan(Lofi).mp3")
songs.push("http://127.0.0.1:5500/songs/Agar_Tum_Sath_Ho.mp3")
songs.push("http://127.0.0.1:5500/songs/See_You_Again.mp3")
songs.push("http://127.0.0.1:5500/songs/Tere_Bina.mp3")
songs.push("http://127.0.0.1:5500/songs/Perfect.mp3")
songs.push("http://127.0.0.1:5500/songs/Lucid_Dreams.mp3")
songs.push("http://127.0.0.1:5500/songs/Baarishein.mp3")
songs.push("http://127.0.0.1:5500/songs/Attention.mp3")
songs.push("http://127.0.0.1:5500/songs/Until_I_Found_You.mp3")
songs.push("http://127.0.0.1:5500/songs/Shape_Of_You.mp3")
songs.push("http://127.0.0.1:5500/songs/The_Box.mp3")
songs.push("http://127.0.0.1:5500/songs/Jo_Tum_Mere_Ho.mp3")
songs.push("http://127.0.0.1:5500/songs/Millionare.mp3")
songs.push("http://127.0.0.1:5500/songs/Night_Changes.mp3")
songs.push("http://127.0.0.1:5500/songs/Chori_Chandra.mp3")
songs.push("http://127.0.0.1:5500/songs/Gulabi_Sharara.mp3")



let songList = document.querySelector(".songList")
for (const song of songs) {
    songList.innerHTML += `<li class="flex gap-5 cursor-pointer py-3 p-2 mt-3 rounded-lg justify-between items-center border border-blue-700 shadow-pink-500 shadow max-md:text-[10px] bg-[#0000007a]">
                        <div class="flex gap-3 p-2">

                            <img class="invert" src="./img/music.svg" alt="">
                            <div class="info">
                                <div>${song.split("/songs/")[1].split(".")[0].replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ")}</div>
                            </div>
                        </div>
                        <div class="flex gap-3">
                        
                            <img class="invert" src="./img/play.svg" alt="">
                        </div>
                     </li>`
}


// using audio in JS :
// let firstSong = new Audio(songs[0])
// // firstSong.play()  
// firstSong.addEventListener("loadeddata", ()=>{
//     console.log(firstSong.duration, firstSong.src)
// })

// playmusic function :
const playmusic = (track, pause=false)=>{
    let abc = (track.replace(" ","_").replace(" ","_").replace(" ","_"))+".mp3"
    currentSong.src = "./songs/"+abc
    // currentSong.src = abc
    currentSong.play()
    play.src = "./img/pause.svg"
    
    document.querySelector(".songInfo").innerHTML = `${track.split(".")[0]}`
    document.querySelector(".songTime").innerHTML = `00:00 / 00:00`
}

// attaching an event listener to each song :
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(ele=>{
    ele.addEventListener("click",()=>{
        // console.log(playmusic(ele.querySelector(".info").firstElementChild.innerHTML))
        playmusic(ele.querySelector(".info").firstElementChild.innerHTML,true)
    })
})

// by default : this song will be there :
currentSong.src = "./songs/Shape_Of_You.mp3"
document.querySelector(".songInfo").innerHTML = `Shape Of You Baby !`
document.querySelector(".songTime").innerHTML = `00:00 / 04:23`
// by default :
play.src = "./img/play.svg" // paused :
// attach an event listener to play , previous , next :
play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src = "./img/pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "./img/play.svg"

    }
})

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// listen for timeupdate event :
currentSong.addEventListener("timeupdate",()=>{
    // console.log(currentSong.currentTime,currentSong.duration)
    if(currentSong.currentTime == currentSong.duration){
        document.getElementById("next").click()
    }
    document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%"
})

// add event listner to seekbar : (**** most important ****)
// e.offsetX -> measures from left edge of the element to where you clicked on the element :
// e.target -> gets the element on which the event is happening :
// e.target.getBoundingClientRect().width -> measures the width of the element
document.querySelector(".seekbar").addEventListener("click",(e)=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100
    document.querySelector(".circle").style.left = percent + "%"
    currentSong.currentTime = (percent * currentSong.duration) / 100
})

// event listner for hamburger :
document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "0"
})

// event listner for close :
document.querySelector(".galat").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "-100%"
})

// // event listner for previous :
// previous.addEventListener("click",()=>{
//     const idx = (songs.indexOf(currentSong.src))
//     // console.log(idx)
//     if(idx == 0){
//         let a = songs.length
//         playmusic(songs[a-1].split("/").pop().replace(".mp3", "").replace(/_/g, " "),true)
//     }
//     else{
//         playmusic(songs[idx-1].split("/").pop().replace(".mp3", "").replace(/_/g, " "),true)
//     }
// })

// // event listner for next :
// next.addEventListener("click",()=>{
//     const idx = (songs.indexOf(currentSong.src))
//     const a = songs.length
//     if(idx == a-1){
//         playmusic(songs[0].split("/").pop().replace(".mp3", "").replace(/_/g, " "),true) 
//     }
//     else{
//         playmusic(songs[idx+1].split("/").pop().replace(".mp3", "").replace(/_/g, " "),true)
//     }
// })


previous.addEventListener("click", () => {
    const currentSrc = currentSong.src.split("/").pop(); // Extract filename
    const idx = songs.findIndex(song => song.split("/").pop() === currentSrc); // Compare filenames

    if (idx === 0) {
        playmusic(songs[songs.length - 1].split("/").pop().replace(".mp3", "").replace(/_/g, " "), true);
    } else {
        playmusic(songs[idx - 1].split("/").pop().replace(".mp3", "").replace(/_/g, " "), true);
    }
});

next.addEventListener("click", () => {
    const currentSrc = currentSong.src.split("/").pop(); // Extract filename
    const idx = songs.findIndex(song => song.split("/").pop() === currentSrc); // Compare filenames

    if (idx === songs.length - 1) {
        playmusic(songs[0].split("/").pop().replace(".mp3", "").replace(/_/g, " "), true);
    } else {
        playmusic(songs[idx + 1].split("/").pop().replace(".mp3", "").replace(/_/g, " "), true);
    }
});


// event listner for awaj and awajButton :
document.getElementById("awaj").addEventListener("change",(e)=>{
    currentSong.volume = parseInt(e.target.value) / 100
})

document.getElementById("awajButton").addEventListener("click",()=>{
    let ak = document.getElementById("awaj")
    if(ak.style.display == "none" || ak.style.display === ""){
        ak.style.display = "block"
    }
    else{
        ak.style.display = "none"
    }
})

function linkedin(){
    let url = "https://www.linkedin.com/in/nileshrana5/"
    window.open(url);
}

function bigplay(card){
    let name = card.getElementsByTagName("div")[0].innerHTML
    playmusic(name,true)
    // console.log(name)
}


// bg-[#ff00b36b]