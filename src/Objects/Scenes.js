export default class Scenes {
  constructor(game) {
    this.game = this;
    this.scenes = {
      menu: {
        objects: {},
        events: {}
      },
      game: {
        objects: {},
        events: {}
      },
      lose: {
        objects: {},
        events: {}
      }
    };

    this.currentScene = null;
  }

  addObject = (o, index, scene = this.currentScene) => {
    const i = index || Object.keys(scene.objects).pop() || 0;

    scene.objects[i] = [...(scene.objects[i] || []), o];
  };

  setScene = sceneName => {
    const s = this.scenes[sceneName];
    if (s) {
      this.currentScene = s;
    }
  };

  eventAll = (mouse, keyboard) => {
    Object.entries(this.currentScene.objects).forEach(a => {
      a[1].forEach(o => {
        if (typeof o.event === "function") {
          o.event(mouse, keyboard);
        }
      });
    });
  };

  updateAll = delta => {
    Object.entries(this.currentScene.objects).forEach(a => {
      a[1].forEach(o => {
        if (typeof o.update === "function") {
          o.update(delta);
        }
      });
    });
  };

  renderAll = ctx => {
    Object.entries(this.currentScene.objects).forEach(a => {
      a[1].forEach(o => {
        if (typeof o.render === "function") {
          o.render(ctx);
        }
      });
    });
  };
}
