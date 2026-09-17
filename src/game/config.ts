import { AUTO, Scale, Types } from 'phaser';
import { BootScene } from './scenes/BootScene';
import { ArabiaMapScene } from './scenes/ArabiaMapScene';
import { ZamzamScene } from './scenes/ZamzamScene';
import { DarAlNadwahScene } from './scenes/DarAlNadwahScene';
import { MakkahJourneyScene } from './scenes/MakkahJourneyScene';
import { IdolHistoryScene } from './scenes/IdolHistoryScene';

export const createPhaserConfig = (parent: HTMLElement): Types.Core.GameConfig => ({
  type: AUTO,
  parent: parent,
  backgroundColor: '#075985',
  width: 1024,
  height: 600,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [BootScene, ArabiaMapScene, ZamzamScene, DarAlNadwahScene, MakkahJourneyScene, IdolHistoryScene],
});
