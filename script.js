const container = document.querySelector(".container");
const h1Percent = document.querySelector(".percent");
const navHelper = document.querySelector(".nav");
const anchors = document.querySelector(".anchors")
const images = document.querySelector(".images-container").querySelectorAll("img")
const textContainers = document.querySelectorAll(".increased-images .text-container .text")

let timeOut;
const blocksCount = document.querySelector(".container").querySelectorAll("#container").length;

function hideNavHelper(value) {
  navHelper.style.opacity = 0;
  clearTimeout(timeOut)
  timeOut = setTimeout(() => {
    navHelper.style.opacity = 1;
  }, value);
} 

let currentBlockNumber = 1;
document.body.onkeydown = function Slide(e) {
  if (e.key == "ArrowDown" && currentBlockNumber < blocksCount) {
    container.style.transform = `translateY(-${currentBlockNumber * 100}%)`;
    currentBlockNumber++;
  }
  if (e.key == "ArrowUp" && currentBlockNumber > 1) {
    currentBlockNumber--;
    container.style.transform = `translateY(-${currentBlockNumber * 100 - 100}%)`;
  }
  changeSelectedAnchor(currentBlockNumber)
  hideNavHelper(10000);
}

function setPercent(value) {
  h1Percent.innerText = `${(!value) ? 0 : (value > 100) ? 100 : (value < 1) ? 1 : value}%`;
}
setPercent(35)

function createAnchors(currentBlockNumber) {
  anchors.style.height = `${blocksCount * 50}px`
  for (i = 1; i <= blocksCount; i++) {
    const anchor = document.createElement("div");
    anchor.classList.add("anchor");
    anchor.id = (`0${i}`);
    if (currentBlockNumber == i) {
      anchor.classList.add("selected")
    }
    anchors.appendChild(anchor);
  }
}
createAnchors(currentBlockNumber)

function changeSelectedAnchor(currentBlockNumber) {
  const anchor = document.querySelectorAll(".anchor");
  anchor.forEach( (e) => {
    e.classList.remove("selected");
    if (e.id == currentBlockNumber) {
      e.classList.add("selected");
    }
  })
}

function hideImgAndText() {
  textContainers.forEach( (e) => {
    e.classList.remove("selected");
  })
  images.forEach( (e) => {
    e.classList.remove("selected");
    e.style.transform = "none";
  })
}
function showImage(id = 2) {
  hideImgAndText()
  images[id-1].classList.add("selected")
  images[id-1].style.transform = `scale(300%, 300%) translate(${ (id == 1) ? "+6" : -(id-2)*5.5}vw, -15vh)`;
  textContainers[id-1].classList.add("selected")
}
showImage()
images.forEach( (e) => {
  e.onclick = function() {
    showImage(e.id)
  }
})