"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import Next.js client router

interface Position {
  x: number;
  y: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
  velX: number;
  velY: number;
  angle: number;
  isPlayer?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  velX: number;
  velY: number;
  size: number;
  opacity: number;
  color: string;
}

export default function RobotBossGame() {
  const [returnToHomeCountdown, setReturnToHomeCountdown] = useState<number>(5);

  const router = useRouter(); // 2. Initialize the routing handler
  const [mousePos, setMousePos] = useState<Position>({ x: 500, y: 400 });
  const [robotPos] = useState<Position>({ x: 150, y: 250 });
  const [angle, setAngle] = useState<number>(0);

  // Game States
  const [bossHealth, setBossHealth] = useState<number>(100);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Entities
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  // NEW: Automatically handle home redirection on victory
  useEffect(() => {
    if (!gameWon) return;

    const redirectTimer = setTimeout(() => {
      router.push("/"); // Redirect back to the root landing page
    }, 3000); // 3 seconds timeout boundary

    return () => clearTimeout(redirectTimer);
  }, [gameWon, router]);

  // 1. Listen and save mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Player clicks anywhere to shoot back at the Robot
  useEffect(() => {
    if (gameWon) return;

    const handlePlayerShoot = (e: MouseEvent) => {
      const targetDx = robotPos.x - e.clientX;
      const targetDy = robotPos.y - e.clientY;
      const distance = Math.sqrt(targetDx * targetDx + targetDy * targetDy);

      if (distance === 0) return;

      const speed = 15;
      const velX = (targetDx / distance) * speed;
      const velY = (targetDy / distance) * speed;
      const angleRad = Math.atan2(targetDy, targetDx);
      const playerAngle = (angleRad * 180) / Math.PI;

      setBullets((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          velX,
          velY,
          angle: playerAngle,
          isPlayer: true,
        },
      ]);
    };

    window.addEventListener("click", handlePlayerShoot);
    return () => window.removeEventListener("click", handlePlayerShoot);
  }, [gameWon, robotPos]);

  // 3. Multi-purpose Particle Explosion Generator (Used for borders & fireworks)
  const createExplosion = (x: number, y: number, isFirework = false) => {
    const colors = isFirework
      ? [
          "#ff0055",
          "#00ffcc",
          "#ffcc00",
          "#ff00ff",
          "#00ff00",
          "#ffffff",
          "#3388ff",
        ]
      : ["#00f2fe", "#4facfe", "#ff007f", "#ffffff"];

    const count = isFirework ? 35 : 8;

    const newParticles: Particle[] = Array.from({ length: count }).map(() => {
      const angleRad = Math.random() * Math.PI * 2;
      const speed = (isFirework ? 2 : 1.5) + Math.random() * 6;
      return {
        id: Date.now() + Math.random(),
        x,
        y,
        velX: Math.cos(angleRad) * speed,
        velY: Math.sin(angleRad) * speed + (isFirework ? 0.5 : 0),
        size: (isFirework ? 3 : 2) + Math.random() * 4,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // 4. Victory Fireworks Generator Loop
  useEffect(() => {
    if (!gameWon) return;

    const interval = setInterval(() => {
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * (window.innerHeight * 0.7);
      createExplosion(randomX, randomY, true);
    }, 250);

    return () => clearInterval(interval);
  }, [gameWon]);

  // 5. Main Physics Engine Loop (60fps updates)
  useEffect(() => {
    let animationFrame: number;

    const updatePhysics = () => {
      const dx = mousePos.x - robotPos.x;
      const dy = mousePos.y - robotPos.y;
      setAngle((Math.atan2(dy, dx) * 180) / Math.PI);

      setBullets((prevBullets) => {
        const updated: Bullet[] = [];
        prevBullets.forEach((b) => {
          const nextX = b.x + b.velX;
          const nextY = b.y + b.velY;

          if (b.isPlayer) {
            const distToBossX = nextX - robotPos.x;
            const distToBossY = nextY - robotPos.y;
            const distToBoss = Math.sqrt(
              distToBossX * distToBossX + distToBossY * distToBossY,
            );

            if (distToBoss < 45 && !gameWon) {
              createExplosion(nextX, nextY, false);
              setBossHealth((health) => {
                const nextHealth = health - 5;
                if (nextHealth <= 0) {
                  setGameWon(true);
                  createExplosion(robotPos.x, robotPos.y, true);
                  createExplosion(robotPos.x - 30, robotPos.y + 20, true);
                  createExplosion(robotPos.x + 30, robotPos.y - 20, true);
                  return 0;
                }
                return nextHealth;
              });
              return;
            }
          }

          const hitsLeft = nextX <= 0;
          const hitsRight = nextX >= window.innerWidth;
          const hitsTop = nextY <= 0;
          const hitsBottom = nextY >= window.innerHeight;

          if (hitsLeft || hitsRight || hitsTop || hitsBottom) {
            createExplosion(
              hitsLeft ? 0 : hitsRight ? window.innerWidth : nextX,
              hitsTop ? 0 : hitsBottom ? window.innerHeight : nextY,
            );
          } else {
            updated.push({ ...b, x: nextX, y: nextY });
          }
        });

        return updated;
      });

      setParticles((prevParticles) =>
        prevParticles
          .map((p) => ({
            ...p,
            x: p.x + p.velX,
            y: p.y + p.velY,
            opacity: p.opacity - 0.02,
          }))
          .filter((p) => p.opacity > 0),
      );

      animationFrame = requestAnimationFrame(updatePhysics);
    };

    animationFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos, robotPos, gameWon]);

  // 6. Robot Enemy Automated Fire Loop
  useEffect(() => {
    if (gameWon) return;

    const interval = setInterval(() => {
      const angleRad = (angle * Math.PI) / 180;
      const barrelLength = 50;
      const barrelX = robotPos.x + Math.cos(angleRad) * barrelLength;
      const barrelY = robotPos.y + Math.sin(angleRad) * barrelLength;

      const targetDx = mousePos.x - barrelX;
      const targetDxY = mousePos.y - barrelY;
      const distance = Math.sqrt(targetDx * targetDx + targetDxY * targetDxY);

      const speed = 16;
      const velX = distance === 0 ? speed : (targetDx / distance) * speed;
      const velY = distance === 0 ? 0 : (targetDxY / distance) * speed;

      setBullets((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: barrelX,
          y: barrelY,
          velX,
          velY,
          angle,
        },
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, [mousePos, robotPos, angle, gameWon]);

  // Handles the 5-second ticking down countdown and final home redirection
  useEffect(() => {
    if (!gameWon) return;

    // 1. Ticker loop: Runs every 1 second to update the UI text number
    const tickerInterval = setInterval(() => {
      setReturnToHomeCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    // 2. Redirect timer: Executes the actual router push exactly after 5 seconds
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(tickerInterval);
      clearTimeout(redirectTimer);
    };
  }, [gameWon, router]);

  return (
    <>
      <style>{`
        @keyframes robotHover {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-15px); }
        }
        @keyframes thrusterGlow {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.4); }
        }
        @keyframes textPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(0,242,254,0.6), 0 0 40px rgba(0,242,254,0.3); transform: scale(1); }
          50% { text-shadow: 0 0 35px rgba(255,0,127,0.9), 0 0 70px rgba(255,0,127,0.5); transform: scale(1.05); }
        }
      `}</style>

      {/* --- 1. TARGETING RETICLE OVERLAY --- */}
      {!gameWon && (
        <div
          className="fixed pointer-events-none z-50 w-8 h-8 border border-dashed border-red-500 rounded-full flex items-center justify-center mix-blend-difference"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
        </div>
      )}

      {/* --- 2. BOSS HEALTH DASHBOARD BAR --- */}
      {!gameWon && (
        <div className="fixed top-15 left-1/2 -translate-x-1/2 w-[85%] max-w-md bg-slate-900/90 border border-slate-700/50 p-3 rounded-xl backdrop-blur-md z-50 flex flex-col gap-1.5 shadow-2xl">
          <div className="flex justify-between text-[11px] font-mono tracking-widest text-cyan-400 font-bold">
            <span>ROBO_LORD_HEALTH_BAR</span>
            <span className="text-red-400 font-black">{bossHealth}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-md overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-sm bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 shadow-[0_0_8px_#ef4444] transition-all duration-75"
              style={{ width: `${bossHealth}%` }}
            />
          </div>
        </div>
      )}

      {/* --- 3. BULLETS LAYER --- */}
      {bullets.map((bullet) => (
        <div
          key={bullet.id}
          className={`absolute pointer-events-none z-50 rounded-full ${
            bullet.isPlayer
              ? "bg-red-500 shadow-[0_0_10px_#ef4444] w-3 h-3"
              : "bg-cyan-400 shadow-[0_0_10px_#00f2fe] w-[16px] h-[2.5px]"
          }`}
          style={{
            left: `${bullet.x}px`,
            top: `${bullet.y}px`,
            transform: `translate(-50%, -50%) rotate(${bullet.angle}deg)`,
            willChange: "left, top",
          }}
        />
      ))}

      {/* --- 4. FIREWORKS & SPLASH PARTICLES LAYER --- */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-50 mix-blend-screen"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 12px ${p.color}`,
            transform: "translate(-50%, -50%)",
            willChange: "left, top, opacity",
          }}
        />
      ))}

      {/* --- 5. CLEAN CENTRAL VICTORY SCREEN TEXT MESSAGE --- */}
      {gameWon && (
        <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-50 select-none p-4 backdrop-blur-sm">
          <h1
            className="text-5xl md:text-7xl font-mono font-black text-white tracking-tighter text-center"
            style={{ animation: "textPulse 2.5s ease-in-out infinite" }}
          >
            SYSTEM SECURED
          </h1>
          <p className="text-sm md:text-base font-mono mt-4 font-bold uppercase tracking-widest text-slate-400 text-center drop-shadow-md">
            Returning to Home in {returnToHomeCountdown} Seconds...
          </p>
        </div>
      )}

      {/* --- 6. FLOATING ROBOT DRONE --- */}
      {!gameWon && (
        <div
          className="absolute pointer-events-none select-none z-40 flex flex-col items-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
          style={{
            left: `${robotPos.x}px`,
            top: `${robotPos.y}px`,
            animation: "robotHover 3s ease-in-out infinite",
            willChange: "transform",
          }}
        >
          <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
            <path
              d="M 44 82 L 50 110 L 56 82 Z"
              fill="url(#thrusterGradient)"
              style={{
                animation: "thrusterGlow 0.15s ease-in-out infinite",
                transformOrigin: "50% 82px",
              }}
            />
            <path
              d="M 25 35 C 25 20, 75 20, 75 35 L 70 75 C 70 82, 30 82, 30 75 Z"
              stroke="#00f2fe"
              strokeWidth="4"
              fill="rgba(15,23,42,0.9)"
            />
            <path
              d="M 25 40 L 5 45 L 12 65 L 28 60"
              stroke="#00f2fe"
              strokeWidth="3"
              fill="rgba(30,41,59,0.7)"
            />
            <path
              d="M 75 40 L 95 45 L 88 65 L 72 60"
              stroke="#00f2fe"
              strokeWidth="3"
              fill="rgba(30,41,59,0.7)"
            />
            <circle
              cx="50"
              cy="45"
              r="9"
              stroke="#ff007f"
              strokeWidth="3"
              fill="rgba(15,23,42,1)"
            />
            <circle
              cx="50"
              cy="45"
              r="3"
              fill="#ff007f"
              className="animate-ping"
            />
            <circle cx="50" cy="45" r="2.5" fill="#ffffff" />
            <g
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "50px 52px",
              }}
            >
              <circle
                cx="50"
                cy="52"
                r="6"
                fill="#64748b"
                stroke="#00f2fe"
                strokeWidth="2"
              />
              <path d="M 50 48 L 94 48" stroke="#ffffff" strokeWidth="3" />
              <path d="M 50 56 L 94 56" stroke="#ffffff" strokeWidth="3" />
              <line
                x1="90"
                y1="46"
                x2="90"
                y2="58"
                stroke="#00f2fe"
                strokeWidth="2.5"
              />
              <line
                x1="94"
                y1="52"
                x2="180"
                y2="52"
                stroke="#ff007f"
                strokeWidth="1"
                strokeDasharray="3 5"
                className="opacity-50"
              />
            </g>
            <defs>
              <linearGradient id="thrusterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff007f" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </>
  );
}
