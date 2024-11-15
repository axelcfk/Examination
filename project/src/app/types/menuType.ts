export const enum OrderType {
  WONTON = "wonton",
  DIP = "dip",
  DRINK = "drink",
}

type BaseOrderItem = {
  id: number;
  type: OrderType;
  name: string;
  description: string;
  price: number;
};

type WontonSpecific = {
  type: OrderType.WONTON;
  ingredients?: string[];
};

type DipSpecific = {
  type: OrderType.DIP;
};

type DrinkSpecific = {
  type: OrderType.DRINK;
};

export type Wonton = BaseOrderItem & WontonSpecific;
export type Dip = BaseOrderItem & DipSpecific;
export type Drink = BaseOrderItem & DrinkSpecific;

export type OrderBody = {
  items: number;
};

export type Order = {
  id: string;
  items: (Wonton | Dip | Drink)[];
  orderValue: number;
  eta: string;
  timestamp: string;
  state: string;
};

type Key = {
  key: string;
};

export type MenuItem = Wonton | Dip | Drink;
