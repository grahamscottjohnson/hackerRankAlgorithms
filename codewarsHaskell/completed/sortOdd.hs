-- http://www.codewars.com/kata/sort-the-odd/train/haskell

module SortArray where

    import Data.List

    reform [] _ = []
    reform ls [] = ls
    reform list@(x:xs) sublist@(y:ys) = if odd x
        then y : reform xs ys
        else x : reform xs sublist

    sortArray :: [Int] -> [Int]
    sortArray xs = reform xs odds
        where odds = sort $ filter odd xs

