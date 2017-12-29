#!/usr/bin/env stack
-- stack --install-ghc runghc --package turtle

{-# LANGUAGE OverloadedStrings #-}

module Marshallz.Shell ( run ) where

import qualified Data.Text as T
import           Turtle

cmd :: T.Text
cmd = "jaws fromURL "

execJaws :: T.Text -> IO ()
execJaws x = stdout (inshell (cmd <> x) empty)

run :: String -> IO ()
run str = do
  x <- need (T.pack str)
  case x of
    Nothing -> return ()
    Just x  -> execJaws x
