const oneToNine = [1,2,3,4,5,6,7,8,9]

function checkRow(row){
    return row.length === 9 && oneToNine.every( num => {
        return row.includes(num);
    });
}

function makeColIntoArray( board, col ){
    return board.map( row => {
        return row[col];
    })
}

function makeBoxIntoArray(board, row, col){
    return [
        ...board[row].slice(col, col+3),
        ...board[row+1].slice(col, col+3),
        ...board[row+2].slice(col, col+3),
    ]
}

function checkSudoku(board){
    const rows = board.every( checkRow )
    const cols = oneToNine.every( (_, index) => {
        return checkRow( makeColIntoArray(board,index) )
    });
    const boxes = oneToNine.every( (_,index) => {
        const row = Math.floor(index / 3) * 3;
        const col = (index % 3) * 3;
        const box = makeBoxIntoArray(board, row, col);
        return checkRow( box );
    });
    console.log(rows)
    return rows && cols && boxes;
}

function main(){
    // const test1 = new Array(9).fill(oneToNine);
    const test1 = [ [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [2, 3, 1, 5, 6, 4, 8, 9, 7],
        [3, 1, 2, 6, 4, 5, 9, 7, 8],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [5, 6, 4, 8, 9, 7, 2, 3, 1],
        [6, 4, 5, 9, 7, 8, 3, 1, 2],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [8, 9, 7, 2, 3, 1, 5, 6, 4],
        [9, 7, 8, 3, 1, 2, 6, 4, 5] ]
      console.log(`input:`, test1, checkSudoku(test1));
}

main();
