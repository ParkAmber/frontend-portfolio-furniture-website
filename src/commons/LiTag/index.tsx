import { useAmp } from "next/amp";
import { useEffect, useState } from "react";

export default function LiItem(props: any): JSX.Element {
  const rooms = [
    "Bed room",
    "Dining room",
    "Study room",
    "Kitchen",
    "Bathroom",
  ];
  const [fadeStates, setFadeStates] = useState(["end", "", "", "", ""]);

  const handleLiClick = (index: number) => {
    props.setTab(index);
    const newFadeStates = [...fadeStates];
    newFadeStates[index] = "end";
    setFadeStates(newFadeStates);

    fadeStates.map((a, i) =>
      i !== index ? (newFadeStates[i] = "") : (newFadeStates[i] = "end")
    );
  };
  // useEffect(() => {
  //   fadeStates.map((a, i) =>
  //   i !== index ? (newFadeStates[i] = "") : (newFadeStates[i] = "end")
  // );
  // }
  // )
  return (
    <>
      {rooms.map((el, i) => (
        <li
          key={i}
          className={`start ${fadeStates[i]}`}
          onClick={() => handleLiClick(i)}>
          {" "}
          {el}
        </li>
      ))}
    </>
  );
}
