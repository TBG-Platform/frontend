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

  public print(msg = '') {
    console.log(msg + `(${this.x}, ${this.y})`);
  }
}
