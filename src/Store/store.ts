import { atom, PrimitiveAtom } from "jotai";
import { Inventory } from "../interfaces";

export type Todo = {
  title: string;
  completed: boolean;
};

export const inventoriesAtomsAtom = atom<PrimitiveAtom<Inventory>[]>([]);
export const todoAtomsAtom = atom<PrimitiveAtom<Todo>[]>([]);
export const serializeAtom = atom<
  null,
  | { type: "serialize"; callback: (value: string) => void }
  | { type: "deserialize"; value: string }
>(null, (get, set, action) => {
  if (action.type === "serialize") {
    const obj = {
      inventories: get(inventoriesAtomsAtom).map(get),
    };
    action.callback(JSON.stringify(obj));
  } else if (action.type === "deserialize") {
    const obj = JSON.parse(action.value);
    // needs error handling and type checking
    set(
      inventoriesAtomsAtom,
      obj.inventories.map((inventory: Inventory) => atom(inventory))
    );
  }
});
