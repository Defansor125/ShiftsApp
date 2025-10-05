import {getShiftsByCoords} from '../services/shifts';
import {Shift} from '../types/shift';
import {makeAutoObservable, runInAction} from 'mobx';

export class ShiftStore {
  shifts: Shift[] = [];
  status: 'idle' | 'loading' | 'ready' | 'error' = 'idle';
  error?: string;
  selectedId?: string;
  lastCoords?: {lat: number; lon: number};
  lastUpdatedAt?: number;

  private requestSeq = 0;

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }

  get selectedShift(): Shift | undefined {
    return this.shifts.find(s => s.id === this.selectedId);
  }

  select(id: string) {
    this.selectedId = id;
  }

  async fetchByCoords(lat: number, lon: number) {
    const myReq = ++this.requestSeq;
    this.status = 'loading';
    this.error = undefined;
    try {
      const list = (await getShiftsByCoords(lat, lon)).data;
      if (myReq !== this.requestSeq) return;

      runInAction(() => {
        this.shifts = list;
        this.status = 'ready';
        this.lastCoords = {lat, lon};
        this.lastUpdatedAt = Date.now();
      });
    } catch (e: any) {
      if (myReq !== this.requestSeq) return;
      runInAction(() => {
        this.status = 'error';
        this.error = e?.message ?? 'Unknown error';
      });
    }
  }
  async refresh() {
    if (!this.lastCoords) return;
    const {lat, lon} = this.lastCoords;
    await this.fetchByCoords(lat, lon);
  }
}
