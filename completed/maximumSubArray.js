//https://www.hackerrank.com/challenges/maxsubarray/problem

//fails on big cases, works on little cases. Problem with recursion callstack size?

function maxSubarray (arr){
	//base case 1
	if (arr === []){
		return 0;
	}
	let sumOfPositives = 0;
	let blockSum = 0;
	let champion = 0;
	let max = arr[0];
	for (let i = 0; i < arr.length; i += 1){
		if (arr[i] > max){
			max = arr[i];
		}
		//check if postiive to contribute towards max subsequence
		if (arr[i] > 0){
			sumOfPositives += arr[i];
		}
		//combine this element with block
		let newSum = blockSum + arr[i];
		//block is not contributing anymore, cut it off
		if (newSum <= 0){
			blockSum = 0;
		}
		else{
			blockSum = newSum;
			if (blockSum > champion){
				champion = blockSum;
			}
		}
	}
	champion = champion || max;
	sumOfPositives = sumOfPositives || max;
	//print outputs
	return [champion, sumOfPositives];
}
//
// function maxSubarrayOld (arr){
// 	let sumOfPositives = 0;
// 	let blockIndex = 0;
// 	let blockArray = [];
// 	arr.forEach( (value, index) => {
// 		if (value > 0){
// 			sumOfPositives += value;
// 		}
// 		if (value === 0){}
// 		else if (blockArray === []){
// 			blockArray.push(value);
// 		}
// 		else if (value * blockArray[blockIndex] > 0){
// 			blockArray[blockIndex] += value;
// 		}
// 		else{
// 			blockArray.push(value);
// 			blockIndex += 1;
// 		}
// 	});
// 	//print outputs
// 	return [combineBlocks(blockArray, blockArray[0]), sumOfPositives];
// }
// function combineBlocks(blockArray, champion){
// 	//base case 1
// 	if (blockArray === []){
// 		return champion || 0;
// 	}
// 	//first element not valid (does contribute towards a max array)
// 	if (blockArray[0] <= 0){
// 		blockArray.shift();
// 		return combineBlocks(blockArray, champion);
// 	}
// 	if (blockArray[1] === undefined){
// 		return Math.max(champion, blockArray[0]);
// 	}
// 	//combine the blocks
// 	let combined = blockArray[0] + blockArray[1];
// 	if (combined <= 0){ //not worth it to come back here
// 		blockArray.shift();
// 		return combineBlocks(blockArray, champion)
// 	}
// 	else{
// 		if (combined > champion){
// 			champion = combined;
// 		}
// 		blockArray.splice(0, 2, combined);
// 		return combineBlocks(blockArray, champion);
// 	}
// }
