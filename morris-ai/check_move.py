"""
check_move.py - verify that a posted board is a legal move (tournament helper).

Usage:
    python check_move.py <board before> <board after> <W|B> <move number>

Boards may be given as 23-character strings or as files containing one.
<W|B> is the side that made the move; <move number> is its number in the
Teams log (moves 1-18 are the opening).

Exit code 0 = legal, 1 = illegal, 2 = bad input.
"""

import os
import sys

from morris_core import *  # inlined by make_submission.py


def load(arg):
    if os.path.exists(arg):
        return read_board(arg)
    validate_board(arg)
    return arg


def check(before, after, color, move_number):
    """Return (is_legal, message)."""
    opening = move_number <= 18
    legal = generate_moves_for(before, color, opening)
    if after in legal:
        return True, describe_move(before, after, color)
    if not legal:
        return False, f"{color} has no legal move here; the game is already over"
    return False, "not reachable by one legal move from the previous board"


def game_status(b, next_color, next_move_number):
    """Describe the result if the game is over for the player about to move."""
    if next_move_number <= 18:
        return None
    if b.count(next_color) <= 2:
        return f"{next_color} is down to two pieces: {other(next_color)} wins"
    if not generate_moves_for(b, next_color, False):
        return f"{next_color} has no legal move: {other(next_color)} wins"
    return None


def main(argv):
    if len(argv) != 5:
        print(__doc__)
        sys.exit(2)
    try:
        before, after = load(argv[1]), load(argv[2])
        color = argv[3].upper()[:1]
        if color not in (WHITE, BLACK):
            raise ValueError("color must be W or B")
        move_number = int(argv[4])
    except (OSError, ValueError) as e:
        print(f"error: {e}")
        sys.exit(2)

    ok, message = check(before, after, color, move_number)
    print(render_board(after))
    print()
    if ok:
        print(f"LEGAL: {message}")
        status = game_status(after, other(color), move_number + 1)
        if status:
            print(f"GAME OVER: {status}")
        sys.exit(0)
    print(f"ILLEGAL: {message}")
    sys.exit(1)


if __name__ == "__main__":
    main(sys.argv)
