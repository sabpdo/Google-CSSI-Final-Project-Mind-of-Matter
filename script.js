const quote = document.querySelector ("#quote");
const author = document.querySelector ("#author");
const btn = document.querySelector("#btn");

// gets random quote from api every 5 seconds
setInterval(async function getQuote(){ 
    await fetch("https://quotable.io/random")
          .then (res => res.json())
    .then (data => {
        quote.innerHTML = `"${data.content}"`; 
        author.innerHTML = `${data.author}`; 
    })
    console.log (getQuote);  
}, 5000);

const breathingBtn = document.getElementById('breatheBtn');
const countdown = document.getElementById('countdown');
const breathingInstructions = document.getElementById('breathingInstructions');

countdown.style.display = 'none';
finalCountdown.style.display = 'none';
breathingInstructions.style.display = 'none';

function showCounter() {
   console.log ('show countdown running');
   countdown.style.display = "block"; 
    
   //document.getElementById(breathingBtn).style.hide='block' ; 
}

breathingBtn.addEventListener('click', () => {
  // 
  breathingBtn.style.display = 'none';
  console.log ('breathe button pressed');
  breathingInstructions.style.display = 'block';
  showCounter();
  startCounter(); 
    
});

const startingTime = 0.5; 
var time = startingTime * 60; 

const countdown1 = document.getElementById ('countdown'); 

function startCounter() {
  setInterval(async function updateCountdown(){
    const minutes = Math.floor (time / 60); 
    let seconds = time % 60; 

    seconds = seconds < 10 ? '0' + seconds : seconds; 

    countdown1.innerHTML = `${minutes}:${seconds}`
    time--; 

    if (seconds <= 0) {
     console.log ("check");  
     countdown.style.display = 'none';
     finalCountdown.style.display = 'block';
     breathingInstructions.style.display = 'none';

}

    if (seconds <= 25) {
     console.log ("check");
     breathingInstructions.innerHTML = 'Breathe Out'; 

}

    if (seconds <= 20) {
     console.log ("check");
     breathingInstructions.innerHTML = 'Breathe In'; 

}
    if (seconds <= 15) {
     console.log ("check");
     breathingInstructions.innerHTML = 'Breathe Out'; 

}

    if (seconds <= 10) {
     console.log ("check");
     breathingInstructions.innerHTML = 'Breathe In'; 

}
    if (seconds <= 5) {
     console.log ("check");
     breathingInstructions.innerHTML = 'Breathe Out';
    

}
     
}, 1000);
}


