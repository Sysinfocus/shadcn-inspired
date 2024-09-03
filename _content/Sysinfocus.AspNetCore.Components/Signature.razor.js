export function initSignaturePad(src, backgroundColor = "white", inkColor = "black", strokeWidth = 2) {
    const canvas = document.querySelector(src);
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = strokeWidth;
    ctx.backgroundColor = backgroundColor;
    ctx.strokeStyle = inkColor;
    ctx.lineJoin = ctx.lineCap = 'round';
    let writingMode = false, positionX, positionY;

    const getCursorPosition = (event) => {
        positionX = event.clientX - event.target.getBoundingClientRect().x;
        positionY = event.clientY - event.target.getBoundingClientRect().y;
        return [positionX, positionY];
    }

    const handlePointerDown = (event) => {
        writingMode = true;
        ctx.beginPath();
        const [positionX, positionY] = getCursorPosition(event);
        ctx.moveTo(positionX, positionY);
    }

    const handlePointerUp = () => {
        writingMode = false;
    }

    const handlePointerMove = (event) => {
        if (!writingMode) return
        const [positionX, positionY] = getCursorPosition(event);
        ctx.lineTo(positionX, positionY);
        ctx.stroke();
    }

    canvas.addEventListener('pointerdown', handlePointerDown, { passive: true });
    canvas.addEventListener('pointerup', handlePointerUp, { passive: true });
    canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
}

export function clearPad(src) {
    const canvas = document.querySelector(src);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function acceptSignature(src) {
    const canvas = document.querySelector(src);
    return canvas.toDataURL("image/png", 1);
}