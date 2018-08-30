//https://www.hackerrank.com/challenges/common-child/problem

'use strict';

// 'ABCD'
// 'ABDC'

//common children: ABC, ABD, AB ... A B C D

// Complete the commonChild function below.
function commonChild(s1, s2) {

}

// const commonChildrenHash = [{
//     value: 'ASDIFJAIOJDF',
//     lastIndexOfSecond: 4,
// }]

function getCommonChildren( commonChildrenHash, first, firstIndex, secondHash, secondIndex ){//second index might be redundant
// function getCommonChildren( commonChildrenHash, firstHash, first, firstIndex, secondHash, second, secondIndex ){//second index might be redundant
    //base cases
    const alreadyFoundChildren = commonChildrenHash[getKey(firstIndex, secondIndex)]
    if (alreadyFoundChildren){
        return alreadyFoundChildren
    }
    const letter = letterOfStringAt(first, firstIndex);
    // const match = getLastIndexOfLetter( secondHash, letter );
    const matches = secondHash[letter];
    if (firstIndex === 1){
        return matches.length === 0 ? null : [{
                value: letter,
                lastIndexOfSecond: matches[0],
            }]
    }
    //recurisve step
    // const previousChildren = getCommonChildren( commonChildrenHash, firstIndex - 1, second );
    const newChildren = previousChildren.map( (child) => {
        const response = findNewMatch(child, matches);
        if (response.hasMatch){
            return {
                value: letter + child.value,
                lastIndexOfSecond: response.match,
            }
        } else {
            return child;
        }
    });
    //add more stuff to new children?
}

function letterOfStringAt(str, index){
    return str.charAt(str.length - index);
}

function getKey(first, second){
    return `${first}_${second}`;
}

function hashStringByLetter(string){
    const hash = {};
    for (let index = 1; index <= string.length; index += 1){
        let flippedIndex = string.length - index
        let letter = string.charAt(flippedIndex);
        hash[letter] = hash[letter] ? hash[letter].concat([flippedIndex]) : [flippedIndex]
    }
    for (let letter in hash){
        hash[letter].reverse();
    }
    return hash;
}

function getLastIndexOfLetter(hashedString, letter, end = Infinity){
    let result = hashedString[letter][0];
    if (result == undefined) return null;
    let index = 0;
    while (result > end){
        index += 1;
        result = hashedString[letter][index];
        if (result == undefined) return null;   
    }
    return result;
}
function getIndicesOfLetter(hashedString, letter){
    return hashedString[letter];
}
// function getAllIndicesOfLetter( inStr, letter ){
//     //optimize by keeping track of this in a hash
//     const result = [];
//     for (let index = 0; index < inStr.length; index += 1){
//         if (inStr.charAt(index) === letter){
//             result.push( inStr.length - index );
//         }
//     }
//     // console.log(`result of indices for ${letter} in ${inStr}:`, result)
//     return result;
// }

console.log(commonChild('ELGGYJWKTDHLXJRBJLRYEJWVSUFZKYHOIKBGTVUTTOCGMLEXWDSXEBKRZTQUVCJNGKKRMUUBACVOEQKBFFYBUQEMYNENKYYGUZSP', 'FRVIFOVJYQLVZMFBNRUTIYFBMFFFRZVBYINXLDDSVMPWSQGJZYTKMZIPEGMVOUQBKYEWEYVOLSHCMHPAZYTENRNONTJWDANAMFRX'))

// module.exports = {
//     getAllIndicesOfLetter,
//     getCommonChildren,
//     getKey,
//     commonChild
// }
// module.exports = commonChild