# we want to find all irreducible polynomials in F_3[x]
# of degree at most 3.
# recall that f(x)\in F[x] is irreducible iff there is no
# root for f(x) in F.

# we describe a polynomial by a tuple, (a, b, c, d)
# representing ax^3+bx^2+cx+d. We go through all possibilities
# and test the roots.

from itertools import product


def main():
    count = 0
    for a, b, c, d in product(range(3), repeat=4):  # polynomial
        if all((a * x ** 3 + b * x ** 2 + c * x + d) % 3 != 0 for x in range(3)) or (
            a == b == 0 and c != 0
        ):
            count += 1
            print(f"{a}x^3 + {b}x^2 + {c}x + {d} is irreducible")
    print(f"count: {count}")


main()
