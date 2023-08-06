import { MyBoard } from "./MyTypes";

export class Solver {
  board: MyBoard;
  constructor(board: MyBoard) {
    this.board = [...board];
  }

  // *     0-0  0-1  0-2		0-3  0-4  0-5		0-6  0-7  0-8
  // *     1-0  1-1  1-2		1-3  1-4  1-5		1-6  1-7  1-8
  // *     2-0  2-1  2-2		2-3  2-4  2-5		2-6  2-7  2-8

  // *     3-0  3-1  3-2		3-3  3-4  3-5		3-6  3-7  3-8
  // *     4-0  4-1  4-2		4-3  4-4  4-5		4-6  4-7  4-8
  // *     5-0  5-1  5-2		5-3  5-4  5-5		5-6  5-7  5-8

  // *     6-0  6-1  6-2		6-3  6-4  6-5		6-6  6-7  6-8
  // *     7-0  7-1  7-2		7-3  7-4  7-5		7-6  7-7  7-8
  // *     8-0  8-1  8-2		8-3  8-4  8-5		8-6  8-7  8-8

  isValid(i: number, j: number, val: number): boolean {
    if (i < 0 || i > 8 || j < 0 || j > 8 || val < 1 || val > 9) return false;
    for (let k = 0; k < this.board.length; k++)
      if (this.board[i][k] === val) return false;
    for (let k = 0; k < this.board.length; k++)
      if (this.board[k][j] === val) return false;
    let newI = Math.floor(i / 3) * 3,
      newJ = Math.floor(j / 3) * 3;
    for (let k = newI; k < newI + 3; k++)
      for (let l = newJ; l < newJ + 3; l++)
        if (this.board[k][l] === val) return false;
    return true;
  }

  isAvaliable(i: number, j: number): boolean {
    return this.board[i][j] === null;
  }

  // verifySolution(): boolean {
  //   if (!this.isFull()) return false;
  //   let flag = true;
  //   this.board.forEach((subArr, row) => {
  //     subArr.forEach((elem, col) => {
  //       if (!elem || !this.isValid(row, col, elem)) {
  //         flag = false;
  //         console.log(row, col, elem, );
  //       }
  //     });
  //   });

  //   return flag;
  // }

  isFull(): boolean {
    for (const row of this.board)
      for (const elem of row) if (elem === null) return false;
    return true;
  }

  put(i: number, j: number, val: number): void {
    this.board[i][j] = val;
  }

  remove(i: number, j: number): void {
    this.board[i][j] = null;
  }

  solve(): MyBoard | false {
    if (this.isFull()) return this.board;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        for (let val = 1; val < 10; val++) {
          if (this.isAvaliable(i, j) && this.isValid(i, j, val)) {
            this.put(i, j, val);
            const res = this.solve();
            if (res === false) this.remove(i, j);
            else return this.board;
          }
        }
      }
    }
    console.log(JSON.stringify(this.board));
    return false;
  }
}
