//https://www.algoexpert.io/questions/Max%20Path%20Sum%20In%20Binary%20Tree

function maxPathSum(tree) {
  if (tree == null) {
    return 0;
  }
  const leftMaxPathSum = maxPathSum(tree.left);
  const rightMaxPathSum = maxPathSum(tree.right);
  const leftPath = tree.left ? tree.left.path : 0;
  const rightPath = tree.right ? tree.right.path : 0;

  tree.path = Math.max(leftPath + tree.value, rightPath + tree.value, 0);

  const rootPath = tree.value + leftPath + rightPath;
  tree.maxSum = Math.max(rootPath, leftMaxPathSum, rightMaxPathSum);

  return tree.maxSum;
}

// Do not edit the line below.
exports.maxPathSum = maxPathSum;
