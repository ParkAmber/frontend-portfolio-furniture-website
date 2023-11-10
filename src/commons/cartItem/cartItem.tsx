import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ObjectType } from "../localStorage.types";
import { MouseEvent } from "react";
interface IPropsCartItem {
  data: ObjectType;
  baskets: ObjectType[];
  setBaskets: Dispatch<SetStateAction<ObjectType[]>>;
  onClickDelete: (e: MouseEvent<HTMLParagraphElement>) => void;
}

export default function CartItem(props: IPropsCartItem) {
  // const [quantity, setQuantity] = useState(1);
  const [quantity, setQuantity] = useState(() => {
    const storedQuantity = localStorage.getItem("quantity");
    return storedQuantity ? Number(storedQuantity) : 1;
  });
  // useEffect(() => {
  //   localStorage.setItem("quantity", quantity.toString());
  // }, [quantity]);

  // console.log(props.baskets);
  useEffect(() => {
    localStorage.setItem("baskets", JSON.stringify(props.baskets));
  }, [props.baskets]);
  // const onClickCountDownState = useCallback(() => {
  //   setQuantity((prev) => {
  //     // Prevent quantity from going below 0
  //     if (prev === 1) {
  //       return 1;
  //     } else {
  //       return prev - 1;
  //     }
  //   });
  // }, []);
  const onClickCountDownState = (itemId: string) => {
    props.setBaskets((prevBaskets) =>
      prevBaskets.map((item) =>
        item.id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              // price: Number(props.data.price) * Number(item.quantity - 1),
            }
          : item
      )
    );
    // console.log(newBaskets);
    // localStorage.setItem("baskets", JSON.stringify(newBaskets));
  };
  const onClickCountUpState = (itemId: string) => {
    props.setBaskets((prevBaskets) =>
      prevBaskets.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
              // price: Number(props.data.price) * Number(item.quantity + 1),
            }
          : item
      )
    );
  };
  // let arrayIndex;
  // useEffect(() => {
  //   console.log(props.baskets);
  // }, [arrayIndex]);
  // const onClickDelete = (e: MouseEvent<HTMLParagraphElement>) => {
  //   // const filteredBaskets = props.baskets.filter(
  //   //   (el) => el.id === e.currentTarget.id
  //   // );
  //   // console.log(filteredBaskets);
  //   // const arrayIndex = props.baskets.findIndex(
  //   //   (aaa) => aaa.id === e.currentTarget.id
  //   // );
  //   // props.baskets.splice(arrayIndex, 1);
  //   // console.log(arrayIndex);
  //   const updatedBaskets = props.baskets.filter(
  //     (el) => el.id !== e.currentTarget.id
  //   );
  //   console.log(updatedBaskets);
  // };
  // console.log(props.data.url.split("png"));
  return (
    <div className='cart-item' id={props.data.id}>
      <div className='cart-item-preview-img'>
        <img
          src={`https://storage.cloud.google.com/webportfolio-backend-storage/${props.data.url}`}
        />
      </div>
      <div>
        {" "}
        <p>{props.data.name}</p>
        <p className='text-gray'>category: {props.data.url.split(".")[0]}</p>
      </div>
      <div className='quantity-count'>
        <p>
          <button onClick={() => onClickCountDownState(props.data.id)}>
            &#8722;
          </button>
        </p>
        <p>{props.data.quantity}</p>
        <p>
          <button
            onClick={() => onClickCountUpState(props.data.id)}
            className='plus-btn'>
            &#43;
          </button>
        </p>
      </div>
      <div>
        <p>$ {props.data.price * props.data.quantity}</p>
      </div>
      <div>
        <p
          style={{ cursor: "pointer" }}
          id={props.data.id}
          onClick={props.onClickDelete}
          className='text-gray'>
          &#10005;
        </p>
      </div>
    </div>
  );
}
