import {ShiftStore} from './ShiftStore';
import {UiStore} from './UiStore';

export class RootStore {
  shift = new ShiftStore();
  ui = new UiStore();
}

export const rootStore = new RootStore();
