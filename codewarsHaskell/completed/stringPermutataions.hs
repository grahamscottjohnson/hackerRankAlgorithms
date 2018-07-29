import Data.List
    
stringPermutations :: [Char] -> [[Char]]
stringPermutations [] = [[]]
stringPermutations str =
    --filter string into unique letters: https://www.haskell.org/hoogle/?hoogle=nub
    let uniques = nub str
        -- find all permutatations where a particular letter in the string has to come first
        waysWithLetterFirst letter = map (letter:) (stringPermutations . delete letter $ str)
        --combine all ways of having any possible letter come first
    in concat . map waysWithLetterFirst $ uniques
