merge :: Ord a => [a] -> [a] -> [a]
merge [] [] = []
merge [] ls = ls
merge ls [] = ls
merge listX@(x:xs) listY@(y:ys)
    | x < y = (x : (merge xs listY))
    | x > y = (y : (merge listX ys))
    | x == y = (x : y : (merge xs ys))
    | otherwise = [] -- should throw error but im lazy

mergeSort :: Ord a => [a] -> [a]
-- split, mergeSort the splits, merge the splits
mergeSort [] = []
mergeSort [x] = [x]
mergeSort list = merge (mergeSort first) (mergeSort second)
        where (first, second) = splitAt (length list `div` 2) list



