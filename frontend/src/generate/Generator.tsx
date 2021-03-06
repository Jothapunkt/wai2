import React, {useState} from "react";
import {DrawingCommand} from "../drawingboard/DrawingCommand";

export const Generator: React.FC = (props) => {
    const [lastResult, setLastResult] = useState("");

    const colors = ['#000000', '#880000', '#008800', '#000088', '#ffffff'];
    const size = 60;

    function randomCoordinate(): {x: number, y: number} {
        return {
            x: Math.floor(Math.random() * size),
            y: Math.floor(Math.random() * size)
        };
    }

    function randomColor(): string {
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

    function generateRect(): DrawingCommand {
        const pos0 = randomCoordinate();
        const pos1 = randomCoordinate();

        const x0 = Math.min(pos0.x, pos1.x);
        const x1 = Math.max(pos0.x, pos1.x);
        const y0 = Math.min(pos0.y, pos1.y);
        const y1 = Math.max(pos0.y, pos1.y);

        return {operation: 'rect', data: {color: randomColor(), x0, y0, x1,  y1}};
    }

    function generateFill(): DrawingCommand {
        const pos = randomCoordinate();

        return {operation: 'fill', data: {color: randomColor(), x: pos.x, y: pos.y}};
    }

    function generateLine(): DrawingCommand {
        const pos0 = randomCoordinate();
        const pos1 = randomCoordinate();

        return {operation: 'line', data: {color: randomColor(), x0: pos0.x, y0: pos0.y, x1: pos1.x, y1: pos1.y}};
    }

    function generateFreehand(): DrawingCommand {
        const numberOfPoints = 5 + Math.floor(Math.random() * 10);
        const position = randomCoordinate();

        const points = [];

        for (let i = 0; i < numberOfPoints; ++i) {
            points.push({x: position.x, y: position.y});

            // Randomly change a coordinate
            if (Math.random() < 0.5) {
                if (Math.random() < 0.5) {
                    position.x += 1;
                } else {
                    position.y -= 1;
                }
            } else {
                if (Math.random() < 0.5) {
                    position.y += 1;
                } else {
                    position.y -= 1;
                }
            }
        }

        return {operation: 'pen', data: {points, color: randomColor()}};
    }

    function generateRandomElement(): DrawingCommand {
        const random = Math.floor(Math.random() * 4);

        if (random === 0) {
            return generateLine();
        }

        if (random === 1) {
            return generateRect();
        }

        if (random === 2) {
            return generateFreehand();
        }

        if (random === 3) {
            return generateFill();
        }

        return generateLine();
    }

    function generateLargeElement(): DrawingCommand {
        const random = Math.floor(Math.random() * 2);

        if (random === 0) {
            return generateFill();
        }

        if (random === 1) {
            return generateRect();
        }

        return generateRect();
    }

    function generateDrawing() {
        const numberOfElements = 5 + Math.floor(Math.random() * 15);

        const elements = [];

        for (let i = 0; i < numberOfElements; ++i) {
            elements.push(generateRandomElement());
        }

        setLastResult(JSON.stringify(elements));
    }

    function generateLargeOperations() {
        const numberOfElements = 5 + Math.floor(Math.random() * 15);

        const elements = [];

        for (let i = 0; i < numberOfElements; ++i) {
            elements.push(generateLargeElement());
        }

        setLastResult(JSON.stringify(elements));
    }

    function generateSmallOperations() {
        const numberOfElements = 5 + Math.floor(Math.random() * 15);

        const elements = [];

        for (let i = 0; i < numberOfElements; ++i) {
            elements.push(generateFreehand());
        }

        setLastResult(JSON.stringify(elements));
    }

    return <div>
        <div className="route-button" onClick={generateDrawing}>Generate Random Drawing</div>
        <div className="route-button" onClick={generateSmallOperations}>Generate Small Operations</div>
        <div className="route-button" onClick={generateLargeOperations}>Generate Large Operations</div>
        <div className="json-display">
            {lastResult}
        </div>
    </div>;
}
