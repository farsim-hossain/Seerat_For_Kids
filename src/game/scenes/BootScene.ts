import { Scene } from 'phaser';

export class BootScene extends Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Generate procedural textures to guarantee zero broken asset dependencies
    this.createProceduralAssets();
  }

  create() {
    this.scene.start('ArabiaMapScene');
  }

  private createProceduralAssets() {
    // 1. Hotspot Marker Texture (Golden glowing pin)
    const pinGraphics = this.make.graphics({ x: 0, y: 0 });
    // Outer glow
    pinGraphics.fillStyle(0xffd700, 0.4);
    pinGraphics.fillCircle(24, 24, 22);
    // Middle ring
    pinGraphics.fillStyle(0xd97706, 0.9);
    pinGraphics.fillCircle(24, 24, 15);
    // Center bright dot
    pinGraphics.fillStyle(0xffffff, 1);
    pinGraphics.fillCircle(24, 24, 7);
    pinGraphics.generateTexture('location_pin', 48, 48);
    pinGraphics.destroy();

    // 2. Holy City Pin (Emerald green glow for Makkah)
    const holyPin = this.make.graphics({ x: 0, y: 0 });
    holyPin.fillStyle(0x10b981, 0.4);
    holyPin.fillCircle(28, 28, 26);
    holyPin.fillStyle(0x059669, 0.95);
    holyPin.fillCircle(28, 28, 18);
    holyPin.fillStyle(0xfef08a, 1);
    holyPin.fillCircle(28, 28, 9);
    holyPin.generateTexture('holy_pin', 56, 56);
    holyPin.destroy();

    // 3. Trade Caravan Sprite (Stylized Desert Camel silhouette)
    const camel = this.make.graphics({ x: 0, y: 0 });
    camel.fillStyle(0x78350f, 1);
    // Body & hump
    camel.fillRoundedRect(8, 12, 24, 14, 4);
    camel.fillCircle(18, 10, 7); // Hump
    camel.fillCircle(28, 8, 4); // Neck / head
    // Legs
    camel.fillRect(10, 24, 3, 10);
    camel.fillRect(16, 24, 3, 10);
    camel.fillRect(24, 24, 3, 10);
    camel.fillRect(28, 24, 3, 10);
    camel.generateTexture('caravan_camel', 36, 36);
    camel.destroy();

    // 4. Sparkle / Particle
    const sparkle = this.make.graphics({ x: 0, y: 0 });
    sparkle.fillStyle(0xfef08a, 1);
    sparkle.fillCircle(8, 8, 6);
    sparkle.generateTexture('particle_sparkle', 16, 16);
    sparkle.destroy();

    // 5. Water droplet particle (for Zamzam spring)
    const water = this.make.graphics({ x: 0, y: 0 });
    water.fillStyle(0x38bdf8, 0.9);
    water.fillCircle(8, 8, 6);
    water.generateTexture('particle_water', 16, 16);
    water.destroy();
  }
}
