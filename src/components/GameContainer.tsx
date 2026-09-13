'use client';

import { useEffect, useRef } from 'react';

import { EventBus, GAME_EVENTS } from '../game/EventBus';

interface GameContainerProps {
  onSceneReady?: () => void;
}

export default function GameContainer({ onSceneReady }: GameContainerProps) {
  const gameRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingSceneRef = useRef<string | null>(null);

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

        if (pendingSceneRef.current && pendingSceneRef.current !== 'ArabiaMapScene') {
          const target = pendingSceneRef.current;
          pendingSceneRef.current = null;
          setTimeout(() => {
            if (gameRef.current?.scene) {
              const sm = gameRef.current.scene;
              sm.getScenes(true).forEach((s: any) => {
                if (s?.scene?.key !== target) {
                  sm.stop(s.scene.key);
                }
              });
              sm.start(target);
            }
          }, 150);
        }
      }
    }

    const handleSwitchScene = (targetScene: string) => {
      if (!gameRef.current || !gameRef.current.scene) {
        pendingSceneRef.current = targetScene;
        return;
      }

      try {
        const sceneManager = gameRef.current.scene;
        if (sceneManager.isActive(targetScene)) return;

        const activeScenes = sceneManager.getScenes(true);
        activeScenes.forEach((s: any) => {
          if (s && s.scene && s.scene.key !== targetScene) {
            sceneManager.stop(s.scene.key);
          }
        });
        sceneManager.start(targetScene);
      } catch (err) {
        console.error('Error switching scene in Phaser:', err);
      }
    };

    EventBus.on(GAME_EVENTS.SWITCH_SCENE, handleSwitchScene);

    initPhaser();

    return () => {
      isMounted = false;
      EventBus.removeListener(GAME_EVENTS.SWITCH_SCENE, handleSwitchScene);
      if (gameRef.current) {
        try {
          gameRef.current.destroy(true);
        } catch (e) {
          // ignore cleanup errors on unmount
        }
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
