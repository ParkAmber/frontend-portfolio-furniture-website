import {
  atom,
  selector
} from "recoil";
import { getAccessToken } from "../../commons/libraries/getAccessToken";


export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const visitedPageState = atom({
  key: "visitedPageState",
  default: "/website",
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});

// Define a separate Recoil atom for the list of objects
export const objectsState = atom<any>({
  key: "objectsState",
  default: [],
});

export const objectSelector = selector<any>({
  key: "objectSelector",
  get: ({ get }) => {
    return get(objectsState);
  },
  set: ({ set }, newValue) => {
    set(objectsState, newValue);
  },
});

//
export const objectsStatePurchase = atom<any>({
  key: "objectsStatePurchase",
  default: [],
});
export const objectSelectorPurchase = selector<any>({
  key: "objectSelectorPurchase",
  get: ({ get }) => {
    return get(objectsStatePurchase);
  },
  set: ({ set }, newValue) => {
    set(objectsStatePurchase, newValue);
  },
});
