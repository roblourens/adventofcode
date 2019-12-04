"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStdin() {
    return new Promise(resolve => {
        let stdin = '';
        process.stdin.on('data', d => {
            stdin += d.toString();
        });
        process.stdin.on('end', () => {
            resolve(stdin);
        });
    });
}
async function main() {
    // const input = (await promisify(fs.readFile)('input/ex1.txt')).toString();
    const input = await getStdin();
    const lines = input.split('\n');
    const line1Circuit = parseCircuitInput(lines[0]);
    const line2Circuit = parseCircuitInput(lines[1]);
    part1(line1Circuit, line2Circuit);
    // part2([...program]);
}
function parseCircuitInput(input) {
    const relativePositions = input.split(',')
        .map(item => {
        return parseCircuitCorner(item);
    });
    const absPositions = [];
    for (let i = 0; i < relativePositions.length; i++) {
        const relPos = relativePositions[i];
        if (i === 0) {
            absPositions.push(relPos);
        }
        else {
            const prevPosition = absPositions[i - 1];
            absPositions.push({
                x: prevPosition.x + relPos.x,
                y: prevPosition.y + relPos.y,
            });
        }
    }
    return absPositions;
}
/**
 * Returns a relative position
 */
function parseCircuitCorner(item) {
    const num = parseInt(item.slice(1), 10);
    if (item.charAt(0) === 'L') {
        return {
            x: -num,
            y: 0
        };
    }
    else if (item.charAt(0) === 'R') {
        return {
            x: num,
            y: 0
        };
    }
    else if (item.charAt(0) === 'U') {
        return {
            x: 0,
            y: -num
        };
    }
    else if (item.charAt(0) === 'D') {
        return {
            x: 0,
            y: num
        };
    }
}
function part1(line1, line2) {
    let closestIntersection;
    let closestDist = Infinity;
    for (let i = 0; i < line1.length - 1; i++) {
        const l1a = line1[i];
        const l1b = line1[i + 1];
        for (let j = 0; j < line2.length - 1; j++) {
            const l2a = line2[j];
            const l2b = line2[j + 1];
            const intersection = getLineIntersection(l1a, l1b, l2a, l2b);
            if (intersection) {
                console.log(`Found intersection: ${intersection.x}, ${intersection.y}`);
                const newDist = distFromOrigin(intersection);
                if (newDist < closestDist) {
                    closestDist = newDist;
                    closestIntersection = intersection;
                }
            }
        }
    }
    if (closestIntersection) {
        console.log(`Closest intersection: ${closestIntersection.x}, ${closestIntersection.y}`);
        console.log(closestDist);
    }
    else
        console.error('No intersections found! 😢');
}
function getLineIntersection(line1a, line1b, line2a, line2b) {
    const line1Equation = getLineEquation(line1a, line1b);
    const line2Equation = getLineEquation(line2a, line2b);
    if (line1Equation.x) {
        if (line2Equation.x) {
            return null;
        }
        const testIntersection = { x: line1Equation.x, y: line2Equation.y };
        if (pointIsOnLineSegment(testIntersection, line1a, line1b) &&
            pointIsOnLineSegment(testIntersection, line2a, line2b)) {
            return testIntersection;
        }
        else {
            return null;
        }
    }
    else {
        if (line2Equation.y) {
            return null;
        }
        const testIntersection = { x: line2Equation.x, y: line1Equation.y };
        if (pointIsOnLineSegment(testIntersection, line1a, line1b) &&
            pointIsOnLineSegment(testIntersection, line2a, line2b)) {
            return testIntersection;
        }
        else {
            return null;
        }
    }
}
function getLineEquation(pointA, pointB) {
    if (pointA.x === pointB.x) {
        return { x: pointA.x };
    }
    else {
        return { y: pointA.y };
    }
}
function pointIsOnLineSegment(point, lineA, lineB) {
    if (point.x < Math.min(lineA.x, lineB.x)) {
        return false;
    }
    if (point.x > Math.max(lineA.x, lineB.x)) {
        return false;
    }
    if (point.y < Math.min(lineA.y, lineB.y)) {
        return false;
    }
    if (point.y > Math.max(lineA.y, lineB.y)) {
        return false;
    }
    return true;
}
function distFromOrigin(point) {
    return Math.abs(point.x) + Math.abs(point.y);
}
function pointDistance(point1, point2) {
    const xDist = Math.abs(point1.x - point2.x);
    const yDist = Math.abs(point1.y - point2.y);
    return xDist + yDist;
}
main();
//# sourceMappingURL=main.js.map