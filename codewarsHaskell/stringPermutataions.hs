import Data.List


myDelete _ [] = []
myDelete target (x:xs) = if x == target
    then xs
    else x : (delete target xs)
    
stringPermutations :: [Char] -> [[Char]]
stringPermutations [] = [[]]
stringPermutations str =
    let uniques = nub str
    in foldl (\acc letter -> acc ++ (map (letter:) (stringPermutations . myDelete letter $ str) ) ) [] uniques

