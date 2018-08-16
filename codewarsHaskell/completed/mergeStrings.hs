--https://www.codewars.com/kata/merged-string-checker/train/haskell

module Codewars.Exercise.MergeChecker where

    isMerge :: String -> String -> String -> Bool
    isMerge [] [] [] = True
    isMerge [] a b = False
    isMerge s [] b = s == b
    isMerge s a [] = s == a
    isMerge input@(s:ss) part1@(x:xs) part2@(y:ys) = 
        let match1
                | s == x = isMerge ss xs part2
                | otherwise = False
            match2
                | s == y = isMerge ss part1 ys
                | otherwise = False
        in match1 || match2