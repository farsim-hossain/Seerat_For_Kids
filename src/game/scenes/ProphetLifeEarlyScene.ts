import { Scene, Math as PMath } from 'phaser';
import { EventBus, GAME_EVENTS } from '../EventBus';
import { CHAPTER_2_SECTION_2_DATA } from '../../data/chapter2Section2Data';

export class ProphetLifeEarlyScene extends Scene {
  private currentPhase: number = 1;
  private readonly maxPhase: number = 5;

  // Background and containers
  private currentBgImage?: Phaser.GameObjects.Image;
  private dynamicContent?: Phaser.GameObjects.Container;
  private particlesContainer?: Phaser.GameObjects.Container;
  private promptBox?: Phaser.GameObjects.Container;
  private promptTitle?: Phaser.GameObjects.Text;
  private promptSubtitle?: Phaser.GameObjects.Text;

  // Bottom HUD
  private prevBtn?: Phaser.GameObjects.Container;
  private nextBtn?: Phaser.GameObjects.Container;
  private phaseDots: Phaser.GameObjects.Arc[] = [];

  // Interactive state flags
  private rainActive: boolean = false;
  private mountSpeedActive: boolean = false;
  private zamzamPurifyActive: boolean = false;

  constructor() {
    super('ProphetLifeEarlyScene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // 1. Static ambient overlay & glow
    this.createAmbientGlow(w, h);

    // 2. Containers
    this.dynamicContent = this.add.container(0, 0);
    this.particlesContainer = this.add.container(0, 0);

    // 3. Top HUD: Story Prompt Box
    this.buildStoryPromptBox(w, h);

    // 4. Bottom HUD: Phase Navigators
    this.buildBottomHUD(w, h);

    // 5. Initial Render: Phase 1
    this.renderPhase(1);

    // Language listener
    const onLanguageChanged = () => {
      this.updateLanguageStrings();
    };
    EventBus.on(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);

    this.events.once('shutdown', () => {
      EventBus.removeListener(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);
    });

    EventBus.emit(GAME_EVENTS.SCENE_READY, 'ProphetLifeEarlyScene');
    EventBus.emit(GAME_EVENTS.SCENE_CHANGED, 'ProphetLifeEarlyScene');
  }

  // --- Top Story Prompt Box ---
  private buildStoryPromptBox(w: number, _h: number) {
    this.promptBox = this.add.container(w * 0.5, 88);

    const bg = this.add.graphics();
    bg.fillStyle(0xfffbeb, 0.95);
    bg.fillRoundedRect(-330, -10, 660, 58, 14);
    bg.lineStyle(2, 0xd97706, 0.85);
    bg.strokeRoundedRect(-330, -10, 660, 58, 14);

    this.promptTitle = this.add.text(0, 4, '', {
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#451a03',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.promptSubtitle = this.add.text(0, 26, '', {
      fontFamily: 'sans-serif',
      fontSize: '11px',
      color: '#78350f',
    }).setOrigin(0.5);

    this.promptBox.add([bg, this.promptTitle, this.promptSubtitle]);
    this.promptBox.setDepth(20);
  }

  // --- Bottom Phase Navigation HUD ---
  private buildBottomHUD(w: number, h: number) {
    const hudContainer = this.add.container(w * 0.5, h - 38);
    hudContainer.setDepth(25);

    const hudBg = this.add.graphics();
    hudBg.fillStyle(0x0f172a, 0.85);
    hudBg.fillRoundedRect(-220, -22, 440, 44, 22);
    hudBg.lineStyle(1.5, 0xd97706, 0.8);
    hudBg.strokeRoundedRect(-220, -22, 440, 44, 22);
    hudContainer.add(hudBg);

    // Prev Button
    this.prevBtn = this.add.container(-160, 0);
    const prevText = this.add.text(0, 0, '◀ পূর্ববর্তী', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#fef3c7',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.prevBtn.add(prevText);
    this.prevBtn.setSize(75, 34);
    this.prevBtn.setInteractive({ useHandCursor: true });
    this.prevBtn.on('pointerdown', () => {
      if (this.currentPhase > 1) {
        this.renderPhase(this.currentPhase - 1);
      }
    });
    hudContainer.add(this.prevBtn);

    // 5 Phase Dots
    this.phaseDots = [];
    const dotSpacing = 22;
    const startX = -((this.maxPhase - 1) * dotSpacing) / 2;
    for (let i = 0; i < this.maxPhase; i++) {
      const dot = this.add.circle(startX + i * dotSpacing, 0, 5, 0xd97706, 0.5);
      dot.setInteractive({ useHandCursor: true });
      const phaseNum = i + 1;
      dot.on('pointerdown', () => this.renderPhase(phaseNum));
      hudContainer.add(dot);
      this.phaseDots.push(dot);
    }

    // Next Button
    this.nextBtn = this.add.container(160, 0);
    const nextText = this.add.text(0, 0, 'পরবর্তী ▶', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#fef3c7',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.nextBtn.add(nextText);
    this.nextBtn.setSize(75, 34);
    this.nextBtn.setInteractive({ useHandCursor: true });
    this.nextBtn.on('pointerdown', () => {
      if (this.currentPhase < this.maxPhase) {
        this.renderPhase(this.currentPhase + 1);
      }
    });
    hudContainer.add(this.nextBtn);
  }

  // --- Render Specific Story Phase ---
  private renderPhase(phase: number) {
    this.currentPhase = phase;
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // Clear dynamic content
    if (this.dynamicContent) {
      this.dynamicContent.removeAll(true);
    }
    if (this.particlesContainer) {
      this.particlesContainer.removeAll(true);
    }

    // Update Dots & Navigation states
    this.phaseDots.forEach((dot, idx) => {
      if (idx + 1 === phase) {
        dot.setFillStyle(0xfbbf24, 1);
        dot.setRadius(7);
      } else {
        dot.setFillStyle(0xd97706, 0.5);
        dot.setRadius(5);
      }
    });

    if (this.prevBtn) this.prevBtn.setAlpha(phase === 1 ? 0.35 : 1);
    if (this.nextBtn) this.nextBtn.setAlpha(phase === this.maxPhase ? 0.35 : 1);

    // Set Background Artwork
    this.drawPhaseBackground(phase, w, h);

    // Setup Phase specifics
    switch (phase) {
      case 1:
        this.setupPhase1BlessedBirth(w, h);
        break;
      case 2:
        this.setupPhase2BanuSadPastures(w, h);
        break;
      case 3:
        this.setupPhase3ShaqqAlSadrAbwa(w, h);
        break;
      case 4:
        this.setupPhase4KaBahMatAndRain(w, h);
        break;
      case 5:
        this.setupPhase5MonkBahiraBusra(w, h);
        break;
    }

    this.updateLanguageStrings();
  }

  private drawPhaseBackground(phase: number, w: number, h: number) {
    if (this.currentBgImage) {
      this.currentBgImage.destroy();
      this.currentBgImage = undefined;
    }

    let bgKey = 'makkah_valley_day';
    if (phase === 2) bgKey = 'banu_sad_desert_pasture';
    else if (phase === 3) bgKey = 'makkah_night_sanctuary';
    else if (phase === 4) bgKey = 'kabah_construction_bg';
    else if (phase === 5) bgKey = 'busra_syria_monastery';

    if (this.textures.exists(bgKey)) {
      this.currentBgImage = this.add.image(w / 2, h / 2, bgKey);
      this.currentBgImage.setDisplaySize(w, h);
      this.currentBgImage.setDepth(-10);
    }
  }

  // =========================================================================
  // Phase 1: The Blessed Birth & Naming in the Ka'bah
  // =========================================================================
  private setupPhase1BlessedBirth(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Naming in Ka'bah
    const namingBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '🕋',
      'কাবার ভেতরে শুকরিয়া ও নামকরণ',
      0xd97706
    );
    namingBtn.on('pointerdown', () => {
      this.spawnGoldSparkles(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'blessed_birth_571');
    });
    this.dynamicContent.add(namingBtn);

    // Action 2: Prophetic Light
    const lightBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '✨',
      'সিরিয়া পর্যন্ত আলোকিত করা নূর',
      0x059669
    );
    lightBtn.on('pointerdown', () => {
      this.spawnCelestialBeam(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'blessed_birth_571');
    });
    this.dynamicContent.add(lightBtn);
  }

  // =========================================================================
  // Phase 2: Banu Sa'd Wilderness & Halimah's Mount
  // =========================================================================
  private setupPhase2BanuSadPastures(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Mount Acceleration
    const speedBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '🐪',
      this.mountSpeedActive ? 'কাফেলা ছাড়িয়ে দ্রুততম গতি' : 'দুর্বল গাধীর বিস্ময়কর গতি',
      0xb45309
    );
    speedBtn.on('pointerdown', () => {
      this.mountSpeedActive = true;
      this.spawnDustRush(w * 0.35, h * 0.50);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'banu_sad_miracles');
    });
    this.dynamicContent.add(speedBtn);

    // Action 2: Green Pasture Blossoms
    const pastureBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '🌾',
      'অনুর্বর মরুতে সবুজ বরকত',
      0x047857
    );
    pastureBtn.on('pointerdown', () => {
      this.spawnEmeraldSparkles(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'banu_sad_miracles');
    });
    this.dynamicContent.add(pastureBtn);
  }

  // =========================================================================
  // Phase 3: Shaqq al-Sadr & Passing at Al-Abwa
  // =========================================================================
  private setupPhase3ShaqqAlSadrAbwa(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Shaqq al-Sadr Zamzam Cleansing
    const purifyBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '💎',
      this.zamzamPurifyActive ? 'যমযমে ধৌত পবিত্র কলব' : 'স্বর্ণপাত্রে যমযমে কলব ধৌত',
      0x0284c7
    );
    purifyBtn.on('pointerdown', () => {
      this.zamzamPurifyActive = true;
      this.spawnWaterFountain(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'shaqq_al_sadr_abwa');
    });
    this.dynamicContent.add(purifyBtn);

    // Action 2: Al-Abwa Passing
    const abwaBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '🥀',
      'আবওয়ায় মমতাময়ী আমিনার বিয়োগ',
      0x7f1d1d
    );
    abwaBtn.on('pointerdown', () => {
      this.spawnGentleTearGlow(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'shaqq_al_sadr_abwa');
    });
    this.dynamicContent.add(abwaBtn);
  }

  // =========================================================================
  // Phase 4: Ka'bah Shade & Miraculous Rain Prayer
  // =========================================================================
  private setupPhase4KaBahMatAndRain(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Grandfather's VIP Mat
    const matBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '👑',
      'কাবার ছায়ায় দাদার বিশেষ আসন',
      0xd97706
    );
    matBtn.on('pointerdown', () => {
      this.spawnGoldSparkles(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'abdul_muttalib_abu_talib_rain');
    });
    this.dynamicContent.add(matBtn);

    // Action 2: Torrential Rain Prayer
    const rainBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '🌧️',
      this.rainActive ? 'উপত্যকা ভাসিয়ে মুষলধারে বৃষ্টি' : 'বৃষ্টির জন্য কাবার দেয়ালে আকুল প্রার্থনা',
      0x0284c7
    );
    rainBtn.on('pointerdown', () => {
      this.rainActive = true;
      this.spawnRainShower(w, h);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'abdul_muttalib_abu_talib_rain');
    });
    this.dynamicContent.add(rainBtn);
  }

  // =========================================================================
  // Phase 5: Busra in Syria & Monk Bahira's Testimony
  // =========================================================================
  private setupPhase5MonkBahiraBusra(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Prostrating Trees and Rocks
    const natureBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '🌿',
      'বৃক্ষ ও পাথরের মাথা নত করে সালাম',
      0x059669
    );
    natureBtn.on('pointerdown', () => {
      this.spawnNatureBreeze(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'monk_bahira_busra');
    });
    this.dynamicContent.add(natureBtn);

    // Action 2: Seal of Prophethood
    const sealBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '📜',
      'পাদ্রি বাহীরা ও মোহরে নবুওত',
      0x7c2d12
    );
    sealBtn.on('pointerdown', () => {
      this.spawnCelestialBeam(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'monk_bahira_busra');
    });
    this.dynamicContent.add(sealBtn);
  }

  // --- Particle & Visual Animation Spawners ---
  private spawnCelestialBeam(x: number, y: number) {
    if (!this.particlesContainer) return;
    const beam = this.add.graphics();
    beam.fillStyle(0xfef08a, 0.45);
    beam.fillTriangle(x, y - 140, x - 50, y + 60, x + 50, y + 60);
    this.particlesContainer.add(beam);

    this.tweens.add({
      targets: beam,
      alpha: 0,
      scaleY: 1.3,
      duration: 1500,
      onComplete: () => beam.destroy(),
    });
  }

  private spawnGoldSparkles(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 14; i++) {
      const p = this.add.circle(
        x + PMath.Between(-30, 30),
        y + PMath.Between(-30, 30),
        PMath.Between(3, 6),
        0xfef08a,
        1
      );
      this.particlesContainer.add(p);
      this.tweens.add({
        targets: p,
        y: p.y - PMath.Between(40, 80),
        alpha: 0,
        duration: PMath.Between(800, 1400),
        onComplete: () => p.destroy(),
      });
    }
  }

  private spawnEmeraldSparkles(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 16; i++) {
      const p = this.add.circle(
        x + PMath.Between(-35, 35),
        y + PMath.Between(-25, 25),
        PMath.Between(3, 5),
        0x34d399,
        0.9
      );
      this.particlesContainer.add(p);
      this.tweens.add({
        targets: p,
        y: p.y - PMath.Between(30, 60),
        scale: 1.5,
        alpha: 0,
        duration: 1000,
        onComplete: () => p.destroy(),
      });
    }
  }

  private spawnWaterFountain(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 20; i++) {
      const drop = this.add.circle(x, y, PMath.Between(3, 5), 0x38bdf8, 0.95);
      this.particlesContainer.add(drop);
      this.tweens.add({
        targets: drop,
        x: x + PMath.Between(-60, 60),
        y: y - PMath.Between(30, 90),
        alpha: 0,
        duration: 900,
        onComplete: () => drop.destroy(),
      });
    }
  }

  private spawnDustRush(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 15; i++) {
      const puff = this.add.circle(
        x + PMath.Between(-20, 20),
        y + PMath.Between(-10, 10),
        PMath.Between(6, 12),
        0xd97706,
        0.5
      );
      this.particlesContainer.add(puff);
      this.tweens.add({
        targets: puff,
        x: puff.x - PMath.Between(50, 120),
        alpha: 0,
        scale: 1.8,
        duration: 800,
        onComplete: () => puff.destroy(),
      });
    }
  }

  private spawnRainShower(w: number, h: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 40; i++) {
      const rx = PMath.Between(40, w - 40);
      const ry = PMath.Between(60, h * 0.4);
      const drop = this.add.line(0, 0, rx, ry, rx + 4, ry + 16, 0x60a5fa, 0.8);
      this.particlesContainer.add(drop);
      this.tweens.add({
        targets: drop,
        y: h * 0.5,
        alpha: 0,
        duration: PMath.Between(600, 1100),
        onComplete: () => drop.destroy(),
      });
    }
  }

  private spawnGentleTearGlow(x: number, y: number) {
    if (!this.particlesContainer) return;
    const halo = this.add.circle(x, y, 40, 0xfecaca, 0.4);
    this.particlesContainer.add(halo);
    this.tweens.add({
      targets: halo,
      scale: 1.5,
      alpha: 0,
      duration: 1600,
      onComplete: () => halo.destroy(),
    });
  }

  private spawnNatureBreeze(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 10; i++) {
      const leaf = this.add.circle(
        x + PMath.Between(-30, 30),
        y + PMath.Between(-20, 20),
        4,
        0x10b981,
        0.85
      );
      this.particlesContainer.add(leaf);
      this.tweens.add({
        targets: leaf,
        x: leaf.x + PMath.Between(40, 90),
        y: leaf.y - PMath.Between(20, 50),
        alpha: 0,
        duration: 1200,
        onComplete: () => leaf.destroy(),
      });
    }
  }

  // --- Helper UI Action Button ---
  private createActionButton(x: number, y: number, icon: string, labelText: string, color: number) {
    const container = this.add.container(x, y);

    const halo = this.add.graphics();
    halo.lineStyle(2.5, color, 0.75);
    halo.strokeCircle(0, 0, 36);
    container.add(halo);

    this.tweens.add({
      targets: halo,
      scaleX: 1.25,
      scaleY: 1.25,
      alpha: 0.15,
      duration: 1300,
      repeat: -1,
      yoyo: true,
    });

    const disc = this.add.graphics();
    disc.fillStyle(color, 0.95);
    disc.fillCircle(0, 0, 26);
    disc.lineStyle(2, 0xffffff, 0.9);
    disc.strokeCircle(0, 0, 26);

    const iconText = this.add.text(0, -1, icon, { fontSize: '20px' }).setOrigin(0.5);

    const labelBg = this.add.graphics();
    labelBg.fillStyle(0x0f172a, 0.88);
    labelBg.fillRoundedRect(-100, 34, 200, 26, 8);
    labelBg.lineStyle(1.5, color, 0.85);
    labelBg.strokeRoundedRect(-100, 34, 200, 26, 8);

    const btnText = this.add.text(0, 47, labelText, {
      fontFamily: 'sans-serif',
      fontSize: '11px',
      color: '#fef3c7',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    container.add([disc, iconText, labelBg, btnText]);
    container.setSize(200, 90);
    container.setInteractive({ useHandCursor: true });

    container.on('pointerover', () => {
      this.tweens.add({ targets: container, scaleX: 1.08, scaleY: 1.08, duration: 150 });
    });
    container.on('pointerout', () => {
      this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 150 });
    });

    return container;
  }

  private updateLanguageStrings() {
    const stations = CHAPTER_2_SECTION_2_DATA.stations.filter((s) => s.subScene === 'early');
    const station = stations[this.currentPhase - 1] || stations[0];

    if (this.promptTitle) {
      this.promptTitle.setText(`${station.agePeriodBn} • ${station.titleBn}`);
    }
    if (this.promptSubtitle) {
      this.promptSubtitle.setText(station.taglineBn);
    }
  }

  private createAmbientGlow(w: number, h: number) {
    const sparkles = this.add.container(0, 0);
    for (let i = 0; i < 20; i++) {
      const x = PMath.Between(40, w - 40);
      const y = PMath.Between(60, h - 60);
      const dot = this.add.graphics();
      dot.fillStyle(0xfef08a, PMath.FloatBetween(0.2, 0.6));
      dot.fillCircle(x, y, PMath.FloatBetween(1.5, 3.5));
      sparkles.add(dot);

      this.tweens.add({
        targets: dot,
        alpha: { from: 0.1, to: 0.8 },
        scale: { from: 0.8, to: 1.4 },
        duration: PMath.Between(1800, 3400),
        yoyo: true,
        repeat: -1,
      });
    }
  }
}
