export type Shift = {
  id: string;
  logo: string;
  coordinates: Coordinate;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: WorkType[];
  priceWorker: number;
  bonusPriceWorker: number;
  customerFeedbacksCount: number;
  customerRating: number;
  isPromotionEnabled: boolean;
};

export type ApiResponse = {
  data: Shift[];
};

export type WorkType = {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
};

type Coordinate = {
  longitude: number;
  latitude: number;
};
