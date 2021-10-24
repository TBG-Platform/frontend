export class Vector {
  constructor(public x = 0, public y = 0) {}

  public add(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  public sub(vector: Vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  public hasNegativeValues() {
    return this.x < 0 || this.y < 0;
  }

  public print(msg = '') {
    console.log(msg + `(${this.x}, ${this.y})`);
  }
}
