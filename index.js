const {testBoards} = require("./testData.js")

  let point = [0,0];

  function makeBoxArray(box, currentRow) {
    box = box || [];
    return [...box, ...currentRow]
  };
  function findEmptySpace(board) {
    for (let row = 0; row < 9; row++){
      for (let col = 0; col < 9; col++) {
        point[0] = row;
        point[1] = col;
        if (board[row][col] === 0){
          point[0] = row;
          point[1] = col;
          return true;
        }
          
      }
    }
    return false
  }
  function doesRowContainNumber(board, rowNumber, number){
    return board[rowNumber]
      .includes(number);
  }
  function doesColContainNumber(board, colNumber, number){
    return board
      .map((row) => row[colNumber])
      .includes(number);
  }
  function doesBoxContainNumber(board, rowNumber, colNumber, number){
    const acceptableBoxStartPositions = [0, 3, 6, 6]
    const rowBoxStart = acceptableBoxStartPositions[Math.floor(rowNumber / 3)]
    const colBoxStart = acceptableBoxStartPositions[Math.floor(colNumber / 3)]
    return board
      .filter((row, index) => index >= rowBoxStart && index < rowBoxStart+ 3)
      .map((row) => row.filter((col, index) => index >= colBoxStart && index < colBoxStart+ 3))
      .reduce(makeBoxArray, [])
      .includes(number);



  }
  function isMoveAllowed(board, rowNumber, colNumber, number){
    const isUsedInRow = doesRowContainNumber(board, rowNumber, number)
    const isUsedInCol = doesColContainNumber(board, colNumber, number)
    const isUsedInBox = doesBoxContainNumber(board, rowNumber, colNumber, number)
    const test = (!isUsedInRow && !isUsedInCol && !isUsedInBox)
    return (!isUsedInRow && !isUsedInCol && !isUsedInBox)
  }
  const falseBoards = [];
  function solveBoard (board) {
    if (!findEmptySpace(board))
      return true
    const pointInTime = [...point]
    const currentRow = pointInTime[0];
    const currentCol = pointInTime[1];
    for (let number = 1; number < 10; number++){
      if(isMoveAllowed(board, currentRow, currentCol, number)){
          board[currentRow][currentCol] = number;
          test = solveBoard(board);
          if (test){
            // console.log(JSON.stringify(board))
            return board
          } else{
            board[currentRow][currentCol] = 0;
            // console.log(currentRow, currentCol)
          }
        }
      

    }
    return false
  }
const solvedBoard = solveBoard(testBoards[0])
console.log(solvedBoard)