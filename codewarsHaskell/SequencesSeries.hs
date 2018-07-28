-- http://www.codewars.com/kata/sequences-and-series/train/haskell

module Codewars.Kata.Sequences where
    
    -- getScore :: Integer -> Integer
    -- -- getScore n
    -- --     | n == 1 = 50
    -- --     | n > 1 = getScore (n-1) + n * 50
    -- --     | otherwise = 0

    
    -- getScore n = scores !! converted
    --     where scores :: [Integer]
    --           scores = 50 : [last scores + toInteger ( (length scores + 1) * 50 ) ]
    --           converted :: Int  
    --           converted = fromIntegral(n)

    getScore n = scores !! n
        where scores = map (\x -> ) repeat 50 

    -- -- getScoreRec n prev = prev + n * 50

    -- map (+50) $ take n [100, 150 ..]

-- timeout, try using dynamic programming
