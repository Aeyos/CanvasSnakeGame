class Keyboard {
  constructor(game) {
    this.game = game;

    window.onkeyup = this.handleKeyUp;
    window.onkeydown = this.handleKeyDown;
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

  handleKeyUp = evt => {
    if (this.outsideEvent(evt)) return;
    const key = this.createOrGetKey(evt.key);

    key.timeReleased = this.game.time;
    key.isPressed = false;
  };

  handleKeyDown = evt => {
    if (this.outsideEvent(evt)) return;
    const key = this.createOrGetKey(evt.key);

    if (key.doublePressed) {
      key.doublePressed = false;
    } else if (this.game.time - key.timeReleased < 350) {
      console.log(this.game.time - key.timeReleased);
      key.doublePressed = true;
    }

    key.timePressed = this.game.time;
    key.isPressed = true;
  };

  outsideEvent = evt => {
    if (evt.target === this.game.focusHackEl) {
      console.log("inside event keydown");
      evt.preventDefault();
      return false;
    }
    return true;
  };

  keyDown = key => {
    const k = this.createOrGetKey(key);
    if (k) {
      return k.isPressed;
    }
    return false;
  };
}

export default Keyboard;
