export class Vector {
  constructor(public x = 0, public y = 0) {}

  public sub(vector: Vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  public print() {
    console.log(`(${this.x}, ${this.y})`);
  }
}
