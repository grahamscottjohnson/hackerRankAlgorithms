-- 16 => 
-- [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] 
-- ["","","fizz","","buzz","fizz","","","fizz","buzz","","fizz","","","fizzbuzz",""]

fizzbuzz :: Int -> [String]
fizzbuzz num = map convertToFizzbuzz list
    where list = take num [1 ..]

convertToFizzbuzz :: Int -> String
convertToFizzbuzz num
    | num `mod` 15 == 0 = "fizzbuzz"
    | num `mod` 5 == 0 = "buzz"
    | num `mod` 3 == 0 = "fizz"
    | otherwise = ""
