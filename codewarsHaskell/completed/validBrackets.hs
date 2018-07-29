-- https://www.codewars.com/kata/5277c8a221e209d3f6000b56/train/haskell

module Codewars.Kata.Braces where


    checkStack str@(brace:rest) stack = (valid, needsDelete)
        where needsDelete = if (null stack)
                then False
                else (last stack, brace) `elem` [('(',')'),('{','}'),('[',']')]
              valid = (brace `elem` "({[") || needsDelete
               
    validBraces :: String -> Bool
    validBraces xs = validBracesRecursion xs []

    validBracesRecursion :: String -> String -> Bool
    validBracesRecursion [] [] = True
    validBracesRecursion [] str = False
    validBracesRecursion string@(x:xs) stack 
        | not valid = False
        | needsDelete = validBracesRecursion xs (init stack)
        | otherwise = validBracesRecursion xs (stack ++ [x])
            where (valid, needsDelete) = checkStack string stack
