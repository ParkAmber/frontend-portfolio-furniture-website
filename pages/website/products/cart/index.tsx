import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ObjectType } from "../../../../src/commons/localStorage.types";
import { objectSelector } from "../../../../src/component/stores";
import CartItem from "../../../../src/commons/cartItem/cartItem";
import { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMoveToPage } from "../../../../src/component/hooks/customs/useMoveToPage";

export default function CartPage() {
  const objectList = useRecoilValue(objectSelector);
  const setObjectList = useSetRecoilState(objectSelector);
  // console.log(objectList);
  const [baskets, setBaskets] = useState<ObjectType[]>([]);
  const { onClickMoveToPage } = useMoveToPage();

  const [totalAmount, setTotalAmount] = useState<number>();
  useEffect(() => {
    const storedBaskets = localStorage.getItem("baskets");
    if (storedBaskets) {
      setBaskets(JSON.parse(storedBaskets));
      // JSON.parse(storedBaskets)
    }
  }, []);
  useEffect(() => {
    setTotalAmount(
      baskets.reduce((total, el) => total + el.price * el.quantity, 0)
    );
    localStorage.setItem(
      "total",
      baskets
        .reduce((total, el) => total + el.price * el.quantity, 0)
        .toString()
    );
  }, [baskets]);
  // console.log(
  //   baskets,
  //   baskets.reduce((total, el) => total + el.price * el.quantity, 0)
  // );

  const onClickDelete = (e: MouseEvent<HTMLParagraphElement>) => {
    const updatedBaskets = baskets.filter((el) => el.id !== e.currentTarget.id);
    // console.log(updatedBaskets);

    localStorage.setItem("baskets", JSON.stringify(updatedBaskets));
    // console.log(updatedBaskets);
    setBaskets([...updatedBaskets]);
    // setId(e.currentTarget.id);
  };

  return (
    <>
      <div>
        <div className='cart-category'>
          <p></p>
          <p>PRODUCT</p>
          <p>QUANTITY</p>
          <p>PRICE</p>
          <p></p>
        </div>
        {baskets.length > 0 ? (
          <div className='cart-category-item-con'>
            {baskets.map((el, i) => (
              <div key={uuidv4()} className='cart-category-item'>
                <CartItem
                  data={el}
                  baskets={baskets}
                  onClickDelete={onClickDelete}
                  setBaskets={setBaskets}
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div>Your Cart is Empty</div>
          </>
        )}
        <div className='total-amount-con'>
          <div className='total-amount'>
            <p> TOTAL:</p>
            <p>
              ${" "}
              <span>
                {/* {baskets.reduce(
                  (total, el) => total + el.price * el.quantity,
                  0
                )} */}
                {totalAmount}
              </span>
            </p>
          </div>
          <div>
            <button
              onClick={onClickMoveToPage("/website/products/totalPayment")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
