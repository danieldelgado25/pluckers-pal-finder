"""
play.py - local referee for practice games between engines.

Usage:
    python play.py [--white ENGINE] [--black ENGINE] [--time SECONDS]
                   [--depth N] [--games N] [--max-moves N] [--quiet]

Engines:
    agent     TournamentAgent (iterative deepening, --time seconds per move)
    basic     ALPHA-BETA at --depth with the handout's static estimations
    improved  ALPHA-BETA at --depth with our improved static estimations
    random    uniformly random legal move

The game log is printed in the Teams format ("Move 7 - White" + board).
Every move is checked for legality, and the rules from the project handout
are applied: two pieces left or no legal move loses; the same position with
the same player to move three times is a draw.
"""

import random
import sys

from morris_core import *  # inlined by make_submission.py
from TournamentAgent import choose_move


def engine_move(engine, board, color, move_number, depth, time_limit, history):
    opening = move_number <= 18
    if engine == "agent":
        best, _ = choose_move(board, color, move_number, time_limit, history=history)
        return best
    if engine == "random":
        return random.choice(generate_moves_for(board, color, opening))
    search = make_search(opening, improved=(engine == "improved"))
    root = swap_colors(board) if color == BLACK else board
    _, best = search.alphabeta(root, depth)
    return swap_colors(best) if color == BLACK else best


def play_game(white, black, depth=3, time_limit=10.0, max_moves=200, quiet=False):
    """Play one game; return 'W', 'B' or 'D'."""
    board = EMPTY * BOARD_SIZE
    history = []
    seen = {}
    engines = {WHITE: white, BLACK: black}
    for move_number in range(1, max_moves + 1):
        color = WHITE if move_number % 2 == 1 else BLACK
        opening = move_number <= 18
        legal = generate_moves_for(board, color, opening)
        if not opening and board.count(color) <= 2:
            return finish(other(color), f"{color} is down to two pieces", quiet)
        if not legal:
            return finish(other(color), f"{color} has no legal move", quiet)

        new = engine_move(engines[color], board, color, move_number, depth, time_limit, history)
        if new not in legal:
            return finish(other(color), f"{color} made an illegal move: {new}", quiet)
        if not quiet:
            side = "White" if color == WHITE else "Black"
            print(f"Move {move_number} - {side}   ({engines[color]}: "
                  f"{describe_move(board, new, color)})")
            print(new)
        board = new
        history.append(board)
        key = (board, other(color))
        seen[key] = seen.get(key, 0) + 1
        if seen[key] >= 3:
            return finish("D", "threefold repetition", quiet)
    return finish("D", f"move limit {max_moves} reached", quiet)


def finish(result, reason, quiet):
    if not quiet:
        winner = {"W": "White wins", "B": "Black wins", "D": "Draw"}[result]
        print(f"{winner} ({reason})")
    return result


def main(argv):
    options = {"white": "agent", "black": "basic", "time": "10", "depth": "3",
               "games": "1", "max-moves": "200"}
    quiet = False
    args = argv[1:]
    i = 0
    while i < len(args):
        name = args[i][2:]
        if name == "quiet":
            quiet = True
            i += 1
            continue
        if not args[i].startswith("--") or name not in options or i + 1 >= len(args):
            print(__doc__)
            sys.exit(1)
        options[name] = args[i + 1]
        i += 2

    tally = {"W": 0, "B": 0, "D": 0}
    for _ in range(int(options["games"])):
        result = play_game(options["white"], options["black"], int(options["depth"]),
                           float(options["time"]), int(options["max-moves"]), quiet)
        tally[result] += 1
    print(f"White ({options['white']}) {tally['W']} - Black ({options['black']}) "
          f"{tally['B']} - draws {tally['D']}")


if __name__ == "__main__":
    main(sys.argv)
