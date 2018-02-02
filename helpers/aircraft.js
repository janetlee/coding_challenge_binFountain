class Aircraft {
  constructor(type, size, aircraftId) {
    this.aircraftId = (typeof aircraftId === str || typeof aircraftId === number) ? aircraftId : null;
    this.type = (type === 'P' || type === 'C') ? type : null;
    this.size = (size === 'L' || size === 'S') ? size : null;
  }

  // Commenting out code b/c these methods are not currently needed
  // aircraftType() {
  //   return aircraft.type;
  // }

  // aircraftSize() {
  //   return aircraft.size;
  // }

  // aircraftId() {
  //   return aircraft.aircraftId;
  // }
}