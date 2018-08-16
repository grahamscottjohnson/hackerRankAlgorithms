-- getCount list item = list.

-- buildList list function = [function list , 
getCount list item = length $ filter (== item) list
-- getCountAndFilteredList list item = (getCount list item, filter (==item) list)
-- getCountAndFilteredList list item = do
--     let newList = filter (/= item) list
--     (length newList, newList)
-- getMaxFrequency = do

algo :: Ord a => [a] -> (Int, a)
algo [] = (0, 0)
algo list@(x:xs) = if (countOfThis > fst myTuple)
    then (countOfThis, x)
    else if (countOfThis == fst myTuple)
        then if x > snd myTuple
            then (countOfThis, x)
            else (fst myTuple, snd myTuple)
        else (fst myTuple, snd myTuple)
    where myTuple = algo $ filter (/= x) list
        -- countOfNotThis = fst myTuple
        -- keyOfNotThis = snd myTuple
        countOfThis = length list - length $ filter (/= x) list
        -- count = max (length list - length listOfNotThis) (algo(listOfNotThis))


-- frequencySort list = groupBy (==)

testList = [1, 4, 4, 4, 5, 3]