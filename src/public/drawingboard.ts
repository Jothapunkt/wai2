// Holds pixels (drawn upscaled) to draw on canvas (300x300)
let state = [];

// Size of the canvas and scale to which the pixels are drawn
const size = 200;
const ratio = 3;
const canvasSize = size * ratio;

// Populate with gray
for (let i = 0; i < size; ++i) {
    const row = [];

    for (let i = 0; i < size; ++i) {
        row.push('#666');
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

            ctx.rect(col * ratio, row * ratio, ratio, ratio);
        }
    }
}
