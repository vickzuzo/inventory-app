export type Inventory = {
  id: number;
  title: string;
  purchasePrice: number;
  type: string;
  description: string;
  photo: string;
};

export interface InventoryList extends Array<Inventory> {}
