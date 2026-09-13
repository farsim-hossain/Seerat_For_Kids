'use client';

import { useEffect, useRef } from 'react';

import { EventBus, GAME_EVENTS } from '../game/EventBus';

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

    const handleSwitchScene = (targetScene: string) => {
      if (gameRef.current && gameRef.current.scene) {
        const sceneManager = gameRef.current.scene;
        const activeScenes = sceneManager.getScenes(true);
        activeScenes.forEach((s: any) => {
          if (s.scene.key !== targetScene) {
            s.scene.stop();
          }
        });
        sceneManager.start(targetScene);
      }
    };

    EventBus.on(GAME_EVENTS.SWITCH_SCENE, handleSwitchScene);

    initPhaser();

    return () => {
      isMounted = false;
      EventBus.removeListener(GAME_EVENTS.SWITCH_SCENE, handleSwitchScene);
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
