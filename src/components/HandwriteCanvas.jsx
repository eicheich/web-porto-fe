import React, { useRef, useEffect, useState, useCallback } from 'react';

export default function HandwriteCanvas({ onPredict, isLoading = false }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, []);

  useEffect(() => {
    resetCanvas();
  }, [resetCanvas]);

  const getPoint = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e) => {
    if (isLoading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture?.(e.pointerId);
    const ctx = canvas.getContext('2d');
    const { x, y } = getPoint(e);

    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 0.01, y + 0.01);
    ctx.stroke();

    isDrawingRef.current = true;
    setHasDrawn(true);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || isLoading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPoint(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    canvas?.releasePointerCapture?.(e.pointerId);
    isDrawingRef.current = false;
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn || isLoading) return;
    const dataUrl = canvas.toDataURL('image/png');
    onPredict?.(dataUrl);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="win98-sunken bg-white p-1 inline-block">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'none' }}
          className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] block cursor-crosshair bg-white"
          aria-label="Handwriting canvas for digit 0 to 9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!hasDrawn || isLoading}
          className="win98-raised px-4 py-1.5 text-xs font-bold text-[#111827] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Predicting...' : 'Predict Digit'}
        </button>
        <button
          type="button"
          onClick={resetCanvas}
          disabled={isLoading}
          className="win98-raised px-3.5 py-1.5 text-xs font-bold text-[#111827] cursor-pointer disabled:opacity-50"
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
}

