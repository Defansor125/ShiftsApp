import {makeAutoObservable} from 'mobx';

export class UiStore {
  locationPermission: 'unknown' | 'granted' | 'denied' | 'blocked' = 'unknown';
  isPullRefreshing = false;

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }

  setPermission(state: UiStore['locationPermission']) {
    this.locationPermission = state;
  }

  setPullRefreshing(v: boolean) {
    this.isPullRefreshing = v;
  }
}
