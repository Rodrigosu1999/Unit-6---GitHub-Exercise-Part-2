const gameContainer = document.getElementById("game");
const startGame = document.querySelector("#startGame");
const restartGame = document.querySelector("#restartGame")
const score = document.querySelector("#score")

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let clickedCount = 0
let finalClickCount = 0

function handleCardClick(event) {
  let clickedElement = event.target;
  setTimeout(function () {
    if (clickedCount < 2 && (!clickedElement.classList.contains("correct"))&& (!clickedElement.classList.contains("clicked"))) {
      clickedElement.classList.add("clicked");
      clickedCount = clickedCount + 1;
      finalClickCount = finalClickCount + 1;
      score.innerText = finalClickCount;
      console.log("you just clicked", event.target);
    }
     if (clickedCount >= 2) {
      const clickedCards = document.querySelectorAll(".clicked");
      console.log(clickedCards);
      if (clickedCards[0].className === clickedCards[1].className) {
        clickedCards[0].classList.add("correct")
        clickedCards[1].classList.add("correct")
      }
      setTimeout(function () {
        clickedCards[0].classList.remove("clicked")
        clickedCards[1].classList.remove("clicked")
        clickedCount = 0
      }, 1000)
    }
  },100)
}


startGame.addEventListener("click", function(event){
  event.preventDefault();
  createDivsForColors(shuffledColors);
})

restartGame.addEventListener("click", function(event){
  event.preventDefault();
  gameContainer.innerHTML = "";
  finalClickCount = 0;
  score.innerText = finalClickCount;
})




