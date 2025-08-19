const grid = document.querySelector(".grid");
const sizeSlider = document.querySelector("#size-slider");
const colorPicker = document.querySelector('#color-picker');
const gridSizeLabel = document.querySelector("#grid-size");
const buttons = document.querySelectorAll('button');


let currColor = 'black';
let currMode = "single-color";
let isMouseDown = false;

document.body.addEventListener("mousedown", () => {isMouseDown = true;});
document.body.addEventListener("mouseup", () => {isMouseDown = false;});
colorPicker.addEventListener('input', () => {currColor = colorPicker.value;});

//setup functions to the buttons and get the current mode 
buttons.forEach(button => {
    button.addEventListener('click', () => {
      if(button.id === 'clear') {
        createGrid(sizeSlider.value);
      } else {
        currMode = button.id;
        toggleButton(button);
      }
    });
});

//get the inputted size, update the grid-size text, and use the inputted size to create the canvas
sizeSlider.addEventListener("input", () => {
  const size = sizeSlider.value;
  gridSizeLabel.textContent = `${size} x ${size}`;
  createGrid(size);
});

//create the canvas based on the inputted size
function createGrid(size) {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.addEventListener('mousedown', draw);
    cell.addEventListener('mouseover', draw);
    grid.appendChild(cell);
  }
}

//generate random color using math.random to change the 'hue' of a hsl color representation 
function getRandomColor() {
  const hue = Math.floor(Math.random()*360);
  return `hsl(${hue}, 70%, 50%)`;
}

//color the cell light gray and increase the opacity when the cell already has a color
function shadeCell(cell) {
  let shade = parseFloat(cell.dataset.shade) || 0;
  shade = Math.min(shade+0.1,1);
  cell.dataset.shade = shade;
  cell.style.backgroundColor = `rgba(0,0,0,${shade})`;
}

//toggle the buttons when clicking by activating a css style
function toggleButton(button){
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

//color the cell by passing the instance of that cell and apply the color depends on the selected mode
function draw(e) {
    if (e.type === 'mouseover' && !isMouseDown) return;
    switch (currMode) {
        case 'single-color':
          e.target.style.backgroundColor = currColor;
          break;
        case 'rainbow-color':
          e.target.style.backgroundColor = getRandomColor();
          break;
        case 'shade-mode':
          shadeCell(e.target);
          break;
        case 'eraser':
          e.target.style.backgroundColor = 'white';
          break;
    }
}

createGrid(sizeSlider.value);