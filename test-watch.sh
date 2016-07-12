#!/usr/bin/env bash
TEST_COMMAND="npm test"
SOURCE_JS_FILES="$(find . -iregex '.*\.\(md\|ejs\|js\)' -o -path './node_modules' -prune)"
echo "$SOURCE_JS_FILES" | entr -c $TEST_COMMAND
