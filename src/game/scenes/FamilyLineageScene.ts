import { Scene, GameObjects, Math as PMath } from 'phaser';
import { EventBus, GAME_EVENTS, currentAppLanguage } from '../EventBus';
import { CHAPTER_2_DATA } from '../../data/chapter2Data';

export class FamilyLineageScene extends Scene {
  private currentPhase = 1; // 1 to 5
  private maxPhase = 5;

  // Background image
  private currentBgImage?: GameObjects.Image;

  // Containers
  private dynamicContent?: GameObjects.Container;
  private particlesContainer?: GameObjects.Container;

  // UI elements
  private titleBanner?: GameObjects.Text;
  private promptBox?: GameObjects.Container;
  private promptTitle?: GameObjects.Text;
  private promptSubtitle?: GameObjects.Text;
  private backBtn?: GameObjects.Text;
  private switchSceneBtn?: GameObjects.Text;
  private prevBtn?: GameObjects.Text;
  private nextBtn?: GameObjects.Text;
  private phaseIndicator?: GameObjects.Text;

  // Phase 1 State: Thareed & Caravans
  private thareedPrepared = false;
  private caravansDispatched = false;

  // Phase 3 State: Zamzam excavation
  private zamzamDug = false;
  private goldenDeerFound = false;

  // Phase 4 State: Abdullah 100 Camels Ransom
  private currentCamels = 10;
  private lotteryCompleted = false;

  constructor() {
    super('FamilyLineageScene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // Reset state
    this.currentPhase = 1;
    this.thareedPrepared = false;
    this.caravansDispatched = false;
    this.zamzamDug = false;
    this.goldenDeerFound = false;
    this.currentCamels = 10;
    this.lotteryCompleted = false;

    // 1. Dynamic Content & Particles Containers
    this.particlesContainer = this.add.container(0, 0);
    this.dynamicContent = this.add.container(0, 0);

    // 2. Header Title Banner
    this.titleBanner = this.add.text(w * 0.5, 34, '', {
      fontFamily: 'sans-serif',
      fontSize: '17px',
      color: '#fef3c7',
      backgroundColor: '#78350fee',
      padding: { x: 18, y: 7 },
    }).setOrigin(0.5);

    // Back to Map Button
    this.backBtn = this.add.text(65, 34, '', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#ffffff',
      backgroundColor: '#0284c7',
      padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    this.backBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'ArabiaMapScene');
    });

    // Quick Switch to Elephant Army Scene Button
    this.switchSceneBtn = this.add.text(w - 110, 34, '', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#ffffff',
      backgroundColor: '#991b1b',
      padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    this.switchSceneBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'ElephantArmyScene');
    });

    // 3. Center Story Prompt Box
    this.buildStoryPromptBox(w, h);

    // 4. Bottom Navigation HUD Bar
    this.buildBottomHUD(w, h);

    // Render Initial Phase
    this.renderPhase(1);

    // Language listener
    const onLanguageChanged = (lang: 'bn' | 'en') => {
      this.updateLanguageStrings(lang);
    };
    EventBus.on(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);

    this.events.once('shutdown', () => {
      EventBus.removeListener(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);
    });

    EventBus.emit(GAME_EVENTS.SCENE_READY, 'FamilyLineageScene');
    EventBus.emit(GAME_EVENTS.SCENE_CHANGED, 'FamilyLineageScene');
  }

  // --- Story Prompt Box ---
  private buildStoryPromptBox(w: number, h: number) {
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
  }

  // --- Bottom Navigation HUD ---
  private buildBottomHUD(w: number, h: number) {
    const barY = h - 36;

    const hudBar = this.add.graphics();
    hudBar.fillStyle(0x0f172a, 0.88);
    hudBar.fillRoundedRect(w * 0.5 - 250, barY - 20, 500, 40, 12);
    hudBar.lineStyle(1.5, 0xd97706, 0.8);
    hudBar.strokeRoundedRect(w * 0.5 - 250, barY - 20, 500, 40, 12);

    // Prev Button
    this.prevBtn = this.add.text(w * 0.5 - 165, barY, '', {
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
    this.nextBtn = this.add.text(w * 0.5 + 165, barY, '', {
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

    // Clear dynamic content
    if (this.dynamicContent) {
      this.dynamicContent.removeAll(true);
    }
    if (this.particlesContainer) {
      this.particlesContainer.removeAll(true);
    }

    // Set Background
    this.drawPhaseBackground(phase, w, h);

    // Update Bottom HUD button states
    if (this.prevBtn) {
      this.prevBtn.setAlpha(phase === 1 ? 0.35 : 1);
    }
    if (this.nextBtn) {
      this.nextBtn.setAlpha(phase === this.maxPhase ? 0.35 : 1);
    }

    // Phase Specific Interactive Setups
    switch (phase) {
      case 1:
        this.setupPhase1HashimCaravan(w, h);
        break;
      case 2:
        this.setupPhase2ShaibaMuttalib(w, h);
        break;
      case 3:
        this.setupPhase3ZamzamExcavation(w, h);
        break;
      case 4:
        this.setupPhase4AbdullahRansom(w, h);
        break;
      case 5:
        this.setupPhase5AbdullahPassingAndLineage(w, h);
        break;
    }

    this.updateLanguageStrings(currentAppLanguage);
  }

  private drawPhaseBackground(phase: number, w: number, h: number) {
    if (this.currentBgImage) {
      this.currentBgImage.destroy();
      this.currentBgImage = undefined;
    }

    let bgKey = 'hashim_caravan_mecca';
    if (phase === 2) bgKey = 'yathrib_oasis_groves';
    else if (phase === 3) bgKey = 'zamzam_rediscovery_ancient';
    else if (phase === 4) bgKey = 'azlam_divination_arrows';
    else if (phase === 5) bgKey = 'yathrib_oasis_groves';

    if (this.textures.exists(bgKey)) {
      this.currentBgImage = this.add.image(w / 2, h / 2, bgKey);
      this.currentBgImage.setDisplaySize(w, h);
      this.currentBgImage.setDepth(-10);
    }
  }

  // =========================================================================
  // Phase 1: Hashim, Thareed & The Two Seasonal Caravans
  // =========================================================================
  private setupPhase1HashimCaravan(w: number, h: number) {
    if (!this.dynamicContent) return;

    // 1. Interactive Button: Prepare Thareed
    const thareedBtn = this.createActionButton(
      w * 0.30,
      h * 0.58,
      '🍲',
      currentAppLanguage === 'bn' ? 'সারীদ পরিবেশন করো' : 'Serve Thareed',
      0xd97706
    );

    thareedBtn.on('pointerdown', () => {
      this.thareedPrepared = true;
      this.spawnFoodParticles(w * 0.30, h * 0.50);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'hashim_generosity');
      this.updateLanguageStrings(currentAppLanguage);
    });
    this.dynamicContent.add(thareedBtn);

    // 2. Interactive Button: Dispatch The Two Caravans
    const caravanBtn = this.createActionButton(
      w * 0.70,
      h * 0.58,
      '🐪',
      currentAppLanguage === 'bn' ? 'দ্বি-বার্ষিক সফর পরিচালনা করো' : 'Dispatch Two Caravans',
      0xb45309
    );

    caravanBtn.on('pointerdown', () => {
      this.caravansDispatched = true;
      this.animateCaravanDeparture(w, h);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'hashim_generosity');
      this.updateLanguageStrings(currentAppLanguage);
    });
    this.dynamicContent.add(caravanBtn);
  }

  // =========================================================================
  // Phase 2: Shaiba in Yathrib, Uncle Muttalib & Defense by Banu Najjar
  // =========================================================================
  private setupPhase2ShaibaMuttalib(w: number, h: number) {
    if (!this.dynamicContent) return;

    // 1. Shaiba & Muttalib arrival
    const arrivalBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '🐪',
      currentAppLanguage === 'bn' ? 'শাইবার মক্কায় আগমন ও নামকরণ' : 'Shaiba\'s Arrival & Naming',
      0x0284c7
    );

    arrivalBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'abdul_muttalib_zamzam');
    });
    this.dynamicContent.add(arrivalBtn);

    // 2. Banu Najjar & Uncle Abu Sa'd 80 Horsemen Defense
    const defenseBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '⚔️',
      currentAppLanguage === 'bn' ? 'মামাদের ৮০ অশ্বারোহী ও হাতীমে মীমাংসা' : '80 Horsemen at Hateem',
      0x059669
    );

    defenseBtn.on('pointerdown', () => {
      this.spawnDefenseGlow(w * 0.65, h * 0.50);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'abdul_muttalib_zamzam');
    });
    this.dynamicContent.add(defenseBtn);
  }

  // =========================================================================
  // Phase 3: Digging the Well of Zamzam & Unearthing Golden Deer
  // =========================================================================
  private setupPhase3ZamzamExcavation(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Dig Well Button
    const digBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '⛏️',
      currentAppLanguage === 'bn' ? 'যমযম কূপ পুনঃখনন করো' : 'Excavate Well of Zamzam',
      0x0284c7
    );

    digBtn.on('pointerdown', () => {
      this.zamzamDug = true;
      this.spawnWaterFountain(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'abdul_muttalib_zamzam');
      this.updateLanguageStrings(currentAppLanguage);
    });
    this.dynamicContent.add(digBtn);

    // Golden Deer & Swords Button
    const treasureBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '🦌',
      currentAppLanguage === 'bn' ? 'স্বর্ণের হরিণ ও জুরহুমদের তরবারি' : 'Golden Deer & Swords',
      0xd97706
    );

    treasureBtn.on('pointerdown', () => {
      this.goldenDeerFound = true;
      this.spawnGoldSparkles(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'abdul_muttalib_zamzam');
      this.updateLanguageStrings(currentAppLanguage);
    });
    this.dynamicContent.add(treasureBtn);
  }

  // =========================================================================
  // Phase 4: Abdullah's Ransom & The 100 Camels Lottery
  // =========================================================================
  private setupPhase4AbdullahRansom(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Display Camels Counter Card
    const counterBox = this.add.container(w * 0.5, h * 0.45);

    const boxBg = this.add.graphics();
    boxBg.fillStyle(0x0f172a, 0.85);
    boxBg.fillRoundedRect(-160, -28, 320, 56, 12);
    boxBg.lineStyle(2, 0xd97706, 0.9);
    boxBg.strokeRoundedRect(-160, -28, 320, 56, 12);

    const counterText = this.add.text(
      0,
      0,
      currentAppLanguage === 'bn'
        ? `🐪 উটের সংখ্যা: ${this.currentCamels} টি`
        : `🐪 Camels Offered: ${this.currentCamels}`,
      {
        fontFamily: 'sans-serif',
        fontSize: '15px',
        color: '#fef3c7',
        fontStyle: 'bold',
      }
    ).setOrigin(0.5);

    counterBox.add([boxBg, counterText]);
    this.dynamicContent.add(counterBox);

    // Lottery Button
    const lotBtn = this.createActionButton(
      w * 0.5,
      h * 0.62,
      '🏹',
      this.lotteryCompleted
        ? (currentAppLanguage === 'bn' ? '১০০ উটে মুক্তি অর্জিত!' : '100 Camels Ransom Complete!')
        : (currentAppLanguage === 'bn' ? `লটারি করো (+১০ উট বাড়াও)` : `Cast Lots (+10 Camels)`),
      this.lotteryCompleted ? 0x059669 : 0xb45309
    );

    lotBtn.on('pointerdown', () => {
      if (this.currentCamels < 100) {
        this.currentCamels += 10;
        counterText.setText(
          currentAppLanguage === 'bn'
            ? `🐪 উটের সংখ্যা: ${this.currentCamels} টি`
            : `🐪 Camels Offered: ${this.currentCamels}`
        );
        this.spawnGoldSparkles(w * 0.5, h * 0.45);

        if (this.currentCamels === 100) {
          this.lotteryCompleted = true;
          this.spawnWaterFountain(w * 0.5, h * 0.45);
        }
      }
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'abdullah_ransom_100_camels');
      this.updateLanguageStrings(currentAppLanguage);
    });

    this.dynamicContent.add(lotBtn);
  }

  // =========================================================================
  // Phase 5: Demise in Yathrib, Lady Aminah's Elegy & Lineage Gateway
  // =========================================================================
  private setupPhase5AbdullahPassingAndLineage(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Elegy and Passing Card Button
    const passingBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '📜',
      currentAppLanguage === 'bn' ? 'আমিনার মর্সিয়া ও উম্মে আয়মান' : 'Aminah\'s Elegy & Umm Ayman',
      0x78350f
    );

    passingBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'abdullah_marriage_passing');
    });
    this.dynamicContent.add(passingBtn);

    // Full 21 Ancestors Pedigree Tree Button
    const lineageBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '👑',
      currentAppLanguage === 'bn' ? 'সম্পূর্ণ ২১ পুরুষ নসবনামা' : 'Full 21 Ancestors Tree',
      0x059669
    );

    lineageBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.LINEAGE_NODE_SELECTED, 'chapter2');
    });
    this.dynamicContent.add(lineageBtn);
  }

  // --- Helper UI Button Builder ---
  private createActionButton(x: number, y: number, icon: string, labelText: string, color: number) {
    const container = this.add.container(x, y);

    const halo = this.add.graphics();
    halo.lineStyle(2.5, color, 0.7);
    halo.strokeCircle(0, 0, 36);
    container.add(halo);

    this.tweens.add({
      targets: halo,
      scaleX: 1.25,
      scaleY: 1.25,
      alpha: 0.1,
      duration: 1300,
      repeat: -1,
      yoyo: true,
    });

    const disc = this.add.graphics();
    disc.fillStyle(color, 0.95);
    disc.fillCircle(0, 0, 26);
    disc.lineStyle(2.5, 0xffffff, 1);
    disc.strokeCircle(0, 0, 26);
    container.add(disc);

    const emoji = this.add.text(0, 0, icon, {
      fontSize: '20px',
    }).setOrigin(0.5);
    container.add(emoji);

    const label = this.add.text(0, 38, labelText, {
      fontFamily: 'sans-serif',
      fontSize: '11px',
      color: '#ffffff',
      backgroundColor: '#0f172aee',
      padding: { x: 8, y: 4 },
      align: 'center',
    }).setOrigin(0.5);
    container.add(label);

    container.setSize(72, 72);
    container.setInteractive({ cursor: 'pointer' });

    container.on('pointerover', () => {
      this.tweens.add({ targets: container, scale: 1.15, duration: 150 });
    });
    container.on('pointerout', () => {
      this.tweens.add({ targets: container, scale: 1.0, duration: 150 });
    });

    return container;
  }

  // --- Particle FX Helpers using PMath ---
  private spawnFoodParticles(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 15; i++) {
      const p = this.add.graphics();
      p.fillStyle(0xfde68a, 0.9);
      p.fillCircle(x + PMath.Between(-25, 25), y + PMath.Between(-20, 20), PMath.Between(3, 5));
      this.particlesContainer.add(p);

      this.tweens.add({
        targets: p,
        y: p.y - PMath.Between(20, 50),
        alpha: 0,
        duration: PMath.Between(800, 1500),
        onComplete: () => p.destroy(),
      });
    }
  }

  private animateCaravanDeparture(w: number, h: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 4; i++) {
      const camel = this.add.text(w * 0.70, h * 0.50, '🐪', {
        fontSize: '22px',
      }).setOrigin(0.5);
      this.particlesContainer.add(camel);

      this.tweens.add({
        targets: camel,
        x: camel.x + (i % 2 === 0 ? 150 : -150),
        y: camel.y - PMath.Between(30, 80),
        alpha: 0,
        duration: 2500 + i * 400,
        onComplete: () => camel.destroy(),
      });
    }
  }

  private spawnDefenseGlow(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 12; i++) {
      const sparkle = this.add.graphics();
      sparkle.fillStyle(0x34d399, 0.9);
      sparkle.fillCircle(x + PMath.Between(-25, 25), y + PMath.Between(-20, 20), PMath.Between(3, 6));
      this.particlesContainer.add(sparkle);

      this.tweens.add({
        targets: sparkle,
        scale: 1.5,
        alpha: 0,
        duration: PMath.Between(900, 1600),
        onComplete: () => sparkle.destroy(),
      });
    }
  }

  private spawnWaterFountain(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 20; i++) {
      const droplet = this.add.graphics();
      droplet.fillStyle(0x38bdf8, 0.95);
      droplet.fillCircle(x + PMath.Between(-20, 20), y + PMath.Between(-15, 15), PMath.Between(3, 6));
      this.particlesContainer.add(droplet);

      this.tweens.add({
        targets: droplet,
        y: droplet.y - PMath.Between(30, 70),
        x: droplet.x + PMath.Between(-25, 25),
        alpha: 0,
        duration: PMath.Between(800, 1400),
        onComplete: () => droplet.destroy(),
      });
    }
  }

  private spawnGoldSparkles(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 15; i++) {
      const gold = this.add.graphics();
      gold.fillStyle(0xfbbf24, 0.9);
      gold.fillCircle(x + PMath.Between(-20, 20), y + PMath.Between(-15, 15), PMath.Between(3, 5));
      this.particlesContainer.add(gold);

      this.tweens.add({
        targets: gold,
        y: gold.y - PMath.Between(20, 50),
        alpha: 0,
        duration: PMath.Between(700, 1300),
        onComplete: () => gold.destroy(),
      });
    }
  }

  // --- Language Text Updates ---
  private updateLanguageStrings(lang: 'bn' | 'en') {
    const isBn = lang === 'bn';

    this.titleBanner?.setText(
      isBn
        ? 'রাসূলুল্লাহ ﷺ-এর পরিবার ও সোনালী ইতিহাস'
        : 'Prophet Muhammad ﷺ - Family & Sacred Lineage'
    );

    this.backBtn?.setText(isBn ? '← মানচিত্র' : '← Map');
    this.switchSceneBtn?.setText(isBn ? '🐘 হস্তীবাহিনী ৫৭১' : '🐘 Elephant Year 571');

    this.prevBtn?.setText(isBn ? '◀ আগের ধাপ' : '◀ Previous');
    this.nextBtn?.setText(isBn ? 'পরের ধাপ ▶' : 'Next ▶');

    this.phaseIndicator?.setText(
      isBn ? `ধাপ ${this.currentPhase} / ${this.maxPhase}` : `Phase ${this.currentPhase} of ${this.maxPhase}`
    );

    // Phase Prompt Texts
    switch (this.currentPhase) {
      case 1:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ১: হাশিম বিন আবদে মানাফ, সারীদ ও দ্বি-বার্ষিক বাণিজ্য'
            : 'Phase 1: Hashim, Thareed & The Two Seasonal Caravans'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'দুর্ভিক্ষে রুটি ভেঙে সারীদ তৈরি ও গ্রীষ্ম-শীতের কাফেলা পাঠানোর বাটনে ট্যাপ করো!'
            : 'Tap to prepare Thareed for starving pilgrims and dispatch the summer & winter trade routes!'
        );
        break;
      case 2:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ২: ইয়াসরিবে শাইবা, আবদুল মুত্তালিব নামকরণ ও মামাদের মৈত্রী'
            : 'Phase 2: Shaiba in Yathrib & Defense by Banu Najjar'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'মদীনার মামা আবু সা\'দের ৮০ অশ্বারোহী নিয়ে হাতীমে এসে নওফলের বিরুদ্ধে অধিকার প্রতিষ্ঠার ইতিহাস আবিষ্কার করো!'
            : 'Discover how uncle Abu Sa\'d arrived with 80 horsemen at Hateem to restore his rightful estate!'
        );
        break;
      case 3:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ৩: অলৌকিক যমযম কূপের পুনঃখনন ও স্বর্ণের হরিণ'
            : 'Phase 3: Rediscovery of Zamzam & Unearthed Golden Deer'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'মাটি খনন করে জুরহুমদের লুকানো তরবারি, স্বর্ণের হরিণ ও মরুভূমিতে পানির অলৌকিক পরীক্ষা প্রত্যক্ষ করো!'
            : 'Excavate the well to discover the Jurhum buried swords, golden deer, and the desert water sign!'
        );
        break;
      case 4:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ৪: পিতা আব্দুল্লাহর মানত ও ১০০ উটের ঐতিহাসিক মুক্তিপণ'
            : 'Phase 4: The Ransom of Abdullah with 100 Camels'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'তীর নিক্ষেপ বাটনে ক্লিক করে উটের সংখ্যা ১০ থেকে ১০০ পর্যন্ত বৃদ্ধি করে আব্দুল্লাহর মুক্তি ঘটাও!'
            : 'Click to cast divination lots, increasing camels by 10 until 100 camels ransom noble Abdullah!'
        );
        break;
      case 5:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ৫: মদীনায় অন্তিম বিদায়, আমিনার মর্সিয়া ও ২১ পুরুষ নসবনামা'
            : 'Phase 5: Abdullah\'s Passing, Aminah\'s Elegy & Lineage Gateway'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'মাতা আমিনার শোকগাথা, উম্মে আয়মানের স্নেহচ্ছায়া ও রাসূল ﷺ-এর ২১ পুরুষের নসবনামা অন্বেষণ করো!'
            : 'Explore Lady Aminah’s poignant elegy, nursemaid Umm Ayman, and the complete 21-generation pedigree!'
        );
        break;
    }
  }
}
