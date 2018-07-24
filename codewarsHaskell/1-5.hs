
-- https://wiki.haskell.org/99_questions/1_to_10

-- #1
-- myLast list = last list
myLast [] = error "list can't be empty"
myLast list = list !!  (length list - 1)

-- #2
myButLast [] = error "list needs at least two elements"
myButLast [x] = error "list needs at least two elements"
myButLast list = list !!  (length list - 2)

-- #3
-- list !! n
elemAt list n = do
    let (x, _) = splitAt (n+1) list
    myLast x

-- #4
myLength [] = 0
myLength (x:xs) = 1 + myLength(xs)

-- #5
-- myReverse list = reverse list
myReverse :: [a] -> [a]
myReverse [] = []
myreverse (x:xs) = myReverse xs ++ [x]

-- #6
-- isPalindrome :: [a] -> Bool
-- isPalindrome list list2 = list == list2
isPalindrome list = list == (reverse list)

-- #7
data NestedList a = Elem a | List [NestedList a]
flatten :: NestedList -> [a]
flatten Elem = [ Elem ]
flatten List = do
    (x:xs) <- List
    x ++ flatten xs