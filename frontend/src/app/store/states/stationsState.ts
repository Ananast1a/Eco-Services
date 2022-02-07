import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import Station from 'src/shared/station';
import { SetFilteredStations, SetStations } from '../actions/actions';

export interface StationsStateModel {
  stations: Array<Station>;
  filtered: Array<Station>
}

export const initialState: StationsStateModel = {
  stations: [],
  filtered: []
}

@State<StationsStateModel>({
  name: 'stations',
  defaults: initialState
})

@Injectable()
export class StationsState {

    @Action(SetStations)
    setStations(ctx: StateContext<StationsStateModel>, action: SetStations) {
      ctx.patchState({stations: action.stations, filtered:action.stations});
    }

    @Action(SetFilteredStations)
    SetFilteredStations(ctx: StateContext<StationsStateModel>, action: SetFilteredStations) {
      ctx.patchState({filtered: action.filtered});
    }

}