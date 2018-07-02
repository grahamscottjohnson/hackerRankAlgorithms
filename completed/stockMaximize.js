//https://www.hackerrank.com/challenges/stockmax/problem
//easy
function stockmax(prices) {
  let sum = 0;
  let storage = {
    max: 0
  };
  for(i = prices.length - 1; i >= 0; i -= 1){
    if (prices[i] <= storage.max){
      sum += storage.max - prices[i];
    }
    else{
      storage.max = prices[i];
    }
  }
  return sum;
}
