import Data.Char

stringPermutations :: String -> [String]
stringPermutations str = 

    -- [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16...] 
-- => ["","","fizz","","buzz","fizz","","","fizz","buzz","","fizz","","","fizzbuzz"]

fizzbuzz :: Int -> [String]
fizzbuzz n = take n $ map convertToFizz [1..]

convertToFizz :: Int -> String
convertToFizz n
    | n `mod` 15 == 0 = "fizzbuzz"
    | n `mod` 3 == 0 = "fizz"
    | n `mod` 5 == 0 = "buzz"
    | otherwise = ""
