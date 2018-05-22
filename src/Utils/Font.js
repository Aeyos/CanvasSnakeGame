class Font {
  static build = args => (`${args.variant || ""} ${args.caps || ""} ${args.weight ||
    "400"} ${args.size ? `${args.size}px` : "12px"} ${args.family || "Arial"}`);

  constructor(args) {
    this.fontString = this.constructor.build(args);
    this.textAlign = args.align || 'start';
  }


  set = ctx => {
    ctx.textAlign = this.textAlign;
    ctx.font = this.fontString;
  }
}

export default Font;
