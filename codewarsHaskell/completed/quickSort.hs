
quicksort :: Ord a => [a] -> [a]
quicksort [] = []
-- quicksort (x:xs) = quicksort ( filter (<= x) xs ) 
--                     ++ [x] 
--                     ++ quicksort (filter (> x) xs)

quicksort (x:xs) = quicksort [n | n <- xs, n <= x]
                    ++ [x]
                    ++ quicksort [m | m <- xs, m > x]
                    
