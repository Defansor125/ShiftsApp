import {ApiResponse} from '../types/shift';
import {getApiResponse} from './api';

export async function getShiftsByCoords(lat: number, lon: number) {
  const url = `https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${lat}&longitude=${lon}`;
  const data = await getApiResponse<ApiResponse>(url);
  return data;
}
