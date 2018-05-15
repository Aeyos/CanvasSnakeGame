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

    scene.objects[i] = [...scene.objects[i] || [], o];
  }

  setScene = sceneName => {
    const s = this.scenes[sceneName];
    if (s) {
      this.currentScene = s;
    }
  };

  updateAll = delta => {
    Object.entries(this.currentScene.objects).forEach(a => {
      a[1].forEach(o => {
        o.update(delta);
      });
    });
  };

  renderAll = ctx => {
    Object.entries(this.currentScene.objects).forEach(a => {
      a[1].forEach(o => {
        o.render(ctx);
      });
    });
  };
}
