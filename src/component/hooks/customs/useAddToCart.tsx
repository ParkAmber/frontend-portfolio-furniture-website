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
    //1.기존 장바구니 가져오기
    const storedBaskets = localStorage.getItem("baskets");
    const baskets: ObjectType[] = storedBaskets
      ? JSON.parse(storedBaskets)
      : [];
    // console.log(baskets);
    //2. 이미 담겨있는 건지 확인하기
    const temp = baskets.filter((a) => a.id === newObject.id);
    // console.log(temp.length);
    if (temp.length >= 1) {
      //   alert("it's already in your cart!!");
      error();
      return;
    }
    //3. 내가 클릭한거 기존 장바구니에 추가하기
    baskets.push(newObject);
    setObjectList((prevList: any) => [...prevList, newObject]);

    success();
    // alert("The item has been added to your cart.");

    //4. 추가된 장바구니로 바꿔주기
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };
  // console.log(objectList);

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

    // alert("The item has been added to your cart.");
  };

  return { addPurchasedItem };
};
