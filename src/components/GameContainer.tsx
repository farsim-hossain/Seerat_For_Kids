'use client';

import { useEffect, useRef } from 'react';

interface GameContainerProps {
  onSceneReady?: () => void;
}

export default function GameContainer({ onSceneReady }: GameContainerProps) {
  const gameRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function initPhaser() {
      if (typeof window === 'undefined' || !containerRef.current) return;

      // Dynamically import Phaser Game and Config only in the browser
      const [{ Game }, { createPhaserConfig }] = await Promise.all([
        import('phaser'),
        import('../game/config')
      ]);

      if (!isMounted) return;

      if (!gameRef.current && containerRef.current) {
        const config = createPhaserConfig(containerRef.current);
        gameRef.current = new Game(config);
        onSceneReady?.();
      }
    }

    initPhaser();

    return () => {
      isMounted = false;
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [onSceneReady]);

  return (
    <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-300/50 bg-slate-900">
      <div ref={containerRef} id="phaser-game" className="w-full h-full" />
    </div>
  );
}
