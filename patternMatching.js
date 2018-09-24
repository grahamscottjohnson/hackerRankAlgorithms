process.stdin.resume();
process.stdin.setEncoding("ascii");
var input = "";
process.stdin.on("data", function (chunk) {
    input += chunk;
});
process.stdin.on("end", function () {
    // now we can read/parse input
    
});

/*
## 1. Given a string input and a set of words find all the words contained in the input.
 
```
Example:
Input: ilikesamsungmobile
Words: ["mobile", "samsung", "sam", "sung", "man", "mango",  "icecream", "and", "go", "i", "like", "ice", "cream"]
Output: [ 'samsung', 'sam', 'sung', 'i', 'like', "mobile" ]
```
*/

function matchWords(input, words){
    //for each word, traverse input and try to match letter by letter the word to that part of the string
    return words.filter( word => {
        return input.indexOf(word) !== -1
    })
}

const wordToMatch = 'ilikesamsungmobile';
const words = ["mobile", "samsung", "sam", "sung", "man", "mango",  "icecream", "and", "go", "i", "like", "ice", "cream"];

console.log( matchWords(wordToMatch, words));

/*
## 2. Same as *1.* but you can only pass once through any part of the input.
 
```
Example:
Input: ilikesamsungmobile
Words: ["mobile", "samsung", "sam", "sung", "man", "mango",  "icecream", "and", "go", "i", "like", "ice", "cream"]
Output: [ 'i', 'like', 'sam', 'sung' ,’mobile’]
```
*/

function traverseWord(input, words){
    //matched letter and try to match it with something from words
    let currentIndex = 0;
    //if it matches some words, go to next letter, and try to continue to match
        //order words
        //rename this
    const wordsThatMightMatch = []
    const output = []
    
    //make startsWith
    
    
    for (let currentIndex = 0; currentIndex < input.length; currentIndex += 1){
        let currentLetter = input.charAt(currentIndex)
        wordsThatMightMatch = checkMatch(wordsThatMightMatch, currentLetter)
        
        words.forEach( word => {
            if (startsWith(word, currentLetter)){
                let wordInformation = {
                    word,
                    currentMatch: 0,
                }
                wordsThatMightMatch.push(wordInformation)
            }
        })
        
    }
    
})
        
        
    // words.forEach(word => {
    //     for (let i = 0; i < word.length; i += 1){
    //         let currentLetter = input.charAt(currentIndex + i)
    //         if (word.getCharAt(i) !== currentLetter){
    //             break;
    //         }
            
    //     }
        
    //     //break when find
    // })
    
    //if no more letters to match in input -> output
    //if no matches, move on to the next letter
}

function checkMatch(wordsThatMightMatch, currentLetter){
    return wordsThatMightMatch.filter( wordInformation => {
            if (wordInfromation.currentMatch === wordInformation.word.length - 1){
                output.push(wordInformation.word)
                return false;
            } else if (wordInformation.word.charAt(wordInfromation.currentMatch) === currentLetter){
                wordInformation.currentMatch += 1;
                return true;
            } else {
                return false;
            }
        }
}

mobile


