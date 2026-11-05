import { Scene } from 'phaser';

export class BootScene extends Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // 1. Load Chapter 1 background artwork assets
    this.load.image('arabia_map_parchment', 'assets/images/arabia_map_parchment.jpg');
    this.load.image('makkah_valley_day', 'assets/images/makkah_valley_day.jpg');
    this.load.image('zamzam_oasis_bloom', 'assets/images/zamzam_oasis_bloom.jpg');
    this.load.image('kabah_construction_bg', 'assets/images/kabah_construction_bg.jpg');
    this.load.image('makkah_night_sanctuary', 'assets/images/makkah_night_sanctuary.jpg');
    this.load.image('dar_al_nadwah_interior', 'assets/images/dar_al_nadwah_interior.jpg');
    this.load.image('hubal_idol_sanctuary', 'assets/images/hubal_idol_sanctuary.jpg');
    this.load.image('azlam_divination_arrows', 'assets/images/azlam_divination_arrows.jpg');
    this.load.image('ukaz_marketplace_trade', 'assets/images/ukaz_marketplace_trade.jpg');
    this.load.image('pre_islamic_reformation', 'assets/images/pre_islamic_reformation.jpg');

    // 2. Load Chapter 2 background artwork assets
    this.load.image('hashim_caravan_mecca', 'assets/images/hashim_caravan_mecca.jpg');
    this.load.image('zamzam_rediscovery_ancient', 'assets/images/zamzam_rediscovery_ancient.jpg');
    this.load.image('wadi_muhassir_elephant_storm', 'assets/images/wadi_muhassir_elephant_storm.jpg');
    this.load.image('yathrib_oasis_groves', 'assets/images/yathrib_oasis_groves.jpg');

    // 3. Generate procedural helper textures
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
    camel.fillRoundedRect(8, 12, 24, 14, 4);
    camel.fillCircle(18, 10, 7); // Hump
    camel.fillCircle(28, 8, 4); // Neck / head
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

    // 6. Lineage Star Node (Royal Gold & Amber glowing node)
    const starNode = this.make.graphics({ x: 0, y: 0 });
    starNode.fillStyle(0xf59e0b, 0.35);
    starNode.fillCircle(28, 28, 26);
    starNode.fillStyle(0xd97706, 0.9);
    starNode.fillCircle(28, 28, 18);
    starNode.fillStyle(0xfffbeb, 1);
    starNode.fillCircle(28, 28, 8);
    starNode.generateTexture('lineage_star', 56, 56);
    starNode.destroy();

    // 7. Elephant Year Shield Marker (Crimson & Gold)
    const shieldMarker = this.make.graphics({ x: 0, y: 0 });
    shieldMarker.fillStyle(0xb91c1c, 0.4);
    shieldMarker.fillCircle(28, 28, 26);
    shieldMarker.fillStyle(0x991b1b, 0.9);
    shieldMarker.fillCircle(28, 28, 18);
    shieldMarker.fillStyle(0xfef08a, 1);
    shieldMarker.fillCircle(28, 28, 8);
    shieldMarker.generateTexture('elephant_shield_marker', 56, 56);
    shieldMarker.destroy();
  }
}
