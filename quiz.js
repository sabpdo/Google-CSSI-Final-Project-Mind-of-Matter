console.log("script running");
let pictures = document.querySelectorAll(".card-image");

let quiz = {
  one: ["nothing", "anxiety", "anxiety", "anxiety"],
  two: ["nothing", "depression", "depression", "depression"],
  three: ["nothihng", "anxiety", "anxiety", "anxiety"],
  four: ["nothing", "depression", "depression", "depression"],
  five: ["nothing", "anxiety", "anxiety", "anxiety"],
  six: ["nothing", "depression", "depression", "depression"],
  seven: ["nothing", "anxiety", "anxiety", "anxiety"],
  eight: ["nothing", "depression", "depression", "depression"],
  nine: ["nothing", "anxiety", "anxiety", "anxiety"],
  last: ["nothing", "depression", "depression", "depression"],
};

let quizTaker = {
  nothing: 0,
  anxiety: 0,
  depression: 0,
};

pictures.forEach((picture) => {
  picture.addEventListener("click", (e) => {
    let choice = picture.id.split("-");
    console.log(choice);

    picture.classList.toggle("has-background-light");
    picture.classList.toggle("has-background-info");

    let answer = quiz[choice[0]][choice[1]]; 
    quizTaker[answer]++;

    if (choice[0] === "last") {
      final();
     
    }

    function final() {

      let x = document.getElementById('anxiety');
      let y = document.getElementById('depression');
      let z = document.getElementById('nothing');


      if (quizTaker.anxiety >= quizTaker.depression && quizTaker.anxiety >= quizTaker.nothing) {
        
        x.style.display = "block";
      }
      else {
       
        x.style.display = "none";
      }



      if (quizTaker.depression >= quizTaker.anxiety && quizTaker.depression >= quizTaker.nothing) {
       
        y.style.display = "block";
      }
      else {
        
        y.style.display = "none";
      }

      if (quizTaker.nothing > quizTaker.anxiety && quizTaker.nothing > quizTaker.depression) {
        z.style.display = "block";
      }
      else {
        z.style.display = "none";
      }

    }


  
  });
});

