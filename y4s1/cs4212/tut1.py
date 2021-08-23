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
    seq = ""
    for line in sys.stdin:
        for char in line:
            if char not in alphabet:
                print(f"Invalid character: {char}")
                exit()
            seq += char
            state = trans[state][int(char)]
            if state == "X":
                print(f"Invalid string: {seq}")
                exit()
    if state not in ending_states:
        print(f"Invalid string: {seq}")
    else:
        print(f"Accepted string: {seq}")


main()

# test:
# echo -n "0101" | python3 tut1.py
