import { Scene, GameObjects } from 'phaser';
import { EventBus, GAME_EVENTS, currentAppLanguage } from '../EventBus';

export class ZamzamScene extends Scene {
  private waterDiscovered = false;
  private jurhumArrived = false;
  private kabahBuilt = false;

  // Text references
  private titleBanner?: GameObjects.Text;
  private promptText?: GameObjects.Text;
  private backBtn?: GameObjects.Text;
  private jurhumLabel?: GameObjects.Text;
  private kabahLabel?: GameObjects.Text;

  constructor() {
    super('ZamzamScene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // Desert sky gradient (Golden dusk)
    const sky = this.add.graphics();
    sky.fillGradientStyle(0xfde68a, 0xfde68a, 0xf59e0b, 0xd97706, 1);
    sky.fillRect(0, 0, w, h);

    // Mountain silhouettes of Makkah (Safa and Marwah hills)
    const mountains = this.add.graphics();
    mountains.fillStyle(0x78350f, 0.5);
    mountains.fillTriangle(w * 0.05, h * 0.65, w * 0.25, h * 0.35, w * 0.45, h * 0.65);
    mountains.fillTriangle(w * 0.55, h * 0.65, w * 0.78, h * 0.38, w * 0.95, h * 0.65);

    // Valley ground
    const ground = this.add.graphics();
    ground.fillStyle(0xcca362, 1);
    ground.fillRect(0, h * 0.6, w, h * 0.4);
    ground.lineStyle(4, 0xa16207, 1);
    ground.lineBetween(0, h * 0.6, w, h * 0.6);

    // Title banner
    this.titleBanner = this.add.text(w * 0.5, 36, '', {
      fontFamily: 'sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#78350fee',
      padding: { x: 16, y: 8 },
    }).setOrigin(0.5);

    // Instruction prompt
    this.promptText = this.add.text(w * 0.5, h * 0.68, '', {
      fontFamily: 'sans-serif',
      fontSize: '15px',
      color: '#451a03',
      backgroundColor: '#fef3c7cc',
      padding: { x: 12, y: 6 },
    }).setOrigin(0.5);

    // Glowing pulse tween for instruction prompt bar
    this.tweens.add({
      targets: this.promptText,
      scale: 1.06,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // Back to Map Button
    this.backBtn = this.add.text(70, 36, '', {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#0284c7',
      padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    this.backBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'ArabiaMapScene');
    });

    // Zamzam interaction spot
    const wellSpot = this.add.circle(w * 0.5, h * 0.78, 36, 0xd97706, 0.4)
      .setInteractive({ cursor: 'pointer' });

    this.tweens.add({
      targets: wellSpot,
      scale: 1.2,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    wellSpot.on('pointerdown', () => {
      if (!this.waterDiscovered) {
        this.waterDiscovered = true;
        this.updatePromptText(currentAppLanguage);
        this.spurtWater(w * 0.5, h * 0.78);
        this.spawnJurhumTents(w, h);
        EventBus.emit(GAME_EVENTS.CELEBRATE);
      } else if (!this.kabahBuilt) {
        this.kabahBuilt = true;
        this.updatePromptText(currentAppLanguage);
        this.buildKabah(w * 0.5, h * 0.48);
        EventBus.emit(GAME_EVENTS.CELEBRATE);
      }
    });

    // Set initial strings
    this.updateLanguageStrings(currentAppLanguage);

    // Notify React that ZamzamScene is active
    EventBus.emit(GAME_EVENTS.SCENE_CHANGED, 'ZamzamScene');

    // Language listener
    const onLanguageChanged = (lang: 'bn' | 'en') => {
      this.updateLanguageStrings(lang);
    };

    EventBus.on(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);

    const cleanup = () => {
      EventBus.removeListener(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);
    };
    this.events.once('shutdown', cleanup);
    this.events.once('destroy', cleanup);
  }

  private updateLanguageStrings(lang: 'bn' | 'en') {
    const isBn = lang === 'bn';

    if (this.titleBanner && this.titleBanner.active) {
      this.titleBanner.setText(
        isBn
          ? 'মরুভূমিতে অলৌকিক যমযম ও কাবা নির্মাণ'
          : 'The Miracle of Zamzam & Building the Ka\'bah'
      );
    }

    if (this.backBtn && this.backBtn.active) {
      this.backBtn.setText(isBn ? '← আরবের মানচিত্র' : '← Arabia Map');
    }

    this.updatePromptText(lang);

    if (this.jurhumLabel && this.jurhumLabel.active) {
      this.jurhumLabel.setText(isBn ? '⛺ বনু জুরহুম গোত্র' : '⛺ Banu Jurhum Tribe');
    }

    if (this.kabahLabel && this.kabahLabel.active) {
      this.kabahLabel.setText(isBn ? 'বাইতুল্লাহ (পবিত্র কাবা)' : 'Baytullah (Holy Ka\'bah)');
    }
  }

  private updatePromptText(lang: 'bn' | 'en') {
    if (!this.promptText || !this.promptText.active) return;
    const isBn = lang === 'bn';

    if (!this.waterDiscovered) {
      this.promptText.setText(
        isBn
          ? '👇 ট্যাপ করে যমযমের পানির সন্ধান করো!'
          : '👇 Tap the desert ground to reveal the water of Zamzam!'
      );
    } else if (!this.kabahBuilt) {
      this.promptText.setText(
        isBn
          ? '💧 যমযমের পানি প্রবাহিত হলো! (আবার ট্যাপ করে কাবা নির্মাণ করো)'
          : '💧 Pure Zamzam water gushes forth! (Tap again to build the Ka\'bah)'
      );
    } else {
      this.promptText.setText(
        isBn
          ? '🕋 হযরত ইবরাহীম (আ.) ও ইসমাঈল (আ.) কাবার ভিত্তি স্থাপন করলেন!'
          : '🕋 Prophet Ibrahim (AS) & Ismail (AS) raised the foundations of the Ka\'bah!'
      );
    }
  }

  private spurtWater(x: number, y: number) {
    const pool = this.add.graphics();
    pool.fillStyle(0x0284c7, 0.85);
    pool.fillEllipse(x, y, 70, 30);
    pool.lineStyle(3, 0x38bdf8, 1);
    pool.strokeEllipse(x, y, 70, 30);

    this.time.addEvent({
      delay: 150,
      repeat: 30,
      callback: () => {
        for (let i = 0; i < 3; i++) {
          const drop = this.add.sprite(x, y - 5, 'particle_water');
          const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
          const speed = 40 + Math.random() * 50;

          this.tweens.add({
            targets: drop,
            x: x + Math.cos(angle) * speed,
            y: y + Math.sin(angle) * speed,
            alpha: 0,
            scale: 0.3,
            duration: 800,
            onComplete: () => drop.destroy()
          });
        }
      }
    });
  }

  private spawnJurhumTents(w: number, h: number) {
    if (this.jurhumArrived) return;
    this.jurhumArrived = true;

    const tents = this.add.graphics();
    tents.fillStyle(0x7c2d12, 0.9);
    tents.fillTriangle(w * 0.15, h * 0.78, w * 0.22, h * 0.65, w * 0.29, h * 0.78);
    tents.fillTriangle(w * 0.25, h * 0.82, w * 0.31, h * 0.70, w * 0.37, h * 0.82);

    const isBn = currentAppLanguage === 'bn';
    this.jurhumLabel = this.add.text(w * 0.22, h * 0.83, isBn ? '⛺ বনু জুরহুম গোত্র' : '⛺ Banu Jurhum Tribe', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#ffffff',
      backgroundColor: '#7c2d12',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);
  }

  private buildKabah(x: number, y: number) {
    const aura = this.add.circle(x, y + 20, 70, 0xfef08a, 0.3);
    this.tweens.add({
      targets: aura,
      scale: 1.3,
      alpha: 0.1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    const kabah = this.add.graphics();
    kabah.fillStyle(0x1e1b4b, 1);
    kabah.fillRect(x - 35, y - 10, 70, 65);
    kabah.fillStyle(0xf59e0b, 1);
    kabah.fillRect(x - 35, y + 6, 70, 8);

    const isBn = currentAppLanguage === 'bn';
    this.kabahLabel = this.add.text(x, y + 65, isBn ? 'বাইতুল্লাহ (পবিত্র কাবা)' : 'Baytullah (Holy Ka\'bah)', {
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#ffffff',
      backgroundColor: '#1e1b4b',
      padding: { x: 6, y: 3 },
    }).setOrigin(0.5);
  }
}
