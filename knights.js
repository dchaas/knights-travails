let Moves = function (_space, _neighbors) {
  let space = _space;
  // neighbors is a list of spaces that the knight can move from a given space
  let neighbors = _neighbors;

  return { space, neighbors };
};

let Parents = function (_space, _parent) {
  let space = _space;
  let parent = _parent;

  return { space, parent };
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
      _moves[`${space[0]},${space[1]}`] = Moves(space, neighbors);
    }
    return _moves;
  }

  knightMoves(knight, newSpace) {
    let queue = [];
    let visited = [];
    let parents = {};
    // add the node to the queue
    if (knight === newSpace) {
      return;
    }
    queue.push(knight);
    visited.push(knight);

    while (queue.length > 0) {
      let space = queue.shift();
      //console.log(space);
      if (space[0] === newSpace[0] && space[1] === newSpace[1]) {
        // console.log("Made it");
        // console.log(parents[`${space[0]},${space[1]}`]);
        let path = [];
        let tmp = `${space[0]},${space[1]}`;
        path.push(tmp);
        while (tmp !== `${knight[0]},${knight[1]}`) {
          // console.log(tmp);
          // console.log(parents[tmp]);
          tmp = parents[tmp].parent;
          path.push(tmp);
        }
        console.log(space);
        return path.reverse();
      } else {
        let entry = `${space[0]},${space[1]}`;
        for (let neighbor of this.moves[entry].neighbors) {
          parents[`${neighbor[0]},${neighbor[1]}`] = Parents(
            `${neighbor[0]},${neighbor[1]}`,
            `${space[0]},${space[1]}`
          );
          if (!visited.includes(neighbor)) {
            queue.push(neighbor);
            visited.push(neighbor);
          }
        }
      }
    }
    return path;
  }
}

let knight = new Board(8, 8);
console.log(knight.board);
console.log(knight.moves);
console.log(knight.moves["3,3"]);
console.log(knight.knightMoves([0, 0], [4, 4]));
console.log(knight.knightMoves([3, 3], [7, 6]));
console.log(knight.knightMoves([0, 0], [7, 7]));
