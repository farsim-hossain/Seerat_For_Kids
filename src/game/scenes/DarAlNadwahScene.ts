import { Scene, GameObjects } from 'phaser';
import { EventBus, GAME_EVENTS, currentAppLanguage } from '../EventBus';
import { CHAPTER_1_SECTION_2_DATA } from '../../data/chapter1Data';

export class DarAlNadwahScene extends Scene {
  private titleBanner?: GameObjects.Text;
  private promptText?: GameObjects.Text;
  private backBtn?: GameObjects.Text;
  private stationLabels: { label: GameObjects.Text; portfolioId: string; nameBn: string; nameEn: string }[] = [];

  constructor() {
    super('DarAlNadwahScene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;
    this.stationLabels = [];

    // 1. High-resolution council chamber interior artwork
    if (this.textures.exists('dar_al_nadwah_interior')) {
      const bgChamber = this.add.image(w / 2, h / 2, 'dar_al_nadwah_interior');
      bgChamber.setDisplaySize(w, h);
    } else {
      const sky = this.add.graphics();
      sky.fillGradientStyle(0x1e1b4b, 0x312e81, 0x4338ca, 0x1e1b4b, 1);
      sky.fillRect(0, 0, w, h);
    }

    // Title banner
    this.titleBanner = this.add.text(w * 0.5, 36, '', {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#fef3c7',
      backgroundColor: '#451a03ee',
      padding: { x: 16, y: 8 },
    }).setOrigin(0.5);

    // Instruction prompt
    this.promptText = this.add.text(w * 0.5, h * 0.42, '', {
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#451a03',
      backgroundColor: '#fef3c7f0',
      padding: { x: 12, y: 6 },
    }).setOrigin(0.5);

    // Back button
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

    // 2. Interactive Stations for the 5 Primary Portfolios
    const stations = [
      {
        id: 'siqayah',
        x: w * 0.23,
        y: h * 0.62,
        color: 0x0284c7,
        iconBg: 0x38bdf8,
        nameBn: '১. আস-সিক্বায়াহ (পানি)',
        nameEn: '1. Al-Siqayah (Water)',
      },
      {
        id: 'rifadah',
        x: w * 0.38,
        y: h * 0.78,
        color: 0xd97706,
        iconBg: 0xfbbf24,
        nameBn: '২. আর-রিফাদাহ (খাবার)',
        nameEn: '2. Al-Rifadah (Feast)',
      },
      {
        id: 'hijabah',
        x: w * 0.5,
        y: h * 0.58,
        color: 0xb45309,
        iconBg: 0xf59e0b,
        nameBn: '৩. আল-হিজাবাহ (কাবার চাবি)',
        nameEn: '3. Al-Hijabah (Key)',
      },
      {
        id: 'liwa',
        x: w * 0.62,
        y: h * 0.78,
        color: 0xb91c1c,
        iconBg: 0xf87171,
        nameBn: '৪. আল-লিওয়া (পতাকা)',
        nameEn: '4. Al-Liwa (Banner)',
      },
      {
        id: 'sifarah',
        x: w * 0.77,
        y: h * 0.62,
        color: 0x047857,
        iconBg: 0x34d399,
        nameBn: '৫. আস-সিফারাহ (কূটনীতি)',
        nameEn: '5. Al-Sifarah (Envoys)',
      },
    ];

    stations.forEach((st) => {
      // Glow circle
      const spot = this.add.circle(st.x, st.y, 28, st.color, 0.8)
        .setInteractive({ cursor: 'pointer' });

      this.tweens.add({
        targets: spot,
        scale: 1.15,
        duration: 900,
        yoyo: true,
        repeat: -1,
      });

      // Inner emblem core
      this.add.circle(st.x, st.y, 14, st.iconBg, 1);

      // Label text
      const isBn = currentAppLanguage === 'bn';
      const label = this.add.text(st.x, st.y + 36, isBn ? st.nameBn : st.nameEn, {
        fontFamily: 'sans-serif',
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#0f172acc',
        padding: { x: 8, y: 3 },
      }).setOrigin(0.5);

      this.stationLabels.push({
        label,
        portfolioId: st.id,
        nameBn: st.nameBn,
        nameEn: st.nameEn,
      });

      spot.on('pointerdown', () => {
        // Particle burst
        this.emitParticles(st.x, st.y, st.color);
        EventBus.emit(GAME_EVENTS.PORTFOLIO_SELECTED, st.id);
        EventBus.emit(GAME_EVENTS.CELEBRATE);
      });
    });

    // Set initial text
    this.updateLanguage(currentAppLanguage);

    // Notify React that DarAlNadwahScene is active
    EventBus.emit(GAME_EVENTS.SCENE_CHANGED, 'DarAlNadwahScene');

    // Event listener for language toggle
    const handleLanguageChange = (lang: 'bn' | 'en') => {
      this.updateLanguage(lang);
    };

    EventBus.on(GAME_EVENTS.LANGUAGE_CHANGED, handleLanguageChange);

    const cleanup = () => {
      EventBus.removeListener(GAME_EVENTS.LANGUAGE_CHANGED, handleLanguageChange);
    };
    this.events.once('shutdown', cleanup);
    this.events.once('destroy', cleanup);

    EventBus.emit(GAME_EVENTS.SCENE_READY, 'DarAlNadwahScene');
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
          ? '🏛️ কুসাই বিন কিলাবের ঐতিহাসিক দারুন নদওয়া (মক্কার সংসদ)'
          : '🏛️ Historic Dar al-Nadwah (The Council Hall of Makkah)'
      );
    }

    if (this.promptText && this.promptText.active && this.promptText.scene) {
      this.promptText.setText(
        isBn
          ? '💡 কুরাইশের যেকোনো সংসদীয় দায়িত্বের ওপর ট্যাপ করে বিস্তারিত ইতিহাস ও নৈতিক শিক্ষা আবিষ্কার করো!'
          : '💡 Tap on any portfolio station to explore its historic responsibility and lesson!'
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
