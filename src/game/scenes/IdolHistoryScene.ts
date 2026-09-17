import { Scene, GameObjects } from 'phaser';
import { EventBus, GAME_EVENTS, currentAppLanguage } from '../EventBus';
import { CHAPTER_1_SECTION_3_DATA } from '../../data/chapter1Data';

export class IdolHistoryScene extends Scene {
  private titleBanner?: GameObjects.Text;
  private promptText?: GameObjects.Text;
  private backBtn?: GameObjects.Text;
  private stationLabels: { label: GameObjects.Text; stationId: string; nameBn: string; nameEn: string }[] = [];

  constructor() {
    super('IdolHistoryScene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;
    this.stationLabels = [];

    // 1. High-resolution pre-Islamic sanctuary background artwork
    if (this.textures.exists('hubal_idol_sanctuary')) {
      const bgChamber = this.add.image(w / 2, h / 2, 'hubal_idol_sanctuary');
      bgChamber.setDisplaySize(w, h);
    } else {
      const sky = this.add.graphics();
      sky.fillGradientStyle(0x451a03, 0x78350f, 0x92400e, 0x451a03, 1);
      sky.fillRect(0, 0, w, h);
    }

    // Header Title Banner
    this.titleBanner = this.add.text(w * 0.5, 36, '', {
      fontFamily: 'sans-serif',
      fontSize: '17px',
      color: '#fef3c7',
      backgroundColor: '#451a03f0',
      padding: { x: 16, y: 8 },
    }).setOrigin(0.5);

    // Instruction Prompt Banner
    this.promptText = this.add.text(w * 0.5, h * 0.38, '', {
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#451a03',
      backgroundColor: '#fef3c7f0',
      padding: { x: 12, y: 6 },
    }).setOrigin(0.5);

    // Back to Map Button
    this.backBtn = this.add.text(65, 36, '', {
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#ffffff',
      backgroundColor: '#0284c7',
      padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    this.backBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'ArabiaMapScene');
    });

    // 2. Interactive Stations for Pre-Islamic Religion & Reform
    const stationPositions = [
      {
        id: 'hubal_idols',
        x: w * 0.22,
        y: h * 0.62,
        color: 0xd97706,
        iconBg: 0xfbbf24,
      },
      {
        id: 'azlam_arrows',
        x: w * 0.40,
        y: h * 0.76,
        color: 0xb45309,
        iconBg: 0xf59e0b,
      },
      {
        id: 'animal_superstition',
        x: w * 0.60,
        y: h * 0.76,
        color: 0x9a3412,
        iconBg: 0xf97316,
      },
      {
        id: 'noble_character',
        x: w * 0.78,
        y: h * 0.62,
        color: 0x047857,
        iconBg: 0x34d399,
      },
    ];

    CHAPTER_1_SECTION_3_DATA.stations.forEach((st) => {
      const pos = stationPositions.find((p) => p.id === st.id) || {
        x: w * 0.5,
        y: h * 0.6,
        color: 0xd97706,
        iconBg: 0xfbbf24,
      };

      // Glowing Outer Ring
      const spot = this.add.circle(pos.x, pos.y, 28, pos.color, 0.85)
        .setInteractive({ cursor: 'pointer' });

      this.tweens.add({
        targets: spot,
        scale: 1.15,
        duration: 900,
        yoyo: true,
        repeat: -1,
      });

      // Inner Core Circle
      this.add.circle(pos.x, pos.y, 14, pos.iconBg, 1);

      // Icon Emoji / Emblem Text
      this.add.text(pos.x, pos.y, st.icon, {
        fontSize: '14px',
      }).setOrigin(0.5);

      // Label Text
      const isBn = currentAppLanguage === 'bn';
      const label = this.add.text(pos.x, pos.y + 38, isBn ? st.nameBn : st.nameEn, {
        fontFamily: 'sans-serif',
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#0f172acc',
        padding: { x: 8, y: 3 },
      }).setOrigin(0.5);

      this.stationLabels.push({
        label,
        stationId: st.id,
        nameBn: st.nameBn,
        nameEn: st.nameEn,
      });

      spot.on('pointerdown', () => {
        this.emitParticles(pos.x, pos.y, pos.color);
        EventBus.emit(GAME_EVENTS.RELIGIOUS_STATION_SELECTED, st.id);
        EventBus.emit(GAME_EVENTS.CELEBRATE);
      });
    });

    // Set Initial Language Strings
    this.updateLanguage(currentAppLanguage);

    // Notify React that IdolHistoryScene is active
    EventBus.emit(GAME_EVENTS.SCENE_CHANGED, 'IdolHistoryScene');

    // Listener for language toggle
    const handleLanguageChange = (lang: 'bn' | 'en') => {
      this.updateLanguage(lang);
    };

    EventBus.on(GAME_EVENTS.LANGUAGE_CHANGED, handleLanguageChange);

    const cleanup = () => {
      EventBus.removeListener(GAME_EVENTS.LANGUAGE_CHANGED, handleLanguageChange);
    };
    this.events.once('shutdown', cleanup);
    this.events.once('destroy', cleanup);

    EventBus.emit(GAME_EVENTS.SCENE_READY, 'IdolHistoryScene');
  }

  private emitParticles(x: number, y: number, color: number) {
    for (let i = 0; i < 14; i++) {
      const p = this.add.circle(x, y, 4, color, 1);
      const angle = (i / 14) * Math.PI * 2;
      const speed = 60 + Math.random() * 40;

      this.tweens.add({
        targets: p,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed,
        alpha: 0,
        scale: 0.2,
        duration: 600,
        onComplete: () => p.destroy(),
      });
    }
  }

  private updateLanguage(lang: 'bn' | 'en') {
    const isBn = lang === 'bn';

    if (this.titleBanner && this.titleBanner.active && this.titleBanner.scene) {
      this.titleBanner.setText(
        isBn
          ? '🏺 প্রাক-ইসলামী ধর্ম, কুসংস্কার ও নৈতিক সংস্কারের মানচিত্র'
          : '🏺 Map of Pre-Islamic Religion, Superstitions & Moral Reform'
      );
    }

    if (this.promptText && this.promptText.active && this.promptText.scene) {
      this.promptText.setText(
        isBn
          ? '💡যেকোনো ঐতিহাসিক বিষয় বা নৈতিক স্তম্ভের ওপর ট্যাপ করে বিস্তারিত আবিষ্কার করো!'
          : '💡 Tap on any historical topic or moral pillar to explore details!'
      );
    }

    if (this.backBtn && this.backBtn.active && this.backBtn.scene) {
      this.backBtn.setText(isBn ? '⬅ মানচিত্রে ফিরুন' : '⬅ Back to Map');
    }

    this.stationLabels.forEach(({ label, nameBn, nameEn }) => {
      if (label && label.active && label.scene) {
        label.setText(isBn ? nameBn : nameEn);
      }
    });
  }
}
