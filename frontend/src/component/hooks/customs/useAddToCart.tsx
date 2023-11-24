import { Button, message, Space } from "antd";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { objectSelector, objectSelectorPurchase } from "../../stores"; // Updated import
type ObjectType = {
  id: string;
  name: string;
  price: number;
  description: string;
  url: string;
  quantity: number;
};

export const useAddToCart = () => {
  const success = () => {
    message.success("The item has been added to your cart!");
  };
  const error = () => {
    message.error(
      "It's already in your cart. You can adjust quantities in the cart."
    );
  };
  const objectList = useRecoilValue(objectSelector);
  const setObjectList = useSetRecoilState(objectSelector);

  const addObject = ({
    name,
    price,
    description,
    url,
    id,
    quantity,
  }: ObjectType) => {
    const newObject = {
      name,
      price,
      description,
      url,
      id,
      quantity,
    };

    //save to local storage
    const storedBaskets = localStorage.getItem("baskets");
    const baskets: ObjectType[] = storedBaskets
      ? JSON.parse(storedBaskets)
      : [];
  
    const temp = baskets.filter((a) => a.id === newObject.id);
    // console.log(temp.length);
    if (temp.length >= 1) {
      //   alert("it's already in your cart!!");
      error();
      return;
    }

    baskets.push(newObject);
    setObjectList((prevList: any) => [...prevList, newObject]);
    success();
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };
  return { addObject };
};

export const usePurchasedItem = () => {
  const objectList = useRecoilValue(objectSelectorPurchase);
  const setObjectList = useSetRecoilState(objectSelectorPurchase);
  const addPurchasedItem = ({
    name,
    price,
    description,
    url,
    id,
  }: ObjectType) => {
    const newObject = {
      name,
      price,
      description,
      url,
      id,
    };

    setObjectList(() => [newObject]);
  };

  return { addPurchasedItem };
};
