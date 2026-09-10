import { Scene, Math as PMath, GameObjects } from 'phaser';
import { EventBus, GAME_EVENTS, currentAppLanguage } from '../EventBus';
import { CHAPTER_1_DATA, LocationPoint } from '../../data/chapter1Data';

export class ArabiaMapScene extends Scene {
  private caravanPathPoints: { x: number; y: number }[] = [];
  private caravanIndex = 0;
  private caravanSprite?: GameObjects.Sprite;
  private markers: GameObjects.Container[] = [];
  private markerLabels: { label: GameObjects.Text; loc: LocationPoint }[] = [];
  private tradeRouteLabel?: GameObjects.Text;
  private titleLabel?: GameObjects.Text;

  constructor() {
    super('ArabiaMapScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Reset collections
    this.markers = [];
    this.markerLabels = [];

    // Draw ocean background
    const ocean = this.add.graphics();
    ocean.fillGradientStyle(0x0284c7, 0x0284c7, 0x075985, 0x075985, 1);
    ocean.fillRect(0, 0, width, height);

    // Draw stylized Arabian Peninsula polygon & terrain
    this.drawArabiaLandmass(width, height);

    // Draw trade routes
    this.drawTradeRoutes(width, height);

    // Place location markers
    this.placeLocationMarkers(width, height);

    // Setup animated caravan
    this.setupCaravan(width, height);

    // Apply current language
    this.updateLanguageStrings(currentAppLanguage);

    // Notify React that the scene is loaded
    EventBus.emit(GAME_EVENTS.SCENE_READY, this);

    // Event listeners
    const onSwitchScene = (targetScene: string) => {
      if (this.scene.isActive()) {
        this.scene.start(targetScene);
      }
    };

    const onLanguageChanged = (lang: 'bn' | 'en') => {
      this.updateLanguageStrings(lang);
    };

    EventBus.on(GAME_EVENTS.SWITCH_SCENE, onSwitchScene);
    EventBus.on(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);

    // Cleanup on scene shutdown or destroy
    this.events.once('shutdown', () => {
      EventBus.removeListener(GAME_EVENTS.SWITCH_SCENE, onSwitchScene);
      EventBus.removeListener(GAME_EVENTS.LANGUAGE_CHANGED, onLanguageChanged);
    });
  }

  private updateLanguageStrings(lang: 'bn' | 'en') {
    const isBn = lang === 'bn';

    this.markerLabels.forEach(({ label, loc }) => {
      if (label && label.active && label.scene) {
        label.setText(isBn ? loc.nameBn : loc.nameEn);
      }
    });

    if (this.tradeRouteLabel && this.tradeRouteLabel.active && this.tradeRouteLabel.scene) {
      this.tradeRouteLabel.setText(
        isBn ? 'প্রাচীন বাণিজ্য পথ (Trade Route)' : 'Ancient Incense Trade Route'
      );
    }

    if (this.titleLabel && this.titleLabel.active && this.titleLabel.scene) {
      this.titleLabel.setText(
        isBn
          ? 'جَزِيرَةُ الْعَرَبِ\nআরব উপদ্বীপ'
          : 'جَزِيرَةُ الْعَرَبِ\nARABIAN PENINSULA'
      );
    }
  }

  private drawArabiaLandmass(w: number, h: number) {
    const terrain = this.add.graphics();

    // Peninsula coordinates proportionally
    const polyPoints = [
      new PMath.Vector2(w * 0.22, h * 0.15), // North-west (Sinai border)
      new PMath.Vector2(w * 0.35, h * 0.12), // North (Levant)
      new PMath.Vector2(w * 0.65, h * 0.20), // North-east (Euphrates / Iraq border)
      new PMath.Vector2(w * 0.78, h * 0.38), // Persian Gulf north
      new PMath.Vector2(w * 0.82, h * 0.55), // Oman peninsula
      new PMath.Vector2(w * 0.72, h * 0.75), // Arabian Sea coast east
      new PMath.Vector2(w * 0.55, h * 0.92), // Yemen south tip
      new PMath.Vector2(w * 0.42, h * 0.88), // Bab al-Mandab
      new PMath.Vector2(w * 0.30, h * 0.60), // Red Sea central coast (Hijaz)
      new PMath.Vector2(w * 0.24, h * 0.35), // Red Sea north coast
    ];

    // Landmass base fill (Warm Desert Gold)
    terrain.fillStyle(0xf6d89e, 1);
    terrain.beginPath();
    terrain.moveTo(polyPoints[0].x, polyPoints[0].y);
    for (let i = 1; i < polyPoints.length; i++) {
      terrain.lineTo(polyPoints[i].x, polyPoints[i].y);
    }
    terrain.closePath();
    terrain.fillPath();

    // Sandy border stroke
    terrain.lineStyle(4, 0xd97706, 0.8);
    terrain.strokePoints(polyPoints, true);

    // Subtle desert sand dunes shading
    const dunes = this.add.graphics();
    dunes.fillStyle(0xedd187, 0.6);
    dunes.fillEllipse(w * 0.52, h * 0.45, w * 0.3, h * 0.25);
    dunes.fillEllipse(w * 0.60, h * 0.68, w * 0.25, h * 0.18); // Rub' al Khali

    // Mountains representation along western coast (Sarawat Mountains)
    const mountains = this.add.graphics();
    mountains.fillStyle(0xb45309, 0.4);
    for (let i = 0; i < 7; i++) {
      const mx = w * (0.28 + i * 0.025);
      const my = h * (0.35 + i * 0.07);
      mountains.fillTriangle(mx, my + 15, mx + 12, my, mx + 24, my + 15);
    }

    // Title label on map
    this.titleLabel = this.add.text(w * 0.52, h * 0.48, 'جَزِيرَةُ الْعَرَبِ\nআরব উপদ্বীপ', {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#92400e',
      align: 'center',
      fontStyle: 'bold',
    }).setOrigin(0.5).setAlpha(0.45);
  }

  private drawTradeRoutes(w: number, h: number) {
    const route = this.add.graphics();
    route.lineStyle(3, 0xb45309, 0.5);

    // Historic Incense Route: Yemen -> Makkah -> Yathrib -> Petra
    this.caravanPathPoints = [
      { x: w * 0.52, y: h * 0.86 }, // Yemen
      { x: w * 0.43, y: h * 0.70 }, // Tihama waypoint
      { x: w * 0.38, y: h * 0.56 }, // Makkah
      { x: w * 0.35, y: h * 0.44 }, // Yathrib
      { x: w * 0.31, y: h * 0.32 }, // Hijaz North
      { x: w * 0.28, y: h * 0.22 }, // Petra
    ];

    // Draw dashed path
    for (let i = 0; i < this.caravanPathPoints.length - 1; i++) {
      const p1 = this.caravanPathPoints[i];
      const p2 = this.caravanPathPoints[i + 1];
      route.lineBetween(p1.x, p1.y, p2.x, p2.y);
    }

    // Label on route
    this.tradeRouteLabel = this.add.text(w * 0.43, h * 0.62, 'প্রাচীন বাণিজ্য পথ (Trade Route)', {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      color: '#78350f',
      backgroundColor: '#fef3c7',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5).setRotation(-0.9);
  }

  private placeLocationMarkers(w: number, h: number) {
    CHAPTER_1_DATA.locations.forEach((loc: LocationPoint) => {
      const posX = (loc.x / 100) * w;
      const posY = (loc.y / 100) * h;

      const container = this.add.container(posX, posY);

      // Pin Sprite
      const textureKey = loc.type === 'holy_city' ? 'holy_pin' : 'location_pin';
      const pin = this.add.sprite(0, 0, textureKey).setInteractive({ cursor: 'pointer' });

      // Pulsing tween for Makkah
      if (loc.type === 'holy_city') {
        this.tweens.add({
          targets: pin,
          scale: { from: 1, to: 1.25 },
          alpha: { from: 1, to: 0.8 },
          duration: 900,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      }

      // Initial Label Text
      const initialText = currentAppLanguage === 'bn' ? loc.nameBn : loc.nameEn;
      const label = this.add.text(0, 24, initialText, {
        fontFamily: 'sans-serif',
        fontSize: '13px',
        color: '#1e293b',
        backgroundColor: '#ffffffdd',
        padding: { x: 6, y: 3 },
      }).setOrigin(0.5, 0);

      this.markerLabels.push({ label, loc });
      container.add([pin, label]);

      // Hover and click actions
      pin.on('pointerover', () => {
        pin.setScale(1.2);
        label.setStyle({ backgroundColor: '#fef08a', color: '#0f172a' });
      });

      pin.on('pointerout', () => {
        pin.setScale(1.0);
        label.setStyle({ backgroundColor: '#ffffffdd', color: '#1e293b' });
      });

      pin.on('pointerdown', () => {
        this.emitParticles(posX, posY);
        EventBus.emit(GAME_EVENTS.LOCATION_SELECTED, loc);
      });

      this.markers.push(container);
    });
  }

  private setupCaravan(w: number, h: number) {
    if (this.caravanPathPoints.length === 0) return;

    const start = this.caravanPathPoints[0];
    this.caravanSprite = this.add.sprite(start.x, start.y, 'caravan_camel').setDepth(10);

    this.moveCaravanToNextPoint();
  }

  private moveCaravanToNextPoint() {
    if (!this.caravanSprite || !this.caravanSprite.active) return;

    this.caravanIndex = (this.caravanIndex + 1) % this.caravanPathPoints.length;
    const target = this.caravanPathPoints[this.caravanIndex];

    this.tweens.add({
      targets: this.caravanSprite,
      x: target.x,
      y: target.y,
      duration: 3500,
      ease: 'Linear',
      onComplete: () => {
        this.time.delayedCall(1200, () => {
          this.moveCaravanToNextPoint();
        });
      }
    });
  }

  private emitParticles(x: number, y: number) {
    for (let i = 0; i < 10; i++) {
      const spark = this.add.sprite(x, y, 'particle_sparkle');
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 60;
      this.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed,
        alpha: 0,
        scale: 0.2,
        duration: 600,
        ease: 'Cubic.easeOut',
        onComplete: () => spark.destroy()
      });
    }
  }
}
