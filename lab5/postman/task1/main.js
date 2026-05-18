import * as PIXI from 'pixi.js';

(async () => {
    const app = new PIXI.Application();
    await app.init({ width: 640, height: 480, backgroundColor: 0x1099bb });
    document.body.appendChild(app.canvas);

    const rect = new PIXI.Graphics();
    rect.beginFill(0xff0000);
    rect.drawRect(0, 0, 100, 100);
    rect.endFill();
    rect.x = app.screen.width / 2 - 50;
    rect.y = app.screen.height / 2 - 50;
    app.stage.addChild(rect);

    app.ticker.add(() => {
        rect.rotation += 0.02;
    });
})();