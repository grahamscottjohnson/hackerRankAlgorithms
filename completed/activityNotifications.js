//https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the activityNotifications function below.
class BST{
    constructor( inKey ){
        this.key = inKey
        this.left = null;
        this.right = null;
        this.size = 1;
        this.height = 1;
    }

    insert( inValue ){
        if ( inValue < this.key ){
            if (this.left){
                this.left.insert( inValue );
            } else {
                this.left = new BST( inValue );
            }
        } else if (this.right){
            this.right.insert( inValue );            
        } else {
            this.right = new BST( inValue );
        }
        this.balance();
        this.updateProps();
    }

    updateProps(){
        let leftSize = 0;
        let leftHeight = 0;
        let rightSize = 0;
        let rightHeight = 0;
        if (this.left){
            leftSize = this.left.size;
            leftHeight = this.left.height;
        } 
        if (this.right){
            rightSize = this.right.size;
            rightHeight = this.right.height;
        }
        this.size = 1 + leftSize + rightSize;
        this.height = 1 + Math.max(leftHeight, rightHeight);
    }

    delete( inValue ){
        if ( this.isLeaf() && this.key === inValue ){
            throw Error('do not delete this');
        }
        else if (inValue < this.key && this.left){
            if (this.left.key === inValue && this.left.isLeaf()){
                this.left = null;
            } else {
                this.left.delete( inValue );
            }
        } else if (inValue > this.key && this.right){
            if (this.right.key === inValue && this.right.isLeaf()){
                this.right = null;
            } else {
                this.right.delete( inValue );
            }
        } else if (inValue === this.key){
            this.deleteSelf();
        } else {
            // console.log('could not find and delete ' + inValue);
        }
        this.updateProps();
    }
    
    deleteSelf(){
        if (this.right === null){
            //become left
            this.key = this.left.key;
            this.size = this.left.size;
            this.height = this.left.height;
            this.right = this.left.right;
            this.left = this.left.left;
        } else {
            let currentNode = this.right;
            if (currentNode.left === null){
                this.key = this.right.key;
                this.right = this.right.right;
            } else {
                this.goReplace( currentNode, this );
            }
        }
    }

    isLeaf(){
        return !this.left && !this.right
    }

    goReplace( currentNode, head ){
        if (currentNode.left.left !== null){
            currentNode.goReplace(currentNode.left, head);
        } else {
            head.key = currentNode.left.key;
            currentNode.left = currentNode.left.right;
        }
        currentNode.updateProps();
    }

    balance(){
        const formerHead = new BST(this.key);
        formerHead.left = this.left;
        formerHead.right = this.right;
        if ( this.leftTooBig() ){
            //copy left into head
            this.key = formerHead.left.key;
            this.left = formerHead.left.left;
            this.right = formerHead.left.right;
            //make right be former head
            formerHead.left = this.right;
            this.right = formerHead;
            formerHead.updateProps();
            this.updateProps();
        } else if ( this.rightTooBig() ){
            //copy right into head
            this.key = formerHead.right.key;
            this.left = formerHead.right.left;
            this.right = formerHead.right.right;
            //make right be former head
            formerHead.right = this.left;
            this.left = formerHead;
            formerHead.updateProps();
            this.updateProps();
        }
    }

    leftTooBig(){
        const leftHeight = this.left ? this.left.height : 0;
        const rightHeight = this.right ? this.right.height : 0;
        return leftHeight > rightHeight + 1;
    }
    rightTooBig(){
        const leftHeight = this.left ? this.left.height : 0;
        const rightHeight = this.right ? this.right.height : 0;
        return rightHeight > leftHeight + 1;
    }
    getMedian(formerLeft, formerRight){
        let rightSize = (formerRight || 0) + (this.right ? this.right.size : 0);
        let leftSize = (formerLeft || 0) + (this.left ? this.left.size : 0);
        if ( leftSize === rightSize){
            return this.key;
        } else if ( leftSize > rightSize + 1){
            return this.left.getMedian( formerLeft, rightSize + 1 );
        } else if ( rightSize > leftSize + 1 ){
            return this.right.getMedian( leftSize + 1, formerRight );
        } else if ( leftSize === rightSize + 1){
            return ( this.key + this.nextSmallest() ) / 2;
        } else {
            return ( this.key + this.nextBiggest() ) / 2;
        }
    }
    nextSmallest(){
        if ( this.left ){
            let currentNode = this.left;
            while (currentNode.right !== null){
                currentNode = currentNode.right;
            }
            return currentNode.key;
        }
        console.log('has no next smallest');
        return null;
    }
    nextBiggest(){
        if ( this.right ){
            let currentNode = this.right;
            while (currentNode.left !== null){
                currentNode = currentNode.left;
            }
            return currentNode.key;
        }
        console.log('has no next biggest');
        return null;
    }
}

function generateMedians( expenditures, lookRange ){
    // lookRange = lookRange || expenditures.length - 1;
    const result = [];
    const inspectedActivity = new BST(expenditures[0]);
    for (let i = 1; i < lookRange; i += 1){
        inspectedActivity.insert( expenditures[i] );
    }
    // console.log(inspectedActivity);
    console.log( `first tree has median:`, inspectedActivity.getMedian());
    result.push( inspectedActivity.getMedian() );
    for (let i = lookRange; i < expenditures.length; i += 1){
        inspectedActivity.insert( expenditures[i] );
        inspectedActivity.delete( expenditures[i - lookRange] );
        result.push( inspectedActivity.getMedian() );
        if (i === 10000){
            console.log(`tried to delete ${expenditures[i - lookRange]} at ${i - lookRange}, 
            i and look range are ${i}, ${lookRange}, result is`, result)
        }
    }
    console.log(`first medians are:`, result.slice(0,10));
    return result;
}

function activityNotifications(expenditure, d) {
    const medians = generateMedians( expenditure, d );
    let count = 0;
    medians.forEach( (median, index) => {
        const lastMedian = medians.length - 1;
        if ( index !== lastMedian && expenditure[d + index] >= 2 * median ){
            count += 1;
        }
    });
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const expenditure = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    let result = activityNotifications(expenditure, d);

    ws.write(result + "\n");

    ws.end();
}
