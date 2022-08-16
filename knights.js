let Moves = function (_data, _neighbors) {
  let data = _data;
  // neighbors is a list of spaces that the knight can move from a given space
  let neighbors = _neighbors;

  return { data, neighbors };
};

class Board {
  constructor(arr) {
    this.arr = arr;
    this.board = this.createBoard(8, 8);
    this.moves = this.buildMoves(this.board);
    this.knight = [0, 0]; // knights location
  }

  createBoard(rows, cols) {
    let _board = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        _board.push([r, c]);
      }
    }
    return _board;
  }

  moveOptions(space) {
    let moves = [];
    let pairs = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1 - 2],
    ];
    for (let pair of pairs) {
      if (
        space[0] + pair[0] > 0 &&
        space[0] + pair[0] < 8 &&
        space[1] + pair[1] > 0 &&
        space[1] + pair[1] < 8
      ) {
        let newx = space[0] + pair[0];
        let newy = space[1] + pair[1];
        moves.push([newx, newy]);
      }
      // convert to a set
      moves = [...new Set(moves)];
    }
    return moves;
  }

  buildMoves(arr) {
    //console.log(arr);
    let _moves = [];
    for (let space of arr) {
      let neighbors = this.moveOptions(space);
      _moves.push(Moves(space, neighbors));
    }
    return _moves;
  }

  levelOrder(fn = null, rt = this.root) {
    let queue = [];
    let arrOut = [];
    // add the node to the queue
    if (rt === null) {
      return;
    }
    queue.push(rt);
    while (queue.length > 0) {
      let node = queue.shift();
      if (fn !== null) {
        fn(node.data);
      } else {
        arrOut.push(node.data);
      }
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    if (fn === null) {
      return arrOut;
    }
  }
}

let knight = new Board();
console.log(knight.board);
console.log(knight.moves);
