import Station from "src/shared/station";

export class SetStations {
  static readonly type = '[Stations API] SetStations';
  constructor(public stations: Array<Station>) {}
}

export class SetFilteredStations {
  static readonly type = '[Stations API] SetFilteredStations';
  constructor(public filtered: Array<Station>) {}
}
