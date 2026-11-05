import { Scene, GameObjects, Math as PMath } from 'phaser';
import { EventBus, GAME_EVENTS, currentAppLanguage } from '../EventBus';

export class ElephantArmyScene extends Scene {
  private currentPhase = 1; // 1 to 5
  private maxPhase = 5;

  // Background image
  private currentBgImage?: GameObjects.Image;

  // Containers
  private dynamicContent?: GameObjects.Container;
  private birdsContainer?: GameObjects.Container;
  private stormParticles?: GameObjects.Container;

  // UI elements
  private titleBanner?: GameObjects.Text;
  private promptBox?: GameObjects.Container;
  private promptTitle?: GameObjects.Text;
  private promptSubtitle?: GameObjects.Text;
  private backBtn?: GameObjects.Text;
  private switchFamilyBtn?: GameObjects.Text;
  private prevBtn?: GameObjects.Text;
  private nextBtn?: GameObjects.Text;
  private phaseIndicator?: GameObjects.Text;

  // Phase 3 Elephant state
  private elephantFacingKabah = true;
  private elephantStatusText?: GameObjects.Text;

  constructor() {
    super('ElephantArmyScene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // Reset state
    this.currentPhase = 1;
    this.elephantFacingKabah = true;

    // 1. Containers
    this.stormParticles = this.add.container(0, 0);
    this.birdsContainer = this.add.container(0, 0);
    this.dynamicContent = this.add.container(0, 0);

    // 2. Header Title Banner
    this.titleBanner = this.add.text(w * 0.5, 34, '', {
      fontFamily: 'sans-serif',
      fontSize: '17px',
      color: '#fef2f2',
      backgroundColor: '#7f1d1dee',
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

    // Switch to Family Lineage Scene Button
    this.switchFamilyBtn = this.add.text(w - 110, 34, '', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#ffffff',
      backgroundColor: '#d97706',
      padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setInteractive({ cursor: 'pointer' });

    this.switchFamilyBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.SWITCH_SCENE, 'FamilyLineageScene');
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

    EventBus.emit(GAME_EVENTS.SCENE_READY, 'ElephantArmyScene');
    EventBus.emit(GAME_EVENTS.SCENE_CHANGED, 'ElephantArmyScene');
  }

  // --- Story Prompt Box ---
  private buildStoryPromptBox(w: number, h: number) {
    this.promptBox = this.add.container(w * 0.5, 88);

    const bg = this.add.graphics();
    bg.fillStyle(0xfff1f2, 0.95);
    bg.fillRoundedRect(-330, -10, 660, 58, 14);
    bg.lineStyle(2, 0xb91c1c, 0.85);
    bg.strokeRoundedRect(-330, -10, 660, 58, 14);

    this.promptTitle = this.add.text(0, 4, '', {
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#7f1d1d',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.promptSubtitle = this.add.text(0, 26, '', {
      fontFamily: 'sans-serif',
      fontSize: '11px',
      color: '#991b1b',
    }).setOrigin(0.5);

    this.promptBox.add([bg, this.promptTitle, this.promptSubtitle]);
  }

  // --- Bottom Navigation HUD ---
  private buildBottomHUD(w: number, h: number) {
    const barY = h - 36;

    const hudBar = this.add.graphics();
    hudBar.fillStyle(0x0f172a, 0.88);
    hudBar.fillRoundedRect(w * 0.5 - 250, barY - 20, 500, 40, 12);
    hudBar.lineStyle(1.5, 0xb91c1c, 0.8);
    hudBar.strokeRoundedRect(w * 0.5 - 250, barY - 20, 500, 40, 12);

    // Prev Button
    this.prevBtn = this.add.text(w * 0.5 - 165, barY, '', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#fecaca',
      backgroundColor: '#991b1baa',
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
      color: '#fecaca',
      backgroundColor: '#991b1baa',
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

    // Clear dynamic content & particles
    if (this.dynamicContent) {
      this.dynamicContent.removeAll(true);
    }
    if (this.birdsContainer) {
      this.birdsContainer.removeAll(true);
    }
    if (this.stormParticles) {
      this.stormParticles.removeAll(true);
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

    // Phase Specific Setups
    switch (phase) {
      case 1:
        this.setupPhase1AbrahahChurch(w, h);
        break;
      case 2:
        this.setupPhase2SixtyThousandMarch(w, h);
        break;
      case 3:
        this.setupPhase3MahmoudKneeling(w, h);
        break;
      case 4:
        this.setupPhase4AbabilFlockStorm(w, h);
        break;
      case 5:
        this.setupPhase5AnnihilationAndDawn(w, h);
        break;
    }

    this.updateLanguageStrings(currentAppLanguage);
  }

  private drawPhaseBackground(phase: number, w: number, h: number) {
    if (this.currentBgImage) {
      this.currentBgImage.destroy();
      this.currentBgImage = undefined;
    }

    const bgKey = 'wadi_muhassir_elephant_storm';

    if (this.textures.exists(bgKey)) {
      this.currentBgImage = this.add.image(w / 2, h / 2, bgKey);
      this.currentBgImage.setDisplaySize(w, h);
      this.currentBgImage.setDepth(-10);
    }
  }

  // =========================================================================
  // Phase 1: Abrahah's Cathedral (Al-Qullays in Sana'a)
  // =========================================================================
  private setupPhase1AbrahahChurch(w: number, h: number) {
    if (!this.dynamicContent) return;

    const churchBtn = this.createActionButton(
      w * 0.5,
      h * 0.58,
      '🏛️',
      currentAppLanguage === 'bn' ? 'সানা\'র গির্জা (আল-কুল্লাইস) পর্যবেক্ষণ করো' : 'Inspect Cathedral of Sana\'a',
      0x991b1b
    );

    churchBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'elephant_army_571');
    });
    this.dynamicContent.add(churchBtn);
  }

  // =========================================================================
  // Phase 2: The March of 60,000 Soldiers & War Elephants
  // =========================================================================
  private setupPhase2SixtyThousandMarch(w: number, h: number) {
    if (!this.dynamicContent) return;

    const marchBtn = this.createActionButton(
      w * 0.5,
      h * 0.58,
      '🐘',
      currentAppLanguage === 'bn' ? '৬০ হাজার সৈন্য ও যুদ্ধহাতীর বহর' : 'The 60k Army & War Elephants',
      0xb91c1c
    );

    marchBtn.on('pointerdown', () => {
      this.animateMarchingElephants(w, h);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'elephant_army_571');
    });
    this.dynamicContent.add(marchBtn);
  }

  // =========================================================================
  // Phase 3: Mahmoud Kneeling at Wadi Muhassir (The Direction Test)
  // =========================================================================
  private setupPhase3MahmoudKneeling(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Status Display Card
    const statusBox = this.add.container(w * 0.5, h * 0.44);

    const bg = this.add.graphics();
    bg.fillStyle(0x0f172a, 0.88);
    bg.fillRoundedRect(-180, -28, 360, 56, 12);
    bg.lineStyle(2, 0xb91c1c, 0.9);
    bg.strokeRoundedRect(-180, -28, 360, 56, 12);

    this.elephantStatusText = this.add.text(
      0,
      0,
      this.elephantFacingKabah
        ? (currentAppLanguage === 'bn' ? '🕋 কাবার দিক: হাতী বসে পড়েছে (চলতে নারাজ!)' : '🕋 Ka\'bah: Elephant kneels down and halts!')
        : (currentAppLanguage === 'bn' ? '🧭 ইয়েমেন/সিরিয়ার দিক: হাতী দৌড়াচ্ছে!' : '🧭 Yemen/Syria: Elephant rushes forward!'),
      {
        fontFamily: 'sans-serif',
        fontSize: '13px',
        color: '#fef2f2',
        fontStyle: 'bold',
      }
    ).setOrigin(0.5);

    statusBox.add([bg, this.elephantStatusText]);
    this.dynamicContent.add(statusBox);

    // Button 1: Turn towards Ka'bah
    const toKabahBtn = this.createActionButton(
      w * 0.35,
      h * 0.62,
      '🕋',
      currentAppLanguage === 'bn' ? 'কাবার দিকে ঘোরাও (বসে পড়ে)' : 'Turn to Ka\'bah (Halts)',
      0x7f1d1d
    );

    toKabahBtn.on('pointerdown', () => {
      this.elephantFacingKabah = true;
      this.elephantStatusText?.setText(
        currentAppLanguage === 'bn'
          ? '🕋 কাবার দিক: হাতী বসে পড়েছে (চলতে নারাজ!)'
          : '🕋 Ka\'bah: Elephant kneels down and halts!'
      );
      this.spawnKneelingDust(w * 0.5, h * 0.50);
    });
    this.dynamicContent.add(toKabahBtn);

    // Button 2: Turn towards Syria / Yemen
    const toYemenBtn = this.createActionButton(
      w * 0.65,
      h * 0.62,
      '🧭',
      currentAppLanguage === 'bn' ? 'ইয়েমেন/সিরিয়ার দিকে ঘোরাও' : 'Turn to Yemen/Syria',
      0x059669
    );

    toYemenBtn.on('pointerdown', () => {
      this.elephantFacingKabah = false;
      this.elephantStatusText?.setText(
        currentAppLanguage === 'bn'
          ? '🧭 ইয়েমেন/সিরিয়ার দিক: হাতী সানন্দে দৌড়াচ্ছে!'
          : '🧭 Yemen/Syria: Elephant eagerly charges forward!'
      );
      this.spawnRunningPuffs(w * 0.5, h * 0.50);
    });
    this.dynamicContent.add(toYemenBtn);
  }

  // =========================================================================
  // Phase 4: Flocks of Ababil Birds & Baked Clay Pebbles
  // =========================================================================
  private setupPhase4AbabilFlockStorm(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Start Ababil Birds Animation
    this.createActiveAbabilFlight(w, h);

    const ababilBtn = this.createActionButton(
      w * 0.5,
      h * 0.60,
      '🦅',
      currentAppLanguage === 'bn' ? 'আবাবীল পাখির ঝাঁক ও কঙ্কর নিক্ষেপ' : 'Flocks of Ababil & Clay Pebbles',
      0xd97706
    );

    ababilBtn.on('pointerdown', () => {
      this.spawnPebblesShower(w, h);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'elephant_army_571');
    });
    this.dynamicContent.add(ababilBtn);
  }

  // =========================================================================
  // Phase 5: Annihilation Like Eaten Straw & The Prophetic Dawn
  // =========================================================================
  private setupPhase5AnnihilationAndDawn(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Defeat & Divine Protection Details
    const defeatBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '⚡',
      currentAppLanguage === 'bn' ? 'ভক্ষিত তৃণের ন্যায় বিনাশ' : 'Crushed Like Eaten Straw',
      0x991b1b
    );

    defeatBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'elephant_army_571');
    });
    this.dynamicContent.add(defeatBtn);

    // Global Impact Card
    const globalBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '✨',
      currentAppLanguage === 'bn' ? 'কাবার শ্রেষ্ঠত্ব ও নবুওতের প্রাক-প্রস্তুতি' : 'Ka\'bah\'s Honor & Prophetic Dawn',
      0x059669
    );

    globalBtn.on('pointerdown', () => {
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'elephant_army_571');
    });
    this.dynamicContent.add(globalBtn);
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

  // --- Animation and Particle FX Helpers using PMath ---
  private animateMarchingElephants(w: number, h: number) {
    if (!this.stormParticles) return;
    for (let i = 0; i < 3; i++) {
      const elephant = this.add.text(w * 0.20 + i * 40, h * 0.48, '🐘', {
        fontSize: '26px',
      }).setOrigin(0.5);
      this.stormParticles.add(elephant);

      this.tweens.add({
        targets: elephant,
        x: elephant.x + 120,
        alpha: 0.4,
        duration: 2500,
        yoyo: true,
        repeat: 1,
        onComplete: () => elephant.destroy(),
      });
    }
  }

  private spawnKneelingDust(x: number, y: number) {
    if (!this.stormParticles) return;
    for (let i = 0; i < 15; i++) {
      const dust = this.add.graphics();
      dust.fillStyle(0xd6d3d1, 0.8);
      dust.fillCircle(x + PMath.Between(-30, 30), y + PMath.Between(-10, 20), PMath.Between(4, 7));
      this.stormParticles.add(dust);

      this.tweens.add({
        targets: dust,
        scale: 1.5,
        alpha: 0,
        duration: PMath.Between(800, 1400),
        onComplete: () => dust.destroy(),
      });
    }
  }

  private spawnRunningPuffs(x: number, y: number) {
    if (!this.stormParticles) return;
    for (let i = 0; i < 12; i++) {
      const puff = this.add.graphics();
      puff.fillStyle(0xfde68a, 0.9);
      puff.fillCircle(x + PMath.Between(-25, 25), y + PMath.Between(-10, 10), PMath.Between(3, 6));
      this.stormParticles.add(puff);

      this.tweens.add({
        targets: puff,
        x: puff.x + PMath.Between(20, 60),
        alpha: 0,
        duration: 900,
        onComplete: () => puff.destroy(),
      });
    }
  }

  private createActiveAbabilFlight(w: number, h: number) {
    if (!this.birdsContainer) return;
    for (let i = 0; i < 32; i++) {
      const startX = PMath.Between(-50, w + 50);
      const startY = PMath.Between(35, h * 0.40);

      const bird = this.add.graphics();
      bird.lineStyle(2, 0x0f172a, 0.9);
      bird.beginPath();
      bird.moveTo(-4, -2);
      bird.lineTo(0, 1);
      bird.lineTo(4, -2);
      bird.strokePath();
      bird.x = startX;
      bird.y = startY;

      this.birdsContainer.add(bird);

      this.tweens.add({
        targets: bird,
        x: bird.x + PMath.Between(150, 350),
        y: bird.y + PMath.Between(-15, 20),
        duration: PMath.Between(4500, 9000),
        repeat: -1,
        onRepeat: () => {
          bird.x = PMath.Between(-30, 20);
          bird.y = PMath.Between(35, h * 0.40);
        },
      });
    }
  }

  private spawnPebblesShower(w: number, h: number) {
    if (!this.stormParticles) return;
    for (let i = 0; i < 25; i++) {
      const pebble = this.add.graphics();
      pebble.fillStyle(0xb45309, 1);
      pebble.fillCircle(PMath.Between(w * 0.2, w * 0.8), h * 0.25, 3); // Chickpea size
      this.stormParticles.add(pebble);

      this.tweens.add({
        targets: pebble,
        y: h * 0.75,
        alpha: 0,
        duration: PMath.Between(600, 1200),
        onComplete: () => pebble.destroy(),
      });
    }
  }

  // --- Language Text Updates ---
  private updateLanguageStrings(lang: 'bn' | 'en') {
    const isBn = lang === 'bn';

    this.titleBanner?.setText(
      isBn
        ? 'হস্তীবাহিনীর অলৌকিক ধ্বংস (আমুল ফীল - ৫৭১ খ্রি.)'
        : 'The Defeat of the Elephant Army (571 CE)'
    );

    this.backBtn?.setText(isBn ? '← মানচিত্র' : '← Map');
    this.switchFamilyBtn?.setText(isBn ? '📜 পরিবার ও নসব' : '📜 Family Lineage');

    this.prevBtn?.setText(isBn ? '◀ আগের ধাপ' : '◀ Previous');
    this.nextBtn?.setText(isBn ? 'পরের ধাপ ▶' : 'Next ▶');

    this.phaseIndicator?.setText(
      isBn ? `ধাপ ${this.currentPhase} / ${this.maxPhase}` : `Phase ${this.currentPhase} of ${this.maxPhase}`
    );

    switch (this.currentPhase) {
      case 1:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ১: সানা\'র বিশাল গির্জা আল-কুল্লাইস ও চক্রান্ত'
            : 'Phase 1: Abrahah\'s Cathedral (Al-Qullays in Sana\'a)'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'ইয়েমেনের গভর্নর আবরাহা আরবদের হজ্জ কাবা থেকে সানা\'য় ঘোরানোর অপচেষ্টা চালায়।'
            : 'Abrahah sought to divert Arabian pilgrimage from the Ka\'bah to his lavish cathedral.'
        );
        break;
      case 2:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ২: ৬০ হাজার সৈন্য ও মাহমুদ যুদ্ধহাতীর আগ্রাসন'
            : 'Phase 2: March of 60,000 Aggressors & War Elephants'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'মক্কা ধ্বংসের উদ্দেশ্যে আবরাহা প্রকাণ্ড সৈন্যদল ও যুদ্ধহাতী নিয়ে মুগাম্মাসে পৌঁছে।'
            : 'Abrahah marched with 60,000 troops and giant war elephants aiming to demolish the Ka\'bah.'
        );
        break;
      case 3:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ৩: মুহাসসার উপত্যকা ও মাহমুদ হাতীর অলৌকিক কুর্নিশ'
            : 'Phase 3: Mahmoud Kneels at Wadi Muhassir'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'হাতীর দিক পরিবর্তনের বাটনে ট্যাপ করো: কাবার দিকে সে বসে পড়ে, অথচ অন্য দিকে দৌড়ায়!'
            : 'Tap the direction buttons: towards Ka\'bah it halts and kneels, yet runs eagerly elsewhere!'
        );
        break;
      case 4:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ৪: ঝাঁকে ঝাঁকে আবাবীল পাখির কঙ্কর বর্ষণ'
            : 'Phase 4: Swarms of Ababil Birds & Clay Pebbles'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'প্রতিটি পাখি চঞ্চু ও দুই পায়ে ছোলার ন্যায় ৩টি করে কঙ্কর নিক্ষেপ করে আগ্রাসীদের আঘাত হানে!'
            : 'Each bird dropped three chickpea-sized baked clay pebbles, devastating the invaders!'
        );
        break;
      case 5:
        this.promptTitle?.setText(
          isBn
            ? 'ধাপ ৫: ভক্ষিত তৃণের ন্যায় বিনাশ ও নবুওতের প্রাক-প্রস্তুতি'
            : 'Phase 5: Annihilation Like Eaten Straw & The Prophetic Dawn'
        );
        this.promptSubtitle?.setText(
          isBn
            ? 'রাসূল ﷺ-এর জন্মের ৫০-৫৫ দিন আগে আল্লাহ কোনো মানব সেনাদল ছাড়াই কাবা রক্ষা করলেন।'
            : '50-55 days before the Prophet’s ﷺ birth, Allah defended His House purely by divine intervention.'
        );
        break;
    }
  }
}
