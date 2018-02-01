class Aircraft {
  constructor(type, size) {
    this.type = type;
    this.size = size;
  }
}

Aircraft.prototype.type = (aircraft) => {
  return aircraft.type;
};

Aircraft.prototype.size = (aircraft) => {
  return aircraft.size;
};