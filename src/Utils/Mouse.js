const MOUSE_KEYS = {
  0: "left",
  1: "middle",
  2: "right"
};

class Mouse {
  constructor(game) {
    this.game = game;

    window.onmousedown = this.handleMouseDown;
    window.onmouseup = this.handleMouseUp;
    window.onmousemove = this.handleMouseMove;
    window.oncontextmenu = this.handleContextMenu;

    this.x = 0;
    this.y = 0;
  }

  createOrGetKey = which => {
    if (!this[which]) {
      this[which] = {
        isPressed: false,
        timePressed: this.game.time,
        timeReleased: this.game.time,
        doublePressed: false
      };
    }
    return this[which];
  };

  afterHandle = () => {
    const left = this.createOrGetKey("left");
    if (left) left.clicked = false;
    const middle = this.createOrGetKey("middle");
    if (middle) middle.clicked = false;
    const right = this.createOrGetKey("right");
    if (right) right.clicked = false;
  };

  handleMouseUp = evt => {
    if (this.outsideEvent(evt)) return;
    const key = this.createOrGetKey(MOUSE_KEYS[evt.button]);

    key.timeReleased = this.game.time;
    key.isPressed = false;
    key.clicked = true;

    evt.preventDefault();
    return false;
  };

  handleMouseDown = evt => {
    if (this.outsideEvent(evt)) return;
    const key = this.createOrGetKey(MOUSE_KEYS[evt.button]);

    if (key.doublePressed) {
      key.doublePressed = false;
    } else if (this.game.time - key.timeReleased < 350) {
      console.log(this.game.time - key.timeReleased);
      key.doublePressed = true;
    }

    key.timePressed = this.game.time;
    key.isPressed = true;

    evt.preventDefault();
    return false;
  };

  handleMouseMove = evt => {
    if (this.outsideEvent(evt)) {
      this.x = -Infinity;
      this.y = -Infinity;
      return;
    }

    this.x = evt.offsetX;
    this.y = evt.offsetY;
  };

  handleContextMenu = evt => this.outsideEvent(evt);

  outsideEvent = evt => {
    if (evt.target === this.game.canvas) {
      this.game.focusHackEl.focus();
      evt.preventDefault();
      return false;
    }
    return true;
  };
}

export default Mouse;
