//http://www.codewars.com/kata/shortest-knight-path/train/javascript

function knight(start, finish){
    //setup
    start = convertInputToData(start);
    finish = convertInputToData(finish)
    return knightRecursion({}, start, finish, 0, []);
}

function knightRecursion(hash, start, [x, y], moves, queue){
    const board = [1,2,3,4,5,6,7,8];
    const valueInHash = get(hash, x, y);
    if (board.includes(x) && board.includes(y) && valueInHash == undefined){
        set(hash, x, y, moves)
        if (start[0] === x && start[1] === y){
            //you found it!
            return moves;
        }
        //calculate next moves a knight could make
        for (let horizontal = -2; horizontal <= 2; horizontal += 1){
            if (horizontal !== 0){
                let vertical = 3 - Math.abs(horizontal);
                //store recursive calls in a queue so that you do them in the right order
                queue.push( () => {return knightRecursion(hash, start, [x + horizontal, y + vertical], moves + 1, queue)} );
                queue.push( () => {return knightRecursion(hash, start, [x + horizontal, y - vertical], moves + 1, queue)} );
            }
        }
    }
    if(queue.length === 0){
        throw Error ('exhausted search, but did not find start: ' + start.toString());
    }
    //run the next search
    const nextSearch = queue.shift();
    return nextSearch();
}

function set(hash, horizontal, vertical, value){
    hash[`${horizontal}_${vertical}`] = value;
}
function get(hash, horizontal, vertical){
    return hash[`${horizontal}_${vertical}`]
}

function convertInputToKey(input){
    const a = input.charCodeAt(0);
    return `${a - 96}_${+input.charAt(1)}`
}

function convertInputToData(input){
    const a = input.charCodeAt(0);
    return [a - 96, +input.charAt(1)]
}

//sloppy. Maybe could have built a class that has the hash, queue, and goal properties with the set and get methods
//would be more clear, will try that approach next time.
