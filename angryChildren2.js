//https://www.hackerrank.com/challenges/angry-children-2/problem

//large file for test https://hr-testcases-us-east-1.s3.amazonaws.com/1049/input08.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1525071905&Signature=sDQ50gcq91DIyx%2F2EwNrbUJhyjM%3D&response-content-type=text%2Fplain

// recursion is too slow
// function findUnfairness(packets, start, end){
//   //base case, no unfairness in empty or singleton array
//   if (end - start < 1){
//     return 0;
//   }
//   //first part of this finds unfairness for all points connected to start and for end.
//   return (packets[end] - packets[start]) * (end - start) + findUnfairness(packets, start + 1, end - 1);
// }
let fs = require("fs");

function findUnfairness(packets, start, end){
  let result = 0;
  for (let i = 0; start + i < end - i; i += 1){
    result += (packets[end - i] - packets[start + i]) * (end - start - 2*i);
  }
  return result;
}
function findNextUnfairness(packets, start, end, prevUnfairness, middleUnfairness){ //i.e find unfairness from start + 1 to end + 1
  //issue if K is really small

  // //calculate the unfairness caused by start, then move it to start + 1
  // let Lglob = prevUnfairness - middleUnfairness - ([packets[start + 1] - packets[start]) * (end - start);
  // //I have a pic, but this moves from start + 1 to end
  // let Rglob = (packets[end] - packets[start + 1]) * (end - start) - Lglob;
  // //move to end + 1, then add back on the rest of the unfairness.
  // let nextUnfairness = Rglob + (packets[end + 1] - packets[end]) * (end - start) + middleUnfairness;
  // //put it all together with algebra
  let altNextUnfairness = (packets[end + 1] - packets[start]) * (end - start) - prevUnfairness + middleUnfairness + middleUnfairness
  //(10 - 1) * 3 - 10 + 4 + 4 = 25 Yes
  return altNextUnfairness;
}
function findLowerUnfairness(packets, start, end, prevUnfairness){ //i.e. find start + 1 to end - 1
  //issue if K is really small

  //remove unfairness causes by start and end.
  return prevUnfairness - (packets[end] - packets[start]) * (end - start);
}

function angryChildren(K, packets) {
  try{
    packets.sort( (a,b) => a-b);
    if (K === 2){
      return handle2(packets);
    }
    let first = findUnfairness(packets, 0, K-1);
    if (first === 121195812125090260){
      console.log("answer", 0, K - 1, packets[0], packets[K-1]);
    }
    let middle = findUnfairness(packets, 1, K-1);
    let minimum = first;
    let next = -400000;
    for (let i = 0; i + K < packets.length; i += 1){
      //I have a pic, but let me try to explain:
      //find next and update minimum
      next = findNextUnfairness(packets, i, i + K - 1, first, middle);
      minimum = Math.min(minimum, next);
      //find the next middle by finding next of current middle
      //we need middle's middle to do this, which is the lower of next;
      middle = findNextUnfairness(packets, i + 1, i + K - 1, middle, findLowerUnfairness(packets, i + 1, i + K, next));
      first = next;
      if (next <= 121195812125090260){
        console.log("answer", i+1, i + K, packets[i+1], packets[i+K]);
      }
    }
    return minimum;
  }
  catch(err){
    console.log(err);
    return -1;
  }
}
function handle2(packets){
  let minimum = packets[1] - packets[0];
  for (let i = 1; i + 1 < packets.length; i += 1){
    minimum = Math.min(minimum, packets[i+1] - packets[i]);
  }
  return minimum;
}
function readTestcase(){
  let result = [];
  fs.readFile("./input08.txt", (err, data) => {
    //console.log("in");
    if (err) {console.error(err);}
    //console.log(data);
    result = data.toString("utf-8").split("\n");
    //console.log(result.slice(0,5));
    console.log(processResult(result));
  });
}
function processResult(data){
  var N = data.shift();
  var K = data.shift();
  var packets = data;
  var result = angryChildren(K, packets);
  return result;
}
readTestcase();
