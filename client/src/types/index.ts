import type { LngLat } from "ymaps3";

export type TMark = {
  id: number;
  coordinates: LngLat;
  address: string;
  containers: number;
};

export type TContainer = {
  id: number;
  volumeLiters: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  locationId: number;
};

export type TCompany = {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export interface ILocation {
  id: number;
  address: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  companyId: number;
  company: TCompany;
  containers: TContainer[];
  // "locationBuildings": [
  //     {
  //         "locationId": 1,
  //         "buildingId": 1,
  //         "building": {
  //             "id": 1,
  //             "address": "string"
  //         }
  //     }
  // ]
}
