export type WontonItem = {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  ingredients?: string[];
};

export type DipItem = {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
};

export type DrinkItem = {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
};

export type OrderBody = {
  items: number;
};

export type OrderItem = {};

export type Order = {
  id: string;
  items: OrderItem[];
  orderValue: number;
  eta: string;
  timestamp: string;
  state: string;
};

type Key = {
  key: string;
};
