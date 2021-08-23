#!/usr/bin/env python3

import sys

# We just hard code the following transition table
trans = {
    'A':('B', 'C'), # shorthand for {0:'B', 1:'C'}
    'B':('X', 'D'),
    'C':('E', 'X'),
    'D':('B', 'X'),
    'E':('F', 'X'),
    'F':('X', 'C')
}
starting_states = "A"
ending_states = "A, D, F"

def main():
    for line in sys.stdin:
        for char in line:
