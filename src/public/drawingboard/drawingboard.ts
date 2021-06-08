// Holds pixels (drawn upscaled) to draw on canvas (300x300)
let state = [];

// Size of the canvas and scale to which the pixels are drawn
const size = 60;
const scale = 10;

// Tool and color to use
let tool = 'pen';
let color = '#ff9900';

// Coordinates a
let startCol = 0;
let startRow = 0;

// Whether the mouse is currently down on the canvas
let painting = false;

function clear() {
    // Populate with gray
    state = [];
    for (let i = 0; i < size; ++i) {
        const row = [];

        for (let i = 0; i < size; ++i) {
            row.push('#666666');
        }

        state.push(row);
    }

    draw();
}

const canvas = document.getElementById('drawingboard') as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

ctx.scale(scale, scale);

function draw() {
    ctx.clearRect(0, 0, size, size);
    for (let row = 0; row < size; ++row) {
        for (let col = 0; col < size; ++col) {
            ctx.fillStyle = state[col][row];

            ctx.fillRect(col , row, 1, 1);
        }
    }
}

function paint(x: number, y: number) {
    if (tool === 'pen') {
        const col = Math.min(Math.round(x / scale), size);
        const row = Math.min(Math.round(y / scale), size);

        state[col][row] = color;
        draw();
    }
}

function paintEnd(x: number, y: number) {
    if (!startCol || !startRow) {
        return;
    }

    const col = Math.round(x / scale);
    const row = Math.round(y / scale);

    const x0 = Math.min(col, startCol);
    let x1 = Math.max(col, startCol);
    x1 = Math.min(x1, size);

    const y0 = Math.min(row, startRow);
    let y1 = Math.max(row, startRow);
    y1 = Math.min(y1, size);

    if (tool === 'rect') {
        for (let x = x0; x < x1; ++x) {
            for (let y = y0; y < y1; ++y) {
                state[x][y] = color;
            }
        }

        draw();
    }

    startCol = undefined;
    startRow = undefined;
}

function handleMouseUp(event: MouseEvent) {
    paintEnd(event.x, event.y);
    painting = false;
}

function handleMouseMove(event: MouseEvent) {
    if (painting) {
        paint(event.x, event.y);
    }
}

function handleMouseDown(event: MouseEvent) {
    const col = Math.round(event.x / scale);
    const row = Math.round(event.y / scale);

    startCol = col;
    startRow = row;

    paint(event.x, event.y);
    painting = true;

    if (tool === 'fill') {
        fill(state[col][row], col, row);
        draw();
    }
}

function fill(oldColor: string, x: number, y: number) {
    if (oldColor === color) {
        return;
    }

    if (x < 0 || y < 0 || x >= size || y >= size) {
        return;
    }

    if (state[x][y] === oldColor) {
        state[x][y] = color;

        fill(oldColor, x - 1, y);
        fill(oldColor, x, y - 1);
        fill(oldColor, x + 1, y);
        fill(oldColor, x, y + 1);
    }
}

window.addEventListener('mouseup', handleMouseUp);

clear();
