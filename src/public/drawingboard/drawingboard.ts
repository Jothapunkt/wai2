// Holds pixels (drawn upscaled) to draw on canvas (300x300)
let state = [];

// Size of the canvas and scale to which the pixels are drawn
const size = 60;
const ratio = 10;
const canvasSize = size * ratio;

// Tool and color to use
let tool = 'pen';
let color = '#ff9900';

// Whether the mouse is currently down on the canvas
let painting = false;

// Populate with gray
for (let i = 0; i < size; ++i) {
    const row = [];

    for (let i = 0; i < size; ++i) {
        row.push('#666666');
    }

    state.push(row);
}

const canvas = document.getElementById('drawingboard') as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    for (let row = 0; row < size; ++row) {
        for (let col = 0; col < size; ++col) {
            ctx.fillStyle = state[col][row];

            ctx.fillRect(col * ratio, row * ratio, ratio, ratio);
        }
    }
}

function paint(x: number, y: number) {
    const col = Math.floor(x / ratio);
    const row = Math.floor(y / ratio);

    state[col][row] = color;
    draw();
}

function handleMouseUp(event: MouseEvent) {
    painting = false;
}

function handleMouseMove(event: MouseEvent) {
    if (painting) {
        paint(event.x, event.y);
    }
}

function handleMouseDown(event: MouseEvent) {
    paint(event.x, event.y);
    painting = true;
}

window.addEventListener('mouseup', handleMouseUp);

draw();
