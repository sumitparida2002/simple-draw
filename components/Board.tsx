"use client";

import { useRef, useState, useEffect } from "react";

function Board() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      ctxRef.current = canvas.getContext("2d");
    }
  }, [ctxRef]);

  const startDrawing = (e: React.MouseEvent) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing) return;

    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.lineTo(e.clientX, e.clientY);

    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.closePath();
    setDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      width={`1470`}
      height={`720px`}
    />
  );
}

export default Board;
