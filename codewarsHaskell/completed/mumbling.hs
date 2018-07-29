-- http://www.codewars.com/kata/5667e8f4e3f572a8f2000039/train/haskell

module Codewars.G964.Accumule where
  
  import Data.Char

  handleCases :: [Char] -> [Char]
  handleCases [] = []
  handleCases (char:str) = [toUpper char] ++ map toLower str 
  
  recur :: [Char] -> Int -> [Char]
  recur [] _ = []
  recur (x:xs) n
              | length xs == 0 = base
              | otherwise      = base ++ ['-'] ++ (recur xs $ n+1)
              where base = handleCases (replicate n x)
    -- handleCases (replicate n x) ++ ['-'] ++ (recur xs $ n+1)
  
  accum :: [Char] -> [Char]
  accum [] = []
  accum s = recur s 1

