const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pixelSize = 1;

function setPixel(x, y) {
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function drawLine() {
    const x1Input = document.getElementById("x1");
    const y1Input = document.getElementById("y1");
    const x2Input = document.getElementById("x2");
    const y2Input = document.getElementById("y2");

    const x1 = parseInt(x1Input.value);
    const y1 = parseInt(y1Input.value);
    const x2 = parseInt(x2Input.value);
    const y2 = parseInt(y2Input.value);

    clearCanvas();
    bresenhamLine(x1, y1, x2, y2);
}

function bresenhamLine(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;

    let err = dx - dy;

    while (true) {
        setPixel(x1, y1);

        if (x1 === x2 && y1 === y2) {
            break;
        }

        const e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
}

function drawCircle() {
    const centerXInput = document.getElementById("centerX");
    const centerYInput = document.getElementById("centerY");
    const radiusInput = document.getElementById("radius");

    const centerX = parseInt(centerXInput.value);
    const centerY = parseInt(centerYInput.value);
    const radius = parseInt(radiusInput.value);

    clearCanvas();
    bresenhamCircle(centerX, centerY, radius);
}

function bresenhamCircle(cx, cy, r) {
    let x = 0;
    let y = r;
    let d = 3 - 2 * r;

    while (x <= y) {
        setPixel(cx + x, cy + y);
        setPixel(cx - x, cy + y);
        setPixel(cx + x, cy - y);
        setPixel(cx - x, cy - y);

        setPixel(cx + y, cy + x);
        setPixel(cx - y, cy + x);
        setPixel(cx + y, cy - x);
        setPixel(cx - y, cy - x);

        if (d < 0) {
            d += 4 * x + 6;
        } else {
            d += 4 * (x - y) + 10;
            y--;
        }
        x++;
    }
}

function drawEllipse() {
    const centerXInput = document.getElementById("centerXX");
    const centerYInput = document.getElementById("centerYY");
    const aInput = document.getElementById("a");
    const bInput = document.getElementById("b");

    const centerX = parseInt(centerXInput.value);
    const centerY = parseInt(centerYInput.value);
    const a = parseInt(aInput.value);
    const b = parseInt(bInput.value);

    clearCanvas();
    bresenhamEllipse(centerX, centerY, a, b);
}

function bresenhamEllipse(cx, cy, a, b) {
    let x = 0;
    let y = b;
    let a2 = a * a;
    let b2 = b * b;
    let d = b2 - a2 * (2 * b - 1);

    while (y >= 0) {
        setPixel(cx + x, cy + y);
        setPixel(cx - x, cy + y);
        setPixel(cx + x, cy - y);
        setPixel(cx - x, cy - y);

        if (d < 0) {
            const d1 = 2 * d + a2 * (2 * y - 1);
            if (d1 <= 0) {
                x++;
                d += b2 * (2 * x + 1);
            } else {
                x++;
                y--;
                d += b2 * (2 * x + 1) + a2 * (1 - 2 * y);
            }
        } else if (d > 0) {
            const d2 = 2 * d - b2 * (2 * x - 1);
            if (d2 > 0) {
                y--;
                d += a2 * (1 - 2 * y);
            } else {
                x++;
                y--;
                d += b2 * (2 * x + 1) + a2 * (1 - 2 * y);
            }
        } else {
            x++;
            y--;
            d += b2 * (2 * x + 1) + a2 * (1 - 2 * y);
        }
    }
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}