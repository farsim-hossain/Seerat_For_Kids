import { Scene, GameObjects } from 'phaser';
import { EventBus, GAME_EVENTS, currentAppLanguage } from '../EventBus';

export class MakkahJourneyScene extends Scene {
  private currentPhase = 1; // 1 to 5
  private maxPhase = 5;

  // Background layers
  private skyGraphics?: GameObjects.Graphics;
  private terrainGraphics?: GameObjects.Graphics;
  private starsContainer?: GameObjects.Container;
  private birdsContainer?: GameObjects.Container;

  // Interactive Elements Layer
  private contentContainer?: GameObjects.Container;

  // UI HUD elements
  private titleBanner?: GameObjects.Text;
  private promptBox?: GameObjects.Container;
  private promptText?: GameObjects.Text;
  private subPromptText?: GameObjects.Text;
  private backBtn?: GameObjects.Text;
  private prevBtn?: GameObjects.Text;
  private nextBtn?: GameObjects.Text;
  private phaseIndicator?: GameObjects.Text;

  // State flags for interactions within phases
  private waterGushed = false;
  private tentsPitched = false;
  private kabahStonesPlaced = 0; // up to 4 layers
  private maxStoneLayers = 4;

  constructor() {
    super('MakkahJourneyScene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // Reset interaction state
    this.currentPhase = 1;
    this.waterGushed = false;
    this.tentsPitched = false;
    this.kabahStonesPlaced = 0;

    // 1. Sky & Atmosphere Graphics
    this.skyGraphics = this.add.graphics();
    this.starsContainer = this.add.container(0, 0);
    this.createStarfield(w, h);

    // 2. Terrain (Dunes, Mount Safa on left, Mount Marwah on right)
    this.terrainGraphics = this.add.graphics();

    // 3. Flocking Birds Container
    this.birdsContainer = this.add.container(0, 0);

    // 4. Dynamic Content Container (Redrawn on each phase)
    this.contentContainer = this.add.container(0, 0);

    // 5. Top UI Bar
    this.titleBanner = this.add.text(w * 0.5, 34, '', {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#fef3c7',
      backgroundColor: '#78350fee',
      padding: { x: 16, y: 8 },
    }).setOrigin(0.5);

    // Back button
    this.backBtn = this.add.text(65, 34, '', {
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#ffffff',
      backgroundColor: '#0284c7',
      padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    this.backBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'ArabiaMapScene');
    });

    // 6. Center Instruction Card / Story Prompt Box
    this.promptBox = this.add.container(w * 0.5, 90);

    const promptBg = this.add.graphics();
    promptBg.fillStyle(0xfffbeb, 0.95);
    promptBg.fillRoundedRect(-320, -10, 640, 58, 12);
    promptBg.lineStyle(2, 0xd97706, 0.8);
    promptBg.strokeRoundedRect(-320, -10, 640, 58, 12);

    this.promptText = this.add.text(0, 4, '', {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#451a03',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.subPromptText = this.add.text(0, 26, '', {
      fontFamily: 'sans-serif',
      fontSize: '11px',
      color: '#78350f',
    }).setOrigin(0.5);

    this.promptBox.add([promptBg, this.promptText, this.subPromptText]);

    // 7. Bottom Navigation HUD Bar
    this.buildBottomHUD(w, h);

    // Render initial phase 1
    this.renderPhase(1);

    // Notify React
    EventBus.emit(GAME_EVENTS.SCENE_READY, 'MakkahJourneyScene');
    EventBus.emit(GAME_EVENTS.SCENE_CHANGED, 'MakkahJourneyScene');

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

  // --- Bottom Navigation HUD ---
  private buildBottomHUD(w: number, h: number) {
    const barY = h - 38;

    // HUD Bar Background
    const hudBar = this.add.graphics();
    hudBar.fillStyle(0x0f172a, 0.85);
    hudBar.fillRoundedRect(w * 0.5 - 240, barY - 20, 480, 40, 12);
    hudBar.lineStyle(1.5, 0xd97706, 0.8);
    hudBar.strokeRoundedRect(w * 0.5 - 240, barY - 20, 480, 40, 12);

    // Prev Button
    this.prevBtn = this.add.text(w * 0.5 - 160, barY, '', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#fde68a',
      backgroundColor: '#78350faa',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    this.prevBtn.on('pointerdown', () => {
      if (this.currentPhase > 1) {
        this.renderPhase(this.currentPhase - 1);
      }
    });

    // Phase Indicator
    this.phaseIndicator = this.add.text(w * 0.5, barY, '', {
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Next Button
    this.nextBtn = this.add.text(w * 0.5 + 160, barY, '', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#fde68a',
      backgroundColor: '#78350faa',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    this.nextBtn.on('pointerdown', () => {
      if (this.currentPhase < this.maxPhase) {
        this.renderPhase(this.currentPhase + 1);
      }
    });
  }

  // --- Render Specific Story Phase ---
  private renderPhase(phase: number) {
    this.currentPhase = phase;
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // Clear dynamic content container
    if (this.contentContainer) {
      this.contentContainer.removeAll(true);
    }

    // Update Sky & Terrain according to phase
    this.drawSkyAndTerrain(phase, w, h);

    // Update Bottom HUD button states
    if (this.prevBtn) {
      this.prevBtn.setAlpha(phase === 1 ? 0.4 : 1);
    }
    if (this.nextBtn) {
      this.nextBtn.setAlpha(phase === this.maxPhase ? 0.4 : 1);
    }

    // Phase-specific content creation
    switch (phase) {
      case 1:
        this.setupPhase1BarrenValley(w, h);
        break;
      case 2:
        this.setupPhase2ZamzamMiracle(w, h);
        break;
      case 3:
        this.setupPhase3JurhumOasis(w, h);
        break;
      case 4:
        this.setupPhase4KabahConstruction(w, h);
        break;
      case 5:
        this.setupPhase5StarryNight(w, h);
        break;
    }

    this.updateLanguageStrings(currentAppLanguage);
  }

  private currentBgImage?: GameObjects.Image;

  // --- 1. Background, Terrain & Lighting ---
  private drawSkyAndTerrain(phase: number, w: number, h: number) {
    if (this.currentBgImage) {
      this.currentBgImage.destroy();
      this.currentBgImage = undefined;
    }

    let bgKey = 'makkah_valley_day';
    if (phase === 3) bgKey = 'zamzam_oasis_bloom';
    else if (phase === 4) bgKey = 'kabah_construction_bg';
    else if (phase === 5) bgKey = 'makkah_night_sanctuary';

    if (this.textures.exists(bgKey)) {
      this.currentBgImage = this.add.image(w / 2, h / 2, bgKey);
      this.currentBgImage.setDisplaySize(w, h);
      this.currentBgImage.setDepth(-10);
    }

    if (this.skyGraphics) this.skyGraphics.clear();
    if (this.terrainGraphics) this.terrainGraphics.clear();

    if (phase === 5) {
      this.starsContainer?.setAlpha(1);
    } else {
      this.starsContainer?.setAlpha(0);
    }
  }

  private createStarfield(w: number, h: number) {
    if (!this.starsContainer) return;
    for (let i = 0; i < 70; i++) {
      const x = Math.random() * w;
      const y = Math.random() * (h * 0.55);
      const r = Math.random() * 2 + 1;
      const star = this.add.circle(x, y, r, 0xffffff, Math.random() * 0.7 + 0.3);
      this.starsContainer.add(star);
    }
    this.starsContainer.setAlpha(0);
  }

  // --- PHASE 1: The Barren Valley of Makkah ---
  private setupPhase1BarrenValley(w: number, h: number) {
    if (!this.contentContainer) return;

    // Mount Safa Marker (Left)
    const safaMarker = this.add.container(w * 0.2, h * 0.48);
    const safaPin = this.add.circle(0, 0, 18, 0x78350f, 0.8).setInteractive({ cursor: 'pointer' });
    const safaIcon = this.add.text(0, 0, '⛰️', { fontSize: '14px' }).setOrigin(0.5);
    const isBn = currentAppLanguage === 'bn';
    const safaLabel = this.add.text(0, 22, isBn ? 'সাফা পর্বত' : 'Mount Safa', {
      fontFamily: 'sans-serif',
      fontSize: '11px',
      color: '#ffffff',
      backgroundColor: '#78350fee',
      padding: { x: 6, y: 2 },
    }).setOrigin(0.5);
    safaMarker.add([safaPin, safaIcon, safaLabel]);

    // Mount Marwah Marker (Right)
    const marwahMarker = this.add.container(w * 0.8, h * 0.48);
    const marwahPin = this.add.circle(0, 0, 18, 0x78350f, 0.8).setInteractive({ cursor: 'pointer' });
    const marwahIcon = this.add.text(0, 0, '⛰️', { fontSize: '14px' }).setOrigin(0.5);
    const marwahLabel = this.add.text(0, 22, isBn ? 'মারওয়া পর্বত' : 'Mount Marwah', {
      fontFamily: 'sans-serif',
      fontSize: '11px',
      color: '#ffffff',
      backgroundColor: '#78350fee',
      padding: { x: 6, y: 2 },
    }).setOrigin(0.5);
    marwahMarker.add([marwahPin, marwahIcon, marwahLabel]);

    // Walking path of Hajar between Safa & Marwah (Dotted golden trail)
    const trail = this.add.graphics();
    trail.lineStyle(3, 0xfde68a, 0.8);
    for (let x = w * 0.24; x <= w * 0.76; x += 16) {
      trail.lineBetween(x, h * 0.65, x + 8, h * 0.65);
    }

    // Sacred Trust (Tawakkul) Lore Card in center
    const cardBg = this.add.graphics();
    cardBg.fillStyle(0xfffbeb, 0.95);
    cardBg.fillRoundedRect(w * 0.3, h * 0.68, w * 0.4, 85, 12);
    cardBg.lineStyle(2, 0xd97706, 0.8);
    cardBg.strokeRoundedRect(w * 0.3, h * 0.68, w * 0.4, 85, 12);

    const cardTitle = this.add.text(
      w * 0.5,
      h * 0.71,
      isBn ? '🌟 মহান তাওয়াক্কুল (Trust in Allah)' : '🌟 Sacred Trust in Allah',
      { fontFamily: 'sans-serif', fontSize: '13px', color: '#92400e', fontStyle: 'bold' }
    ).setOrigin(0.5);

    const cardQuote = this.add.text(
      w * 0.5,
      h * 0.77,
      isBn
        ? '‘আল্লাহ কি আপনাকে এর আদেশ করেছেন?\nতাহলে তিনি কখনোই আমাদের ধ্বংস হতে দেবেন না!’'
        : '“Did Allah command you to do this?\nThen He will never abandon us!”',
      { fontFamily: 'sans-serif', fontSize: '12px', color: '#451a03', align: 'center', fontStyle: 'italic' }
    ).setOrigin(0.5);

    this.contentContainer.add([safaMarker, marwahMarker, trail, cardBg, cardTitle, cardQuote]);
  }

  // --- PHASE 2: The Quest of Safa & Marwah + Miracle of Zamzam ---
  private setupPhase2ZamzamMiracle(w: number, h: number) {
    if (!this.contentContainer) return;

    const isBn = currentAppLanguage === 'bn';

    // Interactive Well Spot
    const wellX = w * 0.5;
    const wellY = h * 0.72;

    // Glowing circle prompt
    const wellSpot = this.add.circle(wellX, wellY, 36, 0x0284c7, 0.4)
      .setInteractive({ cursor: 'pointer' });

    this.tweens.add({
      targets: wellSpot,
      scale: 1.25,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    const wellIcon = this.add.text(wellX, wellY, '💧', { fontSize: '24px' }).setOrigin(0.5);

    const tapHint = this.add.text(
      wellX,
      wellY + 48,
      isBn ? '👆 স্পর্শ করে যমযম কূপের মিষ্টি পানি প্রবাহিত করো!' : '👆 Tap to make the sweet Zamzam water burst forth!',
      { fontFamily: 'sans-serif', fontSize: '12px', color: '#0369a1', backgroundColor: '#e0f2fe', padding: { x: 8, y: 4 } }
    ).setOrigin(0.5);

    this.contentContainer.add([wellSpot, wellIcon, tapHint]);

    // Action on tap
    wellSpot.on('pointerdown', () => {
      if (!this.waterGushed) {
        this.waterGushed = true;
        this.emitWaterFountain(wellX, wellY);
        this.animateFlockingBirds(w, h);
        tapHint.setText(
          isBn
            ? '✨ সুবহানাল্লাহ! যমযমের মিষ্টি পানির ঝরনা প্রবাহিত হলো!'
            : '✨ SubhanAllah! The pure sweet water of Zamzam gushes forth!'
        );
      }
    });

    // If already gushed previously, show active fountain
    if (this.waterGushed) {
      this.emitWaterFountain(wellX, wellY);
      this.animateFlockingBirds(w, h);
    }
  }

  private emitWaterFountain(x: number, y: number) {
    // Water basin circle
    const basin = this.add.circle(x, y, 42, 0x0284c7, 0.75);
    const innerWater = this.add.circle(x, y, 32, 0x38bdf8, 0.9);
    this.contentContainer?.add([basin, innerWater]);
  }

  private animateFlockingBirds(w: number, h: number) {
    if (!this.birdsContainer) return;
    this.birdsContainer.removeAll(true);

    // Create 5 desert doves circling above
    for (let i = 0; i < 5; i++) {
      const bird = this.add.text(w * 0.1 - i * 30, h * 0.25 + i * 15, '🕊️', { fontSize: '18px' });
      this.birdsContainer.add(bird);

      this.tweens.add({
        targets: bird,
        x: w * 0.9 + 50,
        y: h * 0.22 + Math.sin(i) * 20,
        duration: 4000 + i * 400,
        repeat: -1,
        delay: i * 300,
      });
    }
  }

  // --- PHASE 3: The Jurhum Encampment & Desert Bloom ---
  private setupPhase3JurhumOasis(w: number, h: number) {
    if (!this.contentContainer) return;

    const isBn = currentAppLanguage === 'bn';

    // Center Zamzam spring
    const spring = this.add.circle(w * 0.5, h * 0.72, 38, 0x0284c7, 0.85);
    const springRipple = this.add.circle(w * 0.5, h * 0.72, 48, 0x38bdf8, 0.4);
    this.tweens.add({ targets: springRipple, scale: 1.2, duration: 1000, yoyo: true, repeat: -1 });

    // Interactive Tent Pitching Button
    const pitchBtn = this.add.container(w * 0.5, h * 0.85);
    const btnBg = this.add.graphics();
    btnBg.fillStyle(0x047857, 1);
    btnBg.fillRoundedRect(-180, -18, 360, 36, 10);
    btnBg.lineStyle(1.5, 0x34d399, 1);
    btnBg.strokeRoundedRect(-180, -18, 360, 36, 10);

    const btnText = this.add.text(
      0,
      0,
      isBn ? '⛺ বনু জুরহুমের তাবু ও মরূদ্যান স্থাপন করো' : '⛺ Pitch Banu Jurhum Tents & Palm Oasis',
      { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', fontStyle: 'bold' }
    ).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    pitchBtn.add([btnBg, btnText]);

    const tentsLayer = this.add.container(0, 0);
    this.contentContainer.add([spring, springRipple, tentsLayer, pitchBtn]);

    const buildTents = () => {
      tentsLayer.removeAll(true);

      // Bedouin Tents (Dark wool nomadic tents)
      const tentPositions = [
        { x: w * 0.28, y: h * 0.68, label: isBn ? 'জুরহুম তাবু' : 'Jurhum Tent' },
        { x: w * 0.72, y: h * 0.68, label: isBn ? 'জুরহুম তাবু' : 'Jurhum Tent' },
        { x: w * 0.2, y: h * 0.78, label: isBn ? 'মরু তাঁবু' : 'Bedouin Tent' },
        { x: w * 0.8, y: h * 0.78, label: isBn ? 'মরু তাঁবু' : 'Bedouin Tent' },
      ];

      tentPositions.forEach((tp) => {
        const tentG = this.add.graphics();
        tentG.fillStyle(0x451a03, 1);
        tentG.fillTriangle(tp.x - 30, tp.y + 16, tp.x, tp.y - 20, tp.x + 30, tp.y + 16);
        tentG.lineStyle(2, 0xd97706, 1);
        tentG.strokeTriangle(tp.x - 30, tp.y + 16, tp.x, tp.y - 20, tp.x + 30, tp.y + 16);

        const tentLbl = this.add.text(tp.x, tp.y + 24, tp.label, {
          fontFamily: 'sans-serif',
          fontSize: '10px',
          color: '#ffffff',
          backgroundColor: '#0f172acc',
          padding: { x: 4, y: 2 },
        }).setOrigin(0.5);

        tentsLayer.add([tentG, tentLbl]);
      });

      // Sprouting Palm Trees near oasis
      const palms = [
        { x: w * 0.42, y: h * 0.64 },
        { x: w * 0.58, y: h * 0.64 },
      ];
      palms.forEach((p) => {
        const palm = this.add.text(p.x, p.y, '🌴', { fontSize: '32px' }).setOrigin(0.5);
        tentsLayer.add(palm);
      });

      // Camels grazing
      const camelLeft = this.add.text(w * 0.35, h * 0.76, '🐪', { fontSize: '24px' }).setOrigin(0.5);
      const camelRight = this.add.text(w * 0.65, h * 0.76, '🐪', { fontSize: '24px' }).setOrigin(0.5);
      tentsLayer.add([camelLeft, camelRight]);
    };

    btnText.on('pointerdown', () => {
      this.tentsPitched = true;
      buildTents();
      EventBus.emit(GAME_EVENTS.CELEBRATE);
    });

    if (this.tentsPitched) {
      buildTents();
    }
  }

  // --- PHASE 4: Raising the Foundations Stone by Stone ---
  private setupPhase4KabahConstruction(w: number, h: number) {
    if (!this.contentContainer) return;

    const isBn = currentAppLanguage === 'bn';
    const cx = w * 0.5;
    const cy = h * 0.62;

    const kabahContainer = this.add.container(0, 0);

    // Stone Placement Button
    const buildBtn = this.add.container(cx, h * 0.85);
    const btnBg = this.add.graphics();
    btnBg.fillStyle(0x78350f, 1);
    btnBg.fillRoundedRect(-180, -18, 360, 36, 10);
    btnBg.lineStyle(1.5, 0xf59e0b, 1);
    btnBg.strokeRoundedRect(-180, -18, 360, 36, 10);

    const btnText = this.add.text(
      0,
      0,
      isBn ? '🧱 পাথরের স্তর স্থাপন করো (কাবার ভিত্তি)' : '🧱 Place Stone Layer (Ka\'bah Wall)',
      { fontFamily: 'sans-serif', fontSize: '12px', color: '#fef3c7', fontStyle: 'bold' }
    ).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    buildBtn.add([btnBg, btnText]);

    const drawKabahLayers = () => {
      kabahContainer.removeAll(true);

      const baseWidth = 110;
      const layerHeight = 22;

      // Draw layers up to kabahStonesPlaced
      for (let i = 0; i < this.kabahStonesPlaced; i++) {
        const layerY = cy - (i * layerHeight);
        const stone = this.add.graphics();

        if (this.kabahStonesPlaced === this.maxStoneLayers) {
          // Completed sacred Ka'bah with dark stone mantle
          stone.fillStyle(0x18181b, 1);
          stone.fillRoundedRect(cx - baseWidth * 0.5, layerY, baseWidth, layerHeight, 2);
          stone.lineStyle(1.5, 0xd4af37, 1);
          stone.strokeRoundedRect(cx - baseWidth * 0.5, layerY, baseWidth, layerHeight, 2);
        } else {
          // Natural desert granite blocks
          stone.fillStyle(0x57534e, 1);
          stone.fillRoundedRect(cx - baseWidth * 0.5, layerY, baseWidth, layerHeight, 3);
          stone.lineStyle(1, 0xa8a29e, 1);
          stone.strokeRoundedRect(cx - baseWidth * 0.5, layerY, baseWidth, layerHeight, 3);
        }

        kabahContainer.add(stone);
      }

      // If at least 1 layer, show Maqam Ibrahim stone on east
      if (this.kabahStonesPlaced >= 2) {
        const maqam = this.add.container(cx + baseWidth * 0.5 + 24, cy + 10);
        const mStone = this.add.circle(0, 0, 12, 0xd97706, 0.9);
        const mLbl = this.add.text(0, 18, isBn ? 'মাকামে ইবরাহীম' : 'Maqam Ibrahim', {
          fontFamily: 'sans-serif',
          fontSize: '9px',
          color: '#ffffff',
          backgroundColor: '#78350f',
          padding: { x: 4, y: 2 },
        }).setOrigin(0.5);
        maqam.add([mStone, mLbl]);
        kabahContainer.add(maqam);
      }

      // If fully built, show golden Quranic Dua ribbon
      if (this.kabahStonesPlaced === this.maxStoneLayers) {
        const duaRibbon = this.add.container(cx, cy - 115);
        const ribbonBg = this.add.graphics();
        ribbonBg.fillStyle(0x78350f, 0.95);
        ribbonBg.fillRoundedRect(-180, -16, 360, 32, 10);
        ribbonBg.lineStyle(2, 0xf59e0b, 1);
        ribbonBg.strokeRoundedRect(-180, -16, 360, 32, 10);

        const duaText = this.add.text(
          0,
          0,
          'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
          { fontFamily: 'serif', fontSize: '15px', color: '#fde68a', fontStyle: 'bold' }
        ).setOrigin(0.5);

        duaRibbon.add([ribbonBg, duaText]);
        kabahContainer.add(duaRibbon);
      }
    };

    btnText.on('pointerdown', () => {
      if (this.kabahStonesPlaced < this.maxStoneLayers) {
        this.kabahStonesPlaced++;
        drawKabahLayers();
        EventBus.emit(GAME_EVENTS.CELEBRATE);
      }
    });

    this.contentContainer.add([kabahContainer, buildBtn]);

    if (this.kabahStonesPlaced > 0) {
      drawKabahLayers();
    }
  }

  // --- PHASE 5: The Starry Night Sanctuary & Reflection ---
  private setupPhase5StarryNight(w: number, h: number) {
    if (!this.contentContainer) return;

    const isBn = currentAppLanguage === 'bn';
    const cx = w * 0.5;
    const cy = h * 0.62;

    // Fully constructed Ka'bah at night with golden glow
    const kabahG = this.add.graphics();
    // Warm aura glow
    kabahG.fillStyle(0xf59e0b, 0.15);
    kabahG.fillCircle(cx, cy - 40, 90);

    // Ka'bah structure
    kabahG.fillStyle(0x09090b, 1);
    kabahG.fillRect(cx - 55, cy - 80, 110, 88);
    kabahG.lineStyle(2, 0xd4af37, 1);
    kabahG.strokeRect(cx - 55, cy - 80, 110, 88);

    // Golden Kiswah line
    kabahG.lineStyle(2, 0xfde68a, 0.8);
    kabahG.lineBetween(cx - 55, cy - 60, cx + 55, cy - 60);

    // Flickering lantern lights
    const lanterns = [
      { x: cx - 80, y: cy + 10 },
      { x: cx + 80, y: cy + 10 },
    ];
    lanterns.forEach((l) => {
      const lantern = this.add.text(l.x, l.y, '🏮', { fontSize: '20px' }).setOrigin(0.5);
      this.tweens.add({
        targets: lantern,
        alpha: 0.6,
        duration: 700,
        yoyo: true,
        repeat: -1,
      });
      this.contentContainer?.add(lantern);
    });

    // Moral Reflection Card
    const card = this.add.container(cx, h * 0.84);
    const cardBg = this.add.graphics();
    cardBg.fillStyle(0x0f172a, 0.95);
    cardBg.fillRoundedRect(-240, -22, 480, 44, 10);
    cardBg.lineStyle(1.5, 0x10b981, 1);
    cardBg.strokeRoundedRect(-240, -22, 480, 44, 10);

    const cardTxt = this.add.text(
      0,
      0,
      isBn
        ? '🌟 শিক্ষা: আল্লাহর ওপর অবিচল বিশ্বাস (তাওয়াক্কুল) মরুভূমিকেও বিশ্ব ঐক্যের কেন্দ্রবিন্দুতে পরিণত করে।'
        : '🌟 Lesson: Absolute trust in Allah (Tawakkul) transforms a barren desert into the spiritual heart of humanity.',
      { fontFamily: 'sans-serif', fontSize: '11px', color: '#a7f3d0', align: 'center' }
    ).setOrigin(0.5);

    card.add([cardBg, cardTxt]);
    this.contentContainer.add([kabahG, card]);
  }

  // --- Dynamic Bilingual Text Update ---
  private updateLanguageStrings(lang: 'bn' | 'en') {
    const isBn = lang === 'bn';

    // Title banner
    if (this.titleBanner && this.titleBanner.active && this.titleBanner.scene) {
      this.titleBanner.setText(
        isBn
          ? '📖 মক্কার ঐতিহাসিক উপাখ্যান: উদ্ভিদহীন উপত্যকা থেকে পবিত্র কাবা'
          : '📖 The Story of Makkah: From the Barren Valley to the Sacred Ka\'bah'
      );
    }

    // Back button
    if (this.backBtn && this.backBtn.active && this.backBtn.scene) {
      this.backBtn.setText(isBn ? '⬅ মানচিত্রে ফিরুন' : '⬅ Back to Map');
    }

    // Prev / Next button
    if (this.prevBtn && this.prevBtn.active && this.prevBtn.scene) {
      this.prevBtn.setText(isBn ? '◀ পূর্ববর্তী ধাপ' : '◀ Previous');
    }
    if (this.nextBtn && this.nextBtn.active && this.nextBtn.scene) {
      this.nextBtn.setText(isBn ? 'পরবর্তী ধাপ ▶' : 'Next ▶');
    }

    // Phase Indicator
    if (this.phaseIndicator && this.phaseIndicator.active && this.phaseIndicator.scene) {
      this.phaseIndicator.setText(
        isBn
          ? `ধাপ ${this.currentPhase} / ${this.maxPhase}`
          : `Phase ${this.currentPhase} of ${this.maxPhase}`
      );
    }

    // Phase Title & Instructions in Center Prompt
    const prompts = [
      {
        titleBn: '১. উদ্ভিদহীন নির্জন উপত্যকা ও ইবরাহীম (আ.)-এর তাওয়াক্কুল',
        titleEn: '1. The Barren Desert Valley & Divine Trust (Tawakkul)',
        subBn: 'সাফা ও মারওয়ার রুক্ষ মরুভূমিতে মা হাজেরা ও শিশু ইসমাঈল সম্পূর্ণ একাকী আল্লাহর ওপর ভরসা করেছিলেন।',
        subEn: 'In the waterless expanse between Safa and Marwah, Lady Hajar and infant Ismail trusted Allah completely.',
      },
      {
        titleBn: '২. সাফা-মারওয়া প্রান্তর ও যমযম কূপের অলৌকিক আবির্ভাব',
        titleEn: '2. The Quest of Safa & Marwah and the Miracle of Zamzam',
        subBn: 'আল্লাহর অশেষ রহমতে মরুভূমির বুক চিরে উৎসারিত হলো বরকতময় যমযমের সুপেয় পানির ঝরনা।',
        subEn: 'Through divine mercy, the blessed crystalline spring of Zamzam miraculously gushed forth.',
      },
      {
        titleBn: '৩. বনু জুরহুমের কাফেলা ও মরূদ্যানের সূচনা',
        titleEn: '3. Arrival of Banu Jurhum & The Desert Bloom',
        subBn: 'আকাশে উড়ন্ত পাখি দেখে বনু জুরহুম মিষ্টি পানির সন্ধান পেল এবং এখানে স্থায়ী বসতি গড়ে তুলল।',
        subEn: 'Guided by soaring birds, Banu Jurhum discovered the sweet spring and settled peacefully with permission.',
      },
      {
        titleBn: '৪. পিতা-পুত্রের যৌথ প্রয়াসে পবিত্র কাবার প্রাচীর নির্মাণ',
        titleEn: '4. Raising the Foundations of the Ka\'bah Stone by Stone',
        subBn: 'আল্লাহর আদেশে হযরত ইবরাহীম (আ.) ও ইসমাঈল (আ.) পাহাড়ের পাথর দিয়ে কাবার প্রাচীর গড়ে তোলেন।',
        subEn: 'By Allah\'s decree, Ibrahim (AS) and Ismail (AS) laid the sacred stones to raise the walls of the House.',
      },
      {
        titleBn: '৫. কাবার জ্যোৎস্নারাতি ও সীরাহ প্রতিফলন',
        titleEn: '5. The Starry Night Sanctuary & Sacred Reflection',
        subBn: 'মরুভূমির নির্জন প্রান্তর আজ লক্ষ-কোটি ঈমানদারের রূহের খোরাক ও বিশ্বশান্তির কেন্দ্রবিন্দু।',
        subEn: 'The loneliest arid valley became the beacon of monotheism and spiritual solace for all humanity.',
      },
    ];

    const cur = prompts[this.currentPhase - 1];
    if (this.promptText && this.promptText.active && this.promptText.scene) {
      this.promptText.setText(isBn ? cur.titleBn : cur.titleEn);
    }
    if (this.subPromptText && this.subPromptText.active && this.subPromptText.scene) {
      this.subPromptText.setText(isBn ? cur.subBn : cur.subEn);
    }
  }
}
