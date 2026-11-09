import { Scene, Math as PMath } from 'phaser';
import { EventBus, GAME_EVENTS } from '../EventBus';
import { CHAPTER_2_SECTION_2_DATA } from '../../data/chapter2Section2Data';

export class YouthAndPeacemakerScene extends Scene {
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
  private cloakUnited: boolean = false;
  private justicePactSworn: boolean = false;
  private ethicalTradeActive: boolean = false;

  constructor() {
    super('YouthAndPeacemakerScene');
  }

  create() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // 1. Ambient glow & particles
    this.createAmbientGlow(w, h);

    // 2. Main containers
    this.dynamicContent = this.add.container(0, 0);
    this.particlesContainer = this.add.container(0, 0);

    // 3. Story HUD prompt box
    this.buildStoryPromptBox(w, h);

    // 4. Bottom HUD phase navigator
    this.buildBottomHUD(w, h);

    // 5. Initial Render: Phase 1
    this.renderPhase(1);

    // Language change listener
    const onLanguageChanged = () => {
      this.updateLanguageStrings();
    };
    EventBus.on(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);

    this.events.once('shutdown', () => {
      EventBus.removeListener(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);
    });

    EventBus.emit(GAME_EVENTS.SCENE_READY, 'YouthAndPeacemakerScene');
    EventBus.emit(GAME_EVENTS.SCENE_CHANGED, 'YouthAndPeacemakerScene');
  }

  // --- Top Story Prompt Box ---
  private buildStoryPromptBox(w: number, _h: number) {
    this.promptBox = this.add.container(w * 0.5, 88);

    const bg = this.add.graphics();
    bg.fillStyle(0xfffbeb, 0.95);
    bg.fillRoundedRect(-330, -10, 660, 58, 14);
    bg.lineStyle(2, 0x059669, 0.85);
    bg.strokeRoundedRect(-330, -10, 660, 58, 14);

    this.promptTitle = this.add.text(0, 4, '', {
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#064e3b',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.promptSubtitle = this.add.text(0, 26, '', {
      fontFamily: 'sans-serif',
      fontSize: '11px',
      color: '#047857',
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
    hudBg.lineStyle(1.5, 0x10b981, 0.8);
    hudBg.strokeRoundedRect(-220, -22, 440, 44, 22);
    hudContainer.add(hudBg);

    // Prev Button
    this.prevBtn = this.add.container(-170, 0);
    const prevBg = this.add.graphics();
    prevBg.fillStyle(0x064e3b, 0.9);
    prevBg.fillRoundedRect(-32, -14, 64, 28, 14);
    const prevText = this.add.text(0, 0, '◀ পূর্ববর্তী', {
      fontFamily: 'sans-serif',
      fontSize: '10px',
      color: '#ecfdf5',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.prevBtn.add([prevBg, prevText]);
    this.prevBtn.setSize(64, 28);
    this.prevBtn.setInteractive({ useHandCursor: true });
    this.prevBtn.on('pointerdown', () => {
      if (this.currentPhase > 1) {
        this.renderPhase(this.currentPhase - 1);
      }
    });
    hudContainer.add(this.prevBtn);

    // 5 Phase Dots
    this.phaseDots = [];
    const dotSpacing = 30;
    const startX = -((this.maxPhase - 1) * dotSpacing) / 2;

    for (let i = 0; i < this.maxPhase; i++) {
      const dotX = startX + i * dotSpacing;
      const dot = this.add.circle(dotX, 0, 5, 0x10b981, 0.5);
      dot.setInteractive({ useHandCursor: true });
      const phaseNum = i + 1;
      dot.on('pointerdown', () => {
        this.renderPhase(phaseNum);
      });
      hudContainer.add(dot);
      this.phaseDots.push(dot);
    }

    // Next Button
    this.nextBtn = this.add.container(170, 0);
    const nextBg = this.add.graphics();
    nextBg.fillStyle(0x064e3b, 0.9);
    nextBg.fillRoundedRect(-32, -14, 64, 28, 14);
    const nextText = this.add.text(0, 0, 'পরবর্তী ▶', {
      fontFamily: 'sans-serif',
      fontSize: '10px',
      color: '#ecfdf5',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.nextBtn.add([nextBg, nextText]);
    this.nextBtn.setSize(64, 28);
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

    // Clear dynamic objects
    if (this.dynamicContent) {
      this.dynamicContent.removeAll(true);
    }
    if (this.particlesContainer) {
      this.particlesContainer.removeAll(true);
    }

    // Update Dots & Navigation states
    this.phaseDots.forEach((dot, idx) => {
      if (idx + 1 === phase) {
        dot.setFillStyle(0x34d399, 1);
        dot.setRadius(7);
      } else {
        dot.setFillStyle(0x059669, 0.5);
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
        this.setupPhase1HilfAlFudul(w, h);
        break;
      case 2:
        this.setupPhase2ShepherdingTrade(w, h);
        break;
      case 3:
        this.setupPhase3SyrianCaravanMarriage(w, h);
        break;
      case 4:
        this.setupPhase4KaBahRebuildingPeacemaker(w, h);
        break;
      case 5:
        this.setupPhase5PristineCharacterAlAmin(w, h);
        break;
    }

    this.updateLanguageStrings();
  }

  private drawPhaseBackground(phase: number, w: number, h: number) {
    if (this.currentBgImage) {
      this.currentBgImage.destroy();
      this.currentBgImage = undefined;
    }

    let bgKey = 'hilf_al_fudul_gathering_hall';
    if (phase === 2) bgKey = 'banu_sad_desert_pasture';
    else if (phase === 3) bgKey = 'busra_syria_monastery';
    else if (phase === 4) bgKey = 'kabah_reconstruction_ancient';
    else if (phase === 5) bgKey = 'makkah_night_sanctuary';

    if (this.textures.exists(bgKey)) {
      this.currentBgImage = this.add.image(w / 2, h / 2, bgKey);
      this.currentBgImage.setDisplaySize(w, h);
      this.currentBgImage.setDepth(-10);
    }
  }

  // =========================================================================
  // Phase 1: Harb al-Fijar & Hilf al-Fudul Justice Pact
  // =========================================================================
  private setupPhase1HilfAlFudul(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Hilf al-Fudul Swearing
    const pactBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '📜',
      this.justicePactSworn ? 'ন্যায়বিচারের ঐতিহাসিক শপথ গৃহীত' : 'হিলফুল ফুযূল শান্তিচুক্তির শপথ',
      0x059669
    );
    pactBtn.on('pointerdown', () => {
      this.justicePactSworn = true;
      this.spawnPactSealRadiance(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'hilf_al_fudul_pact');
    });
    this.dynamicContent.add(pactBtn);

    // Action 2: Harb al-Fijar Arrow Defense
    const fijarBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '🏹',
      'ফিজার যুদ্ধ ও চাচাদের তীর হস্তান্তর',
      0xd97706
    );
    fijarBtn.on('pointerdown', () => {
      this.spawnArrowWardAnimation(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'hilf_al_fudul_pact');
    });
    this.dynamicContent.add(fijarBtn);
  }

  // =========================================================================
  // Phase 2: Shepherding & Ethical Trade Partnership
  // =========================================================================
  private setupPhase2ShepherdingTrade(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Shepherding in Ajyad
    const sheepBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '🐑',
      'আজয়াদে পারিশ্রমিকে ছাগল চরানো',
      0x10b981
    );
    sheepBtn.on('pointerdown', () => {
      this.spawnPastoralGlow(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'shepherding_and_trade');
    });
    this.dynamicContent.add(sheepBtn);

    // Action 2: Sa'ib Partnership
    const tradeBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '⚖️',
      this.ethicalTradeActive ? 'সায়িবের অংশীদারি: বিরোধহীন আমানত' : 'নৈতিক বাণিজ্য ও বিশ্বস্ত অংশীদার',
      0xb45309
    );
    tradeBtn.on('pointerdown', () => {
      this.ethicalTradeActive = true;
      this.spawnScalesOfJustice(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'shepherding_and_trade');
    });
    this.dynamicContent.add(tradeBtn);
  }

  // =========================================================================
  // Phase 3: Syrian Caravan with Maysarah & Marriage to Khadijah (R.A.)
  // =========================================================================
  private setupPhase3SyrianCaravanMarriage(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Syrian Trade & Doubled Profit
    const caravanBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '🐪',
      'সিরিয়া সফর ও দ্বিগুণ লাভ অর্জন',
      0x0284c7
    );
    caravanBtn.on('pointerdown', () => {
      this.spawnCaravanBreeze(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'khadijah_caravan_marriage');
    });
    this.dynamicContent.add(caravanBtn);

    // Action 2: Holy Marriage & Abu Talib's Khutbah
    const weddingBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '💍',
      'খাদীজার (রা.) সাথে শুভ পরিণয় ও মহর',
      0xd97706
    );
    weddingBtn.on('pointerdown', () => {
      this.spawnWeddingGoldenSparks(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'khadijah_caravan_marriage');
    });
    this.dynamicContent.add(weddingBtn);
  }

  // =========================================================================
  // Phase 4: Ka'bah Rebuilding & Black Stone Peacemaking
  // =========================================================================
  private setupPhase4KaBahRebuildingPeacemaker(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Peacemaking Cloak
    const cloakBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '🕋',
      this.cloakUnited ? 'চার গোত্রের ঐক্যবদ্ধ চাদরে আসওয়াদ' : 'চাদরে হাজরে আসওয়াদ স্থাপন সমাধান',
      0xd97706
    );
    cloakBtn.on('pointerdown', () => {
      this.cloakUnited = true;
      this.spawnCloakUnificationEffect(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'kabah_rebuilding_peacemaker');
    });
    this.dynamicContent.add(cloakBtn);

    // Action 2: Halal Fund Limits & Hatim Dimensions
    const hatimBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '📐',
      'হাতিম ও ১৫ মি. উচ্চতার স্থাপত্য',
      0x059669
    );
    hatimBtn.on('pointerdown', () => {
      this.spawnKaBahArchitecturalGrid(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'kabah_rebuilding_peacemaker');
    });
    this.dynamicContent.add(hatimBtn);
  }

  // =========================================================================
  // Phase 5: Pristine Character, Divine Protection & Al-Amin Title
  // =========================================================================
  private setupPhase5PristineCharacterAlAmin(w: number, h: number) {
    if (!this.dynamicContent) return;

    // Action 1: Divine Protection from Jaahiliyyah
    const protectBtn = this.createActionButton(
      w * 0.35,
      h * 0.58,
      '🛡️',
      'জাহেলি গান ও নগ্নতা থেকে অলৌকিক রক্ষা',
      0x4338ca
    );
    protectBtn.on('pointerdown', () => {
      this.spawnDivineWardAura(w * 0.35, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'pristine_character_al_amin');
    });
    this.dynamicContent.add(protectBtn);

    // Action 2: Universal "Al-Amin" Recognition
    const alAminBtn = this.createActionButton(
      w * 0.65,
      h * 0.58,
      '👑',
      'মক্কাবাসীর সর্বসম্মত "আল-আমীন" উপাধি',
      0xb45309
    );
    alAminBtn.on('pointerdown', () => {
      this.spawnAlAminCrestRadiance(w * 0.65, h * 0.45);
      EventBus.emit(GAME_EVENTS.CHAPTER2_STATION_SELECTED, 'pristine_character_al_amin');
    });
    this.dynamicContent.add(alAminBtn);
  }

  // =========================================================================
  // Visual Effects & Animations
  // =========================================================================

  private spawnPactSealRadiance(x: number, y: number) {
    if (!this.particlesContainer) return;
    const ring = this.add.graphics();
    ring.lineStyle(3, 0x10b981, 0.9);
    ring.strokeCircle(x, y, 10);
    this.particlesContainer.add(ring);

    this.tweens.add({
      targets: ring,
      scaleX: 5,
      scaleY: 5,
      alpha: 0,
      duration: 1100,
      onComplete: () => ring.destroy(),
    });

    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const star = this.add.text(x, y, '✦', { fontSize: '13px', color: '#6ee7b7' }).setOrigin(0.5);
      this.particlesContainer.add(star);
      this.tweens.add({
        targets: star,
        x: x + Math.cos(angle) * 75,
        y: y + Math.sin(angle) * 75,
        alpha: 0,
        duration: 950,
        onComplete: () => star.destroy(),
      });
    }
  }

  private spawnArrowWardAnimation(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 8; i++) {
      const arrow = this.add.graphics();
      arrow.lineStyle(2, 0xd97706, 0.85);
      arrow.lineBetween(x - 30 + i * 8, y + 40, x - 10 + i * 8, y - 30);
      this.particlesContainer.add(arrow);

      this.tweens.add({
        targets: arrow,
        y: y - 50,
        alpha: 0,
        duration: 800 + i * 50,
        onComplete: () => arrow.destroy(),
      });
    }
  }

  private spawnPastoralGlow(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 14; i++) {
      const p = this.add.circle(
        x + PMath.Between(-60, 60),
        y + PMath.Between(-30, 30),
        PMath.Between(2, 5),
        0xa7f3d0,
        0.8
      );
      this.particlesContainer.add(p);
      this.tweens.add({
        targets: p,
        y: y - 45,
        alpha: 0,
        duration: PMath.Between(1000, 1600),
        onComplete: () => p.destroy(),
      });
    }
  }

  private spawnScalesOfJustice(x: number, y: number) {
    if (!this.particlesContainer) return;
    const scale = this.add.text(x, y, '⚖️', { fontSize: '40px' }).setOrigin(0.5);
    scale.setScale(0.5);
    scale.setAlpha(0);
    this.particlesContainer.add(scale);

    this.tweens.add({
      targets: scale,
      scale: 1.4,
      alpha: 1,
      y: y - 25,
      duration: 500,
      yoyo: true,
      hold: 800,
      onComplete: () => scale.destroy(),
    });
  }

  private spawnCaravanBreeze(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 12; i++) {
      const puff = this.add.circle(x - 60 + i * 12, y + PMath.Between(-15, 15), 6, 0xbae6fd, 0.6);
      this.particlesContainer.add(puff);
      this.tweens.add({
        targets: puff,
        x: x + 80 + i * 10,
        alpha: 0,
        scale: 2,
        duration: 900 + i * 60,
        onComplete: () => puff.destroy(),
      });
    }
  }

  private spawnWeddingGoldenSparks(x: number, y: number) {
    if (!this.particlesContainer) return;
    for (let i = 0; i < 22; i++) {
      const spark = this.add.circle(
        x,
        y,
        PMath.Between(3, 6),
        0xfef08a,
        0.9
      );
      this.particlesContainer.add(spark);
      const angle = PMath.FloatBetween(0, Math.PI * 2);
      const dist = PMath.Between(40, 95);
      this.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        duration: PMath.Between(800, 1400),
        onComplete: () => spark.destroy(),
      });
    }
  }

  private spawnCloakUnificationEffect(x: number, y: number) {
    if (!this.particlesContainer) return;

    // Cloak square
    const cloak = this.add.graphics();
    cloak.lineStyle(3, 0xfef08a, 0.95);
    cloak.fillStyle(0x78350f, 0.7);
    cloak.strokeRect(x - 50, y - 50, 100, 100);
    cloak.fillRect(x - 50, y - 50, 100, 100);
    this.particlesContainer.add(cloak);

    // 4 Corner nodes representing tribal leaders
    const corners = [
      { cx: x - 50, cy: y - 50 },
      { cx: x + 50, cy: y - 50 },
      { cx: x + 50, cy: y + 50 },
      { cx: x - 50, cy: y + 50 },
    ];

    corners.forEach((c) => {
      const node = this.add.circle(c.cx, c.cy, 8, 0x38bdf8, 1);
      this.particlesContainer?.add(node);
      this.tweens.add({
        targets: node,
        scale: 1.4,
        yoyo: true,
        repeat: 2,
        duration: 350,
        onComplete: () => node.destroy(),
      });
    });

    // Central Hajr al-Aswad stone representation (glowing obsidian)
    const stone = this.add.circle(x, y, 14, 0x111827, 1);
    const stoneGlow = this.add.circle(x, y, 18, 0xf59e0b, 0.6);
    this.particlesContainer.add([stoneGlow, stone]);

    this.tweens.add({
      targets: [cloak, stone, stoneGlow],
      y: y - 30,
      duration: 1200,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        cloak.destroy();
        stone.destroy();
        stoneGlow.destroy();
      },
    });
  }

  private spawnKaBahArchitecturalGrid(x: number, y: number) {
    if (!this.particlesContainer) return;
    const grid = this.add.graphics();
    grid.lineStyle(2, 0x34d399, 0.85);

    // Front elevation
    grid.strokeRect(x - 45, y - 60, 90, 80);
    // Hatim curve on the side
    grid.beginPath();
    grid.arc(x - 45, y - 20, 26, Math.PI * 0.5, Math.PI * 1.5, false);
    grid.strokePath();

    this.particlesContainer.add(grid);

    const txt = this.add.text(x, y + 35, '১৫ মি. উচ্চতা • ৬ হাত হাতিম বাইরে', {
      fontFamily: 'sans-serif',
      fontSize: '11px',
      color: '#a7f3d0',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.particlesContainer.add(txt);

    this.tweens.add({
      targets: [grid, txt],
      alpha: 0,
      duration: 1800,
      onComplete: () => {
        grid.destroy();
        txt.destroy();
      },
    });
  }

  private spawnDivineWardAura(x: number, y: number) {
    if (!this.particlesContainer) return;
    const aura = this.add.graphics();
    aura.fillStyle(0x818cf8, 0.4);
    aura.fillCircle(x, y, 45);
    this.particlesContainer.add(aura);

    this.tweens.add({
      targets: aura,
      scaleX: 1.8,
      scaleY: 1.8,
      alpha: 0,
      duration: 1200,
      onComplete: () => aura.destroy(),
    });
  }

  private spawnAlAminCrestRadiance(x: number, y: number) {
    if (!this.particlesContainer) return;
    const title = this.add.text(x, y, 'الصَّادِقُ الأَمِينُ', {
      fontFamily: 'serif',
      fontSize: '26px',
      color: '#fef08a',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.particlesContainer.add(title);

    this.tweens.add({
      targets: title,
      scale: 1.3,
      alpha: { from: 1, to: 0 },
      y: y - 35,
      duration: 1700,
      onComplete: () => title.destroy(),
    });
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
    const stations = CHAPTER_2_SECTION_2_DATA.stations.filter((s) => s.subScene === 'youth');
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
      dot.fillStyle(0x6ee7b7, PMath.FloatBetween(0.2, 0.6));
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
