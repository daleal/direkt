export class Direction {
  constructor(data) {
    const filtered = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.trim()]),
    );
    const { owner, direction, department } = filtered;

    this.owner = owner;
    this.direction = direction;
    this.department = department;
  }

  serialize() {
    return {
      owner: this.owner,
      direction: this.direction,
      department: this.department,
    };
  }

  toQueryParams() {
    const owner = `owner=${encodeURI(this.owner)}`;
    const direction = `direction=${encodeURI(this.direction)}`;
    const department = `department=${encodeURI(this.department)}`;
    return `${owner}&${direction}&${department}`;
  }

  static baseData() {
    return {
      owner: '',
      direction: '',
      department: '',
    };
  }
}
