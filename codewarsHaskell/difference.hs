module Difference where

    difference :: Eq a => [a] -> [a] -> [a]
    difference a b = filter ( not . flip elem b ) a