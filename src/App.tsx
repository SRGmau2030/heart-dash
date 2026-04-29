/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import kaboom from 'kaboom';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Inicializamos Kaboom
    const k = kaboom({
      canvas: canvasRef.current,
      background: [10, 10, 10], // Fondo casi negro inicial
      width: 800,
      height: 600,
      font: "sans-serif",
    });

    // --- CARGA DE ASSETS (Usando primitivos) ---
    // No necesitamos cargar imágenes externas para este juego sencillo.

    // --- ESCENAS ---
    k.scene("game", () => {
      let score = 0;
      const JUMP_FORCE = 800;
      const SPEED = 300;

      // Gravedad
      k.setGravity(2400);

      // Fondo dinámico
      const bg = k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
        k.z(-1),
      ]);

      // Piso
      k.add([
        k.rect(k.width(), 48),
        k.pos(0, k.height() - 48),
        k.outline(2, k.rgb(60, 60, 80)),
        k.area(),
        k.body({ isStatic: true }),
        k.color(20, 20, 30),
        "floor",
      ]);

      // Jugador (Corazón)
      const player = k.add([
        k.text("❤️", { size: 48 }),
        k.pos(80, 40),
        k.area({ shape: new k.Rect(k.vec2(0), 40, 40) }),
        k.anchor("center"),
        k.body(),
        "player",
      ]);

      // Texto de Puntaje
      const scoreLabel = k.add([
        k.text("Cruces: 0"),
        k.pos(24, 24),
        k.color(255, 255, 255),
      ]);

      // Función para saltar
      function jump() {
        if (player.isGrounded()) {
          player.jump(JUMP_FORCE);
          k.shake(2);
        }
      }

      // Controles de un solo botón (Espacio o Clic/Touch)
      k.onKeyPress("space", jump);
      k.onMousePress(jump);

      // --- LÓGICA DE OBSTÁCULOS (Cuadrados) ---
      function spawnObstacle() {
        k.add([
          k.rect(48, 48, { radius: 8 }),
          k.area(),
          k.outline(2, k.rgb(255, 255, 255)),
          k.pos(k.width(), k.height() - 48),
          k.anchor("botleft"),
          k.color(255, 80, 100),
          k.move(k.LEFT, SPEED + (score * 15)), // Aumenta velocidad con el score
          "obstacle",
        ]);
        // Reaparecer aleatoriamente
        k.wait(k.rand(0.8, 1.8), spawnObstacle);
      }

      // --- LÓGICA DE CRUCES (Icono de cruz) ---
      function spawnCross() {
        k.add([
          k.text("➕", { size: 24 }),
          k.area(),
          k.pos(k.width(), k.rand(k.height() - 200, k.height() - 100)),
          k.move(k.LEFT, SPEED),
          "cross",
        ]);
        k.wait(k.rand(1.5, 3), spawnCross);
      }

      spawnObstacle();
      spawnCross();

      // --- COLISIONES ---
      player.onCollide("obstacle", () => {
        k.go("lose", score);
      });

      player.onCollide("cross", (cross) => {
        k.destroy(cross);
        score++;
        scoreLabel.text = `Cruces: ${score}`;

        // Cambio de fondo al llegar a 3 gotas
        if (score === 3) {
          bg.color = k.rgb(255, 255, 255);
          scoreLabel.color = k.rgb(0, 0, 0); // Texto negro para fondo blanco
          // Cambiar color de otros textos o elementos si es necesario
        }
      });

      // Asegurar que el piso y elementos se vean bien
      k.onUpdate(() => {
        if (score >= 3) {
          bg.color = k.rgb(255, 255, 255);
        }
      });
    });

    // Escena de Puntuación Perdida
    k.scene("lose", (score) => {
      k.add([
        k.text("Game Over"),
        k.pos(k.center()),
        k.anchor("center"),
      ]);

      k.add([
        k.text(`Puntaje: ${score}\nPresiona Espacio para reiniciar`, { size: 24 }),
        k.pos(k.width() / 2, k.height() / 2 + 80),
        k.anchor("center"),
      ]);

      k.onKeyPress("space", () => k.go("game"));
      k.onMousePress(() => k.go("game"));
    });

    // Iniciar juego
    k.go("game");

  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 font-sans tracking-tight">Heart Dash</h1>
        <p className="text-neutral-400">Salta con [Espacio] o [Clic] • Recolecta 3 cruces</p>
      </div>
      
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-neutral-800">
        <canvas 
          id="game-canvas"
          ref={canvasRef} 
          className="max-w-full h-auto"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl text-sm">
        <div className="p-4 rounded-xl bg-neutral-800 text-neutral-300">
          <span className="block font-bold text-red-500 mb-1">El Personaje</span>
          Tú eres el corazón. Tu única habilidad es saltar para evitar el peligro.
        </div>
        <div className="p-4 rounded-xl bg-neutral-800 text-neutral-300">
          <span className="block font-bold text-rose-400 mb-1">Las Cruces</span>
          Recolecta las cruces. Al llegar a 3, ¡el mundo cambiará!
        </div>
        <div className="p-4 rounded-xl bg-neutral-800 text-neutral-300">
          <span className="block font-bold text-orange-400 mb-1">Obstáculos</span>
          Evita los bloques de color coral. Se mueven cada vez más rápido.
        </div>
      </div>
    </div>
  );
}
