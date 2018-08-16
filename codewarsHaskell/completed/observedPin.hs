-- https://www.codewars.com/kata/the-observed-pin/train/haskell

module PIN where

    getNeighbors :: Char -> String
    getNeighbors number
        | number == '1' = ['1', '2', '4']
        | number == '2' = ['1', '2', '3', '5']
        | number == '3' = ['2', '3', '6']
        | number == '4' = ['1', '4', '5', '7']
        | number == '5' = ['2', '4', '5', '6', '8']
        | number == '6' = ['3', '5', '6', '9']
        | number == '7' = ['4', '7', '8']
        | number == '8' = ['5', '7', '8', '9', '0']
        | number == '9' = ['6', '8', '9']
        | number == '0' = ['8', '0']
        | otherwise = []

    -- powerSet list1 list2 = map (map (x:) list1) list2
    -- powerSet [] list = [list]
    -- powerSet [x] list = map (\val -> [x, val]) list
    -- powerSet list1@(x:xs) list2 = powerSet [x] list2 ++ (powerSet xs list2)

    combiner :: String -> [String] -> [String]
    combiner digits codes = concat $ map (\code -> map (\digit -> digit:code) digits) codes


    getPINs :: String -> [String]
    getPINs observed = foldr combiner [[]] possibilities
        where possibilities = map getNeighbors observed