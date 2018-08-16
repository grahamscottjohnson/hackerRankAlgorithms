--https://www.codewars.com/kata/last-digit-of-a-huge-number


module LastDigit (lastDigit) where
    import Data.Char

    lastDigitNum val = digitToInt . last . show $ val
    last3DigitNum val = digitToInt . last3 . show $ val
        where last3 = reverse . take 3 . reverse

    lastDigit :: [Integer] -> Integer 
    lastDigit as = fromIntegral ( lastDigitNum (foldr accumFunc 1 as) )
        where accumFunc modVal val1 val2 = val1 ^ val2 `mod` modVal

    last3Digits [x] = fromIntegral ( last3DigitNum x )
    last3Digits (x:xs) = (last3DigitsNum x) ^ (last3Digits xs `mod` modVal)
        where modVal = 
    -- lastDigit2 num1 num2 = 

    -- findMod as = 


    -- lastDigitMod [x] modVal = x `mod` modVal
    -- lastDigitMod (x:xs) modVal = 
    --     let
    --     in ( x ^ lastDigitMod xs ) `mod` modVal