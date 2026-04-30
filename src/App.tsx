/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import kaboom from 'kaboom';

type GameScreen = 'start' | 'playing' | 'gameover';

/* ───────────────────────────────────────────
   START SCREEN
   ─────────────────────────────────────────── */
function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      key="start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-4 overflow-hidden relative"
    >
      {/* Decorative floating hearts background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-red-500/10 select-none"
            style={{
              fontSize: `${20 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          >
            ❤️
          </motion.span>
        ))}
      </div>

      {/* Hero */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="relative z-10 text-center mb-10"
      >
        <motion.span
          className="inline-block text-7xl mb-4"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ❤️
        </motion.span>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-rose-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
          Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.
        </h1>
        <p className="text-neutral-500 mt-2 text-lg tracking-wide">
          Juan 3:16
          <br></br>
          Protege tu corazón de los pecados
        </p>
      </motion.div>

      {/* Start button */}
      <motion.button
        id="start-game-btn"
        onClick={onStart}
        whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(244,63,94,.45)' }}
        whileTap={{ scale: 0.96 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 140 }}
        className="relative z-10 mb-12 px-12 py-4 rounded-full text-xl font-bold text-white
                   bg-gradient-to-r from-rose-600 to-pink-600 shadow-lg shadow-rose-500/30
                   cursor-pointer focus:outline-none focus:ring-4 focus:ring-rose-500/40 transition-colors"
      >
        Iniciar Juego
      </motion.button>

      {/* Instructions */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="relative z-10 max-w-3xl w-full"
      >
        <h2 className="text-center text-sm uppercase tracking-widest text-neutral-500 mb-5 font-semibold">
          ¿Cómo jugar?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Control */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm"
          >
            <span className="text-2xl mb-2 block">🎮</span>
            <span className="block font-bold text-sky-400 mb-1">Control</span>
            <span className="text-neutral-400 text-sm leading-relaxed">
              Presiona <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-xs text-white font-mono">Espacio</kbd> o
              haz <strong className="text-neutral-300">Clic</strong> para saltar.
            </span>
          </motion.div>

          {/* Mecánica */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm"
          >
            <span className="text-2xl mb-2 block">➕</span>
            <span className="block font-bold text-emerald-400 mb-1">Mecánica</span>
            <span className="text-neutral-400 text-sm leading-relaxed">
              Recolecta las <strong className="text-emerald-300">cruces</strong> que aparecen.
              Al llegar a 3, ¡el mundo cambiará!
            </span>
          </motion.div>

          {/* Obstáculos */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm"
          >
            <span className="text-2xl mb-2 block">🖤</span>
            <span className="block font-bold text-rose-400 mb-1">Obstáculos</span>
            <span className="text-neutral-400 text-sm leading-relaxed">
              Evita los bloques oscuros con borde rojo que representan el pecado. Se mueven cada vez más rápido conforme avanzas.
            </span>
          </motion.div>

          {/* Progresión */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm"
          >
            <span className="text-2xl mb-2 block">✨</span>
            <span className="block font-bold text-amber-400 mb-1">Progresión</span>
            <span className="text-neutral-400 text-sm leading-relaxed">
              Cada cruz recolectada aumenta la dificultad. ¿Cuántas puedes conseguir?
            </span>
          </motion.div>
        </div>

        {/* Social Media Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 flex gap-4 justify-center"
        >
          {/* Facebook */}
          <motion.a
            id="facebook-link"
            href="https://www.facebook.com/share/1E6CWpBJaC/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(59,130,246,.5)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white
                       bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30
                       cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/40 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            Facebook
          </motion.a>

          {/* Instagram */}
          <motion.a
            id="instagram-link"
            href="https://www.instagram.com/titanesccg?igsh=bjc2ajdxamVrOGph"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(236,72,153,.5)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white
                       bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 shadow-lg shadow-pink-500/30
                       cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-500/40 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Instagram
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────
   GAME SCREEN
   ─────────────────────────────────────────── */
function GameScreen({ onGameOver }: { onGameOver: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onGameOverRef = useRef(onGameOver);
  onGameOverRef.current = onGameOver;

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let k: ReturnType<typeof kaboom> | null = null;
    let rafId: number;

    // Calcular dimensiones reales del contenedor para no estirar el canvas
    const containerWidth = containerRef.current.clientWidth;
    const ASPECT = 4 / 3;
    const gameW = Math.min(containerWidth, 800);
    const gameH = Math.round(gameW / ASPECT);

    // Ajustar tamaño del canvas al contenedor antes de que Kaboom lo tome
    canvasRef.current.width = gameW;
    canvasRef.current.height = gameH;

    rafId = requestAnimationFrame(() => {
      if (!canvasRef.current) return;

      // ── Audio helpers (Web Audio API) ──────────────────────────────────
      const audioCtx = new AudioContext();

      /** Sonido de salto: chirp ascendente corto */
      function playJump() {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        const t = audioCtx.currentTime;
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(640, t + 0.12);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.start(t);
        osc.stop(t + 0.18);
      }

      /** Sonido de cruz: campana brillante de dos notas */
      function playCross() {
        [880, 1320].forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          const t = audioCtx.currentTime + i * 0.1;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.3, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
          osc.start(t);
          osc.stop(t + 0.4);
        });
      }

      /** Sonido de muerte: rumble descendente oscuro */
      function playDeath() {
        // Grave descendente
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        const t = audioCtx.currentTime;
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(55, t + 0.6);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
        osc.start(t);
        osc.stop(t + 0.65);
        // Golpe de impacto (ruido corto)
        const bufSize = audioCtx.sampleRate * 0.08;
        const buffer = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
        const src = audioCtx.createBufferSource();
        src.buffer = buffer;
        const noiseGain = audioCtx.createGain();
        src.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noiseGain.gain.setValueAtTime(0.4, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        src.start(t);
      }
      // ─────────────────────────────────────────────────────────────────

      k = kaboom({
        canvas: canvasRef.current,
        background: [10, 10, 10],
        width: gameW,
        height: gameH,
        font: 'sans-serif',
      });

      k.scene('game', () => {
        let score = 0;
        const JUMP_FORCE = 800;
        const SPEED = 300;

        k.setGravity(2400);

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
          'floor',
        ]);

        // Jugador (Corazón)
        const player = k.add([
          k.text('❤️', { size: 48 }),
          k.pos(80, 40),
          k.area({ shape: new k.Rect(k.vec2(0), 40, 40) }),
          k.anchor('center'),
          k.body(),
          'player',
        ]);

        // Texto de Puntaje
        const scoreLabel = k.add([
          k.text('Dones: 0'),
          k.pos(24, 24),
          k.color(255, 255, 255),
        ]);

        function jump() {
          if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
            k.shake(2);
            // Reanudar contexto de audio si el navegador lo suspendió
            if (audioCtx.state === 'suspended') audioCtx.resume();
            playJump();
          }
        }

        k.onKeyPress('space', jump);
        k.onMousePress(jump);

        // Obstáculos
        function spawnObstacle() {
          k.add([
            k.rect(48, 48, { radius: 8 }),
            k.area(),
            k.outline(3, k.rgb(140, 30, 50)),
            k.pos(k.width(), k.height() - 48),
            k.anchor('botleft'),
            k.color(28, 18, 22),
            k.move(k.LEFT, SPEED + score * 15),
            'obstacle',
          ]);
          k.wait(k.rand(0.8, 1.8), spawnObstacle);
        }

        // Cruces
        function spawnCross() {
          k.add([
            k.text('➕', { size: 30 }),
            k.area(),
            k.pos(k.width(), k.rand(k.height() - 200, k.height() - 100)),
            k.move(k.LEFT, SPEED),
            'cross',
          ]);
          k.wait(k.rand(1.5, 3), spawnCross);
        }

        spawnObstacle();
        spawnCross();

        // Colisiones
        player.onCollide('obstacle', () => {
          playDeath();
          onGameOverRef.current(score);
        });

        player.onCollide('cross', (cross) => {
          k.destroy(cross);
          score++;
          scoreLabel.text = `Dones: ${score}`;
          playCross();

          if (score === 3) {
            bg.color = k.rgb(255, 255, 255);
            scoreLabel.color = k.rgb(0, 0, 0);
          }
        });

        k.onUpdate(() => {
          if (score >= 3) {
            bg.color = k.rgb(255, 255, 255);
          }
        });
      });

      k.go('game');
    }); // end requestAnimationFrame

    return () => {
      cancelAnimationFrame(rafId);
      k?.quit();
    };
  }, []);

  return (
    <motion.div
      key="playing"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-3 sm:p-4"
    >
      <div className="mb-3 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-400 via-rose-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
          Heart Dash
        </h1>
      </div>

      {/* Contenedor responsivo con relación de aspecto 4:3 fija */}
      <div
        ref={containerRef}
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-800"
        style={{ aspectRatio: '4 / 3' }}
      >
        <canvas
          id="game-canvas"
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      <p className="mt-3 text-neutral-600 text-xs sm:text-sm">
        [Espacio], [Clic] o [Toca la pantalla] para saltar
      </p>
    </motion.div>
  );
}

/* ───────────────────────────────────────────
   GAME OVER SCREEN
   ─────────────────────────────────────────── */
function GameOverScreen({ score, onRestart }: { score: number; onRestart: () => void }) {
  return (
    <motion.div
      key="gameover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-4 relative overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,63,94,.6) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
        className="relative z-10 text-center"
      >
        <motion.span
          className="inline-block text-6xl mb-4"
          animate={{ rotate: [0, -15, 15, -10, 0] }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          💔
        </motion.span>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">Game Over</h1>

        <p className="text-neutral-400 text-lg mb-2">Tu corazón ha caído…</p>

        <div className="my-8 p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 inline-block min-w-[220px]">
          <p className="text-neutral-500 text-sm uppercase tracking-widest mb-1">Dones alcanzados</p>
          <p className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            {score}
          </p>
        </div>
      </motion.div>

      <motion.button
        id="restart-btn"
        onClick={onRestart}
        whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(244,63,94,.45)' }}
        whileTap={{ scale: 0.96 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 140 }}
        className="relative z-10 mt-4 px-12 py-4 rounded-full text-xl font-bold text-white
                   bg-gradient-to-r from-rose-600 to-pink-600 shadow-lg shadow-rose-500/30
                   cursor-pointer focus:outline-none focus:ring-4 focus:ring-rose-500/40 transition-colors"
      >
        Volver al Inicio
      </motion.button>
    </motion.div>
  );
}

/* ───────────────────────────────────────────
   MAIN APP (Screen Router)
   ─────────────────────────────────────────── */
export default function App() {
  const [screen, setScreen] = useState<GameScreen>('start');
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = useCallback(() => setScreen('playing'), []);

  const handleGameOver = useCallback((score: number) => {
    setFinalScore(score);
    setScreen('gameover');
  }, []);

  const handleRestart = useCallback(() => setScreen('start'), []);

  return (
    <AnimatePresence mode="wait">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'playing' && <GameScreen onGameOver={handleGameOver} />}
      {screen === 'gameover' && (
        <GameOverScreen score={finalScore} onRestart={handleRestart} />
      )}
    </AnimatePresence>
  );
}
