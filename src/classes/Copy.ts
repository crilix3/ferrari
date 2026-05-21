const Copy = class {
  static _element: HTMLTextAreaElement | null = null;

  value: string = "";

  init(value: string) {
    if (typeof value === "string") this.value = value;
    return this;
  }

  static create() {
    if (!this._element) {
      const elem = document.createElement("textarea");
      elem.style.position = "fixed";
      elem.style.top = "-10000px";
      elem.style.left = "-10000px";
      elem.style.width = "10px";
      elem.style.height = "10px";
      elem.style.zIndex = "-999";

      document.body.appendChild(elem);

      this._element = elem;
    }
  }

  copy(value: string) {
    Copy.create();
    this.init(value);
    if (!Copy._element) return;
    Copy._element.value = this.value;
    Copy._element.focus();
    Copy._element.select();

    document.execCommand("copy");

    Copy._element.blur();
  }
};

export default Copy;
