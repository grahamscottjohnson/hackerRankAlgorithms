module Tribonacci where

    tribonacci :: Num a => (a, a, a) -> Int -> [a]
    tribonacci (a, b, c) n = take n tribs
        where tribs = a : b : c : tribs --dunno

    getNextTribs list = 