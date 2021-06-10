import React, {useEffect, useRef, useState} from "react";
import "./drawingboard.css";
import {SyncAlgo} from "../algos/SyncAlgo";

interface DrawingBoardProps {
    algo: SyncAlgo
}

export const DrawingBoard: React.FC<DrawingBoardProps> = (props: DrawingBoardProps) => {
    // Holds pixels (drawn upscaled) to draw on canvas (60x60)
    const [state, setState] = useState<{pixels: string[][]}>({pixels: []});

    // Canvas element
    const canvas = useRef<HTMLCanvasElement>(null);

    // Size of the canvas and scale to which the pixels are drawn
    const size = 60;
    const scale = 10;

    // Tool and color to use
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#ff9900');

    // Coordinates the current draw action started at
    const [startY, setStartY] = useState<number | undefined>(0);
    const [startX, setStartX] = useState<number | undefined>(0);

    // Whether the mouse is currently down on the canvas
    const [painting, setPainting] = useState(false);

    function getCanvasPosition(event: any): {x: number, y: number} {
        const x = event.clientX;
        const y = event.clientY;

        if (!canvas.current) {
            return {x: 0, y: 0};
        }

        const bbox = canvas.current.getBoundingClientRect();
        const dx = x - bbox.x;
        const dy = y - bbox.y;

        const scaledX = Math.round(dx / scale);
        const scaledY = Math.round(dy / scale);

        let posX = Math.max(scaledX, 0);
        posX = Math.min(posX, size - 1);

        let posY = Math.max(scaledY, 0);
        posY = Math.min(posY, size - 1);

        return {x: posX, y: posY};
    }

    function draw() {
        props.algo.pushUpdate(state.pixels);

        if (!canvas.current) {
            console.log('No canvas');
            return;
        }

        const ctx = canvas.current.getContext("2d");

        if (!ctx) {
            console.log('No ctx');
            return;
        }

        ctx.clearRect(0, 0, size, size);

        for (let row = 0; row < size; ++row) {
            for (let col = 0; col < size; ++col) {
                ctx.fillStyle = state.pixels[col][row];

                ctx.fillRect(col , row, 1, 1);
            }
        }
    }

    function clear() {
        // Populate with gray
        state.pixels = [];
        for (let i = 0; i < size; ++i) {
            const row = [];

            for (let i = 0; i < size; ++i) {
                row.push('#666666');
            }

            state.pixels.push(row);
        }

        draw();
    }

    function paint(x: number, y: number) {
        if (tool === 'pen') {
            state.pixels[x][y] = color;
            draw();
        }
    }

    const paintEnd = (x: number, y: number) => {
        if (!startY || !startX) {
            return;
        }

        const x0 = Math.min(x, startY);
        let x1 = Math.max(x, startY);
        x1 = Math.min(x1, size - 1);

        const y0 = Math.min(y, startX);
        let y1 = Math.max(y, startX);
        y1 = Math.min(y1, size - 1);

        if (tool === 'rect') {
            for (let x = x0; x < x1; ++x) {
                for (let y = y0; y < y1; ++y) {
                    state.pixels[x][y] = color;
                }
            }

            draw();
        }

        if (tool === 'line') {
            const vec = {x: x - startX, y: y - startY};
            const vecLength = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
            const normVec = {x: vec.x / vecLength, y: vec.y / vecLength};

            let xi = 0;
            let yi = 0;

            for (let i = 0; i < vecLength; i++) {
                xi += normVec.x;
                yi += normVec.y;

                let pixelX = Math.round(startX + xi);
                pixelX = Math.max(pixelX, 0);
                pixelX = Math.min(pixelX, size - 1);

                let pixelY = Math.round(startY + yi);
                pixelY = Math.max(pixelY, 0);
                pixelY = Math.min(pixelY, size - 1);

                state.pixels[pixelX][pixelY] = color;
            }

            draw();
        }

        setStartY(undefined);
        setStartX(undefined);
    }

    function handleMouseUp(event: any) {
        const {x, y} = getCanvasPosition(event);
        paintEnd(x, y);
        setPainting(false);
    }

    function handleMouseMove(event: any) {
        const {x, y} = getCanvasPosition(event);

        if (painting) {
            paint(x, y);
        }
    }

    function handleMouseDown(event: any) {
        const {x, y} = getCanvasPosition(event);

        setStartX(x);
        setStartY(y);

        paint(x, y);
        setPainting(true);

        if (tool === 'fill') {
            fill(state.pixels[x][y], x, y);
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

        if (state.pixels[x][y] === oldColor) {
            state.pixels[x][y] = color;

            fill(oldColor, x - 1, y);
            fill(oldColor, x, y - 1);
            fill(oldColor, x + 1, y);
            fill(oldColor, x, y + 1);
        }
    }

    useEffect(clear, []);

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);

        return () => window.removeEventListener("mouseup", handleMouseUp);
    });

    useEffect(() => {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");

            if (context) {
                context.resetTransform();
                context.scale(scale, scale);
                draw();
            }
        }
    }, [canvas.current]);

    return <div>
        <canvas ref={canvas} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} width="600" height="600"
    id="drawingboard"/>
        <div>
            <div className={tool === 'pen' ? "tool-button active" : "tool-button"} onClick={() => setTool("pen")}>Pen</div>
            <div className={tool === 'rect' ? "tool-button active" : "tool-button"} onClick={() => setTool("rect")}>Rectangle</div>
            <div className={tool === 'line' ? "tool-button active" : "tool-button"} onClick={() => setTool("line")}>Line</div>
            <div className={tool === 'fill' ? "tool-button active" : "tool-button"} onClick={() => setTool("fill")}>Fill</div>
            <div className="tool-button" onClick={clear}>Clear</div>
        </div>

        <div style={{height: "1em"}}/>

        <div>
            <div className={color === "#000000" ? "color-button active" : "color-button"} onClick={() => setColor('#000000')} style={{backgroundColor: "#000000"}}/>
            <div className={color === "#880000" ? "color-button active" : "color-button"} onClick={() => setColor('#880000')} style={{backgroundColor: "#880000"}}/>
            <div className={color === "#008800" ? "color-button active" : "color-button"} onClick={() => setColor('#008800')} style={{backgroundColor: "#008800"}}/>
            <div className={color === "#000088" ? "color-button active" : "color-button"} onClick={() => setColor('#000088')} style={{backgroundColor: "#000088"}}/>
            <div className={color === "#ff9900" ? "color-button active" : "color-button"} onClick={() => setColor('#ff9900')} style={{backgroundColor: "#ff9900"}}/>
            <div className={color === "#ffffff" ? "color-button active" : "color-button"} onClick={() => setColor('#ffffff')} style={{backgroundColor: "#ffffff"}}/>
        </div>
    </div>;
}
