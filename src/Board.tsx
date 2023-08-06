import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import "./Board.scss";
import { Solver } from "./Solver";
import { MyBoard } from "./MyTypes";

let numPatt = /^\d$/;
let arr: number[] = [];
for (let i = 0; i < 9; i++) arr.push(i);

const SubBlock = ({
  index,
  setBlocks,
}: {
  index: number;
  setBlocks: Dispatch<SetStateAction<MyBoard | undefined>>;
}) => {
  return (
    <div className="subBlock">
      {arr.map((_, i) => {
        return (
          <input
            key={`${index}-${i}`}
            type="text"
            pattern="^\d$"
            id={`${Math.floor(index / 3) * 3 + Math.floor(i / 3)}-${
              (index % 3) * 3 + (i % 3)
            }`}
            onChange={(e) => {
              const trg = e.target;
              let oldValue = trg.getAttribute("data-old-value");
              if (oldValue === "") oldValue = trg.value;
              const str = trg.value;
              if (!numPatt.test(str)) {
                trg.value = oldValue ?? "";
              } else
                setBlocks((oldArr) => {
                  if (!oldArr?.length) return;
                  trg.setAttribute("data-old-value", trg.value);
                  const [x, y] = trg.id
                    .split("-")
                    .map((e) => Number.parseInt(e));
                  oldArr[x][y] = Number.parseInt(trg.value);
                  return oldArr;
                });
            }}
          />
        );
      })}
    </div>
  );
};

const Board = () => {
  const [blocks, setBlocks] = useState<MyBoard>();
  const loaded = useRef(false);

  function handleSolveBoard() {
    if (!blocks) return;
    const solver = new Solver(blocks);
    const res = solver.solve();
    // console.log(solver.verifySolution());
    if (!res) window.alert("This board can't be solved!");
    else setBlocks(res);
  }

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const numArr = new Array<number[]>();
    for (let i = 0; i < 9; i++) {
      const temp = new Array(9).fill(null);
      numArr.push(temp);
    }
    setBlocks(numArr);
  });

  useEffect(() => {
    if (!blocks?.length) return;
    // console.log(blocks);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const elem = document.getElementById(`${i}-${j}`);
        if (elem && elem instanceof HTMLInputElement)
          elem.value = `${blocks[i][j] ?? ""}`;
      }
    }
  }, [blocks]);

  return (
    <>
      <div className="board">
        {arr.map((i) => (
          <SubBlock key={i} index={i} setBlocks={setBlocks} />
        ))}
      </div>
      <button onClick={handleSolveBoard}>Solve Board</button>
    </>
  );
};

export default Board;
