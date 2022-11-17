function createCanvas(cWidth, cHeight) {

  // Creates and setting up the canvas
  let canvas = document.createElement('canvas');
  
  canvas.id             = 'matrix';
  canvas.style.position = 'absolute';
  canvas.style.left     = '0';
  canvas.style.top      = '0';
  canvas.style.zIndex   = '-100';
  canvas.width          = cWidth;
  canvas.height         = cHeight;

  document.body.setAttribute("oncontextmenu", "return false");
  document.body.appendChild(canvas);
  return canvas;
}

function init() {
  // Define width and height for the canvas
  const cWidth = window.innerWidth;
  const cHeight = window.innerHeight;

  // Create the canvas
  const canvas = createCanvas(cWidth, cHeight);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,cWidth,cHeight)
  return canvas
}

let canvas = init();
scaling();

function scaling() {
  // Setting up the letters
  letters = '10';
  canvas.letters = letters.split('');

  // Setting up the columns
  canvas.fontSize = 10;
  canvas.columns = canvas.width / canvas.fontSize;

  // Setting up the drops
  canvas.drops = [];
  for (let i = 0; i < canvas.columns; i++) {
    canvas.drops[i] = canvas.height;
  }
}


// Make sure the canvas adjusts to window resizing
addEventListener("resize", (event) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  scaling()
});

// Define the context
const ctx = canvas.getContext('2d');

// Setting up the draw function
function draw() {
  // Setting the color to black with a opacity of 10%
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  // Paint a rectangle with the applyied color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < canvas.drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * canvas.fontSize, canvas.drops[i] * canvas.fontSize);
    canvas.drops[i]++;
    if (canvas.drops[i] * canvas.fontSize > canvas.height && Math.random() > .95) {
      canvas.drops[i] = 0;
    }
  }
}

// Loop the animation
setInterval(draw, 33);