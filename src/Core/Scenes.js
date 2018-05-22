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

  addObject = (o, index, scene) => {
    const s = scene ? this.scenes[scene] : this.currentScene;
    const i = index || Object.keys(s.objects).pop() || 0;

    s.objects[i] = [...(s.objects[i] || []), o];
  };

  setScene = sceneName => {
    const s = this.scenes[sceneName];
    if (s) {
      this.currentScene = s;
    }
  };

  loadScene = (name, scn) => {
    this.scenes[name] = {
      objects: scn.objects,
      events: scn.events
    };
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
