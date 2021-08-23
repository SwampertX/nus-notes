#!/usr/bin/env python3

import sys

# We just hard code the following transition table
trans = {
    "A": ("B", "C"),  # shorthand for {0:'B', 1:'C'}
    "B": ("X", "D"),
    "C": ("E", "X"),
    "D": ("B", "X"),
    "E": ("F", "X"),
    "F": ("X", "C"),
}
starting_state = "A"
ending_states = "A, D, F"
alphabet = "01"


def main():
    state = starting_state
    for line in sys.stdin:
        for char in line:
            if char not in alphabet:
                print(f"Invalid character: {char}")
                exit(1)
            state = trans[state][int(char)]
