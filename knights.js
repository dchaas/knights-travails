let Square = function (_x, _y) {
  let x = _x;
  let y = _y;

  let toString = () => {
    return `${x},${y}`;
  };

  return { x, y, toString };
};

let Position = function (_square, _neighbors, _predecessor = null) {
  let square = _square;
  // neighbors is a list of spaces that the knight can move from a given space
  let neighbors = _neighbors;
  let predecessor = _predecessor;

  // let getPredecessor = () => predecessor;
  // let setPredecessor = (pred) => {
  //   predecessor = predecessor || pred;
  // };

  return { square, neighbors, predecessor };
};

class Board {
  constructor(_rows, _cols) {
    this.rows = _rows;
    this.cols = _cols;
    this.board = this.createBoard(_rows, _cols);
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
      [-1, -2],
    ];
    for (let pair of pairs) {
      if (
        space[0] + pair[0] >= 0 &&
        space[0] + pair[0] < this.rows &&
        space[1] + pair[1] >= 0 &&
        space[1] + pair[1] < this.cols
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
    let _moves = {};
    for (let space of arr) {
      let neighbors = this.moveOptions(space);
      let square = new Square(...space);
      _moves[square.toString()] = Position(square, neighbors);
    }
    return _moves;
  }

  printPath(_path) {
    let out = "Moves were: ";
    _path.forEach((p) => (out += `-> ${p} `));
    console.log(out);
    console.log("");
  }

  knightMoves(_knight, _newSpace) {
    let queue = [];
    let visited = [];
    let knight = new Square(..._knight);
    let newSpace = new Square(..._newSpace);
    let path = [];

    queue.push(knight);
    visited.push(knight);

    while (queue.length > 0) {
      let space = queue.shift();
      //console.log(space);
      if (space.x === newSpace.x && space.y === newSpace.y) {
        let path = [];
        path.push(space.toString());
        while (!path.includes(knight.toString())) {
          //console.log(path);
          //console.log(space);
          space = this.moves[space.toString()].predecessor;
          path.push(space.toString());
        }
        console.log(
          `The knight moved from ${knight.toString()} to ${newSpace.toString()} in ${
            path.length
          } moves:`
        );
        path.reverse();
        this.printPath(path);
        return path;
      } else {
        for (let neighbor of this.moves[space.toString()].neighbors) {
          neighbor = new Square(...neighbor);
          if (!visited.includes(neighbor.toString())) {
            //console.log(neighbor);
            queue.push(neighbor);
            visited.push(neighbor.toString());
            this.moves[neighbor.toString()].predecessor = space.toString();
          }
        }
      }
    }
    return path;
  }
}

let knight = new Board(8, 8);
knight.knightMoves([0, 0], [3, 3]);
knight.knightMoves([6, 4], [5, 1]);
knight.knightMoves([0, 0], [7, 7]);
