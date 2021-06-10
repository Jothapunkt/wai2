import React, {useEffect, useRef, useState} from "react";

interface DrawingBoardProps {

}

export const DrawingBoard: React.FC<DrawingBoardProps> = (props: DrawingBoardProps) => {
    // Holds pixels (drawn upscaled) to draw on canvas (60x60)
    let state: any = [];

    // Canvas element
    const canvas = useRef<HTMLCanvasElement>(null);

    // Size of the canvas and scale to which the pixels are drawn
    const size = 60;
    const scale = 10;

    // Tool and color to use
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#ff9900');

    // Coordinates the current draw action started at
    const [startCol, setStartCol] = useState<number | undefined>(0);
    const [startRow, setStartRow] = useState<number | undefined>(0);

    // Whether the mouse is currently down on the canvas
    const [painting, setPainting] = useState(false);

    function draw() {
        if (!canvas.current) {
            return;
        }

        const ctx = canvas.current.getContext("2d");

        if (!ctx) {
            return;
        }

        ctx.scale(scale, scale);

        ctx.clearRect(0, 0, size, size);
        for (let row = 0; row < size; ++row) {
            for (let col = 0; col < size; ++col) {
                ctx.fillStyle = state[col][row];

                ctx.fillRect(col , row, 1, 1);
            }
        }
    }

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

        if (tool === 'line') {
            const vec = {x: x1 - x0, y: y1 - y0};
            const vecLength = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
            const normVec = {x: vec.x / vecLength, y: vec.y / vecLength};

            console.log(vec);
            console.log(vecLength);
            console.log(normVec);

            let y = y0;
            let x = x0;

            while (x < x1 && y < y1) {
                x += normVec.x;
                y += normVec.y;

                state[Math.floor(x)][Math.floor(y)] = color;
            }

            draw();
        }

        setStartCol(undefined);
        setStartRow(undefined);
    }

    function handleMouseUp(event: any) {
        paintEnd(event.clientX, event.clientY);
        setPainting(false);
    }

    function handleMouseMove(event: any) {
        if (painting) {
            paint(event.clientX, event.clientY);
        }
    }

    function handleMouseDown(event: any) {
        const col = Math.round(event.clientX / scale);
        const row = Math.round(event.clientY / scale);

        setStartCol(col);
        setStartRow(row);

        paint(event.clientX, event.clientY);
        setPainting(true);

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

    useEffect(clear, []);

    return <div>
        <canvas onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} width="600" height="600"
    id="drawingboard"/>

        <div>
            <div className="color-button" onClick={() => setColor('#000000')} style={{backgroundColor: "#000000"}}/>
            <div className="color-button" onClick={() => setColor('#880000')} style={{backgroundColor: "#880000"}}/>
            <div className="color-button" onClick={() => setColor('#008800')} style={{backgroundColor: "#008800"}}/>
            <div className="color-button" onClick={() => setColor('#000088')} style={{backgroundColor: "#000088"}}/>
            <div className="color-button" onClick={() => setColor('#ff9900')} style={{backgroundColor: "#ff9900"}}/>
            <div className="color-button" onClick={() => setColor('#ffffff')} style={{backgroundColor: "#ffffff"}}/>
        </div>

        <div>
            <div className="tool-button" onClick={() => setTool("pen")}>Pen</div>
            <div className="tool-button" onClick={() => setTool("rect")}>Rectangle</div>
            <div className="tool-button" onClick={() => setTool("line")}>Line</div>
            <div className="tool-button" onClick={() => setTool("fill")}>Fill</div>
            <div className="tool-button" onClick={clear}>Clear</div>
        </div>
    </div>;
}
