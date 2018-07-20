function spiral(n){
    //setup
    let board = new Array(n);
    const row = new Array(n);
    row.fill(0);
    board.fill(row);
    board = board.map( (thing) => thing.slice());
    //fill perimeter with 1, then indent and fill perimeter with 0, etc...
    for(let i = 0; i < Math.floor(n/2); i += 1){
        //i represents indent
        for(let j = i; j < n - i; j += 1){
            const fillValue = i % 2 === 0 ? 1 : 0;
            board[i][j] = fillValue;
            board[n-1-i][j] = fillValue;
            board[j][i] = fillValue;
            board[j][n-1-i] = fillValue;
        }
    }
    //reset the center
    if (n % 4 === 1){
        const half = (n-1)/2;
        board[half][half] = 1;
    }
    //toggle a certain diagonal
    const halfWay = Math.floor(n/2) - (n % 4 === 0 ? 1 : 0);
    for (let q = 0; q < halfWay; q+=1){
        toggle(board, q+1, q);
    }
}

function toggle(board, i, j){
    const other = board[i][j] === 0 ? 1 : 0;
    board[i][j] = other;
}
