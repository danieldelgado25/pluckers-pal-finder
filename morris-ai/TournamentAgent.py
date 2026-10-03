"""
TournamentAgent.py - our Part V tournament player.

Usage:
    python TournamentAgent.py <input board file> <output board file> <W|B> <move number>
                              [--time SECONDS] [--max-depth N] [--history FILE]

  <W|B>          the color we are playing.
  <move number>  the number of the move we are about to make, as posted in
                 Teams ("Move 7 - White" -> 7). White makes the odd moves.
                 Moves 1-18 are the opening; from move 19 on it is the
                 midgame/endgame.
  --time         seconds we allow ourselves (default 60; the limit is 4 minutes,
                 so leave room to copy and post the move).
  --history      optional file with every board posted so far in this game,
                 one per line, in order (line i = board after move i). Used to
                 avoid walking into a threefold-repetition draw while ahead.

How it works (all from class material):
  * ALPHA-BETA search with White as MAX. When we play Black we use the color
    swapping method, so the search always plays White.
  * Iterative deepening: search depth 1, 2, 3, ... and keep the move from the
    deepest search that finished before the time budget ran out.
  * The search knows the move number, so a search that starts in the opening
    switches to midgame moves exactly when the 18 placements are used up.
  * Real game-over detection inside the search (two pieces left, or no legal
    move), with faster wins scored higher so the agent finishes won games.
  * Our improved static estimation (MyStaticEstimation.txt) at the leaves.
  * Move ordering (captures first, previous best move first at the root) so
    alpha-beta prunes more and reaches deeper in the same time.
"""

import sys
import time

from morris_core import *  # inlined by make_submission.py

OPENING_MOVES = 18          # moves 1..18 are placements
DEFAULT_TIME = 60.0
DEFAULT_MAX_DEPTH = 30
MATE_SCORE = 100000         # larger than any static estimate


class TimeUp(Exception):
    pass


class TournamentSearch:
    """Alpha-beta over (board, ply) where ply = number of moves already played.

    The root is always White to move (Black games are color swapped first).
    """

    def __init__(self, deadline):
        self.deadline = deadline
        self.nodes = 0
        self.positions_evaluated = 0

    def children(self, b, white_to_move, ply):
        opening = ply < OPENING_MOVES
        kids = generate_moves_for(b, WHITE if white_to_move else BLACK, opening)
        # Captures first: they are usually the best moves and cause cut-offs.
        victim = BLACK if white_to_move else WHITE
        kids.sort(key=lambda c: c.count(victim))
        return kids

    def evaluate(self, b, ply):
        self.positions_evaluated += 1
        if ply < OPENING_MOVES:
            return improved_estimation_opening(b)
        return improved_estimation_midgame_endgame(b)

    def alphabeta(self, b, depth, alpha, beta, white_to_move, ply, dist):
        self.nodes += 1
        if self.nodes & 1023 == 0 and time.monotonic() > self.deadline:
            raise TimeUp()

        if ply >= OPENING_MOVES:
            # Game over: a side reduced to two pieces has lost.
            if b.count(WHITE) <= 2:
                return -MATE_SCORE + dist
            if b.count(BLACK) <= 2:
                return MATE_SCORE - dist
        if depth == 0:
            return self.evaluate(b, ply)

        kids = self.children(b, white_to_move, ply)
        if not kids:
            # The side to move is blocked and loses.
            return -MATE_SCORE + dist if white_to_move else MATE_SCORE - dist

        if white_to_move:
            v = float("-inf")
            for c in kids:
                v = max(v, self.alphabeta(c, depth - 1, alpha, beta, False, ply + 1, dist + 1))
                if v >= beta:
                    return v
                alpha = max(alpha, v)
            return v
        v = float("inf")
        for c in kids:
            v = min(v, self.alphabeta(c, depth - 1, alpha, beta, True, ply + 1, dist + 1))
            if v <= alpha:
                return v
            beta = min(beta, v)
        return v


def choose_move(board, color, move_number, time_limit=DEFAULT_TIME,
                max_depth=DEFAULT_MAX_DEPTH, history=(), verbose=False):
    """Return (best board, info dict) for `color` to move on `board`.

    history: boards posted so far, history[i] = board after move i + 1.
    """
    start = time.monotonic()
    deadline = start + time_limit
    ply = move_number - 1

    play_black = color == BLACK
    root = swap_colors(board) if play_black else board

    # Positions after our move that have already occurred twice with the
    # same player to move: a third time would be a draw.
    seen = {}
    for i, h in enumerate(history):
        if (i + 1) % 2 == move_number % 2:  # posted after one of our moves
            key = swap_colors(h) if play_black else h
            seen[key] = seen.get(key, 0) + 1

    search = TournamentSearch(deadline)
    moves = search.children(root, True, ply)
    if not moves:
        return board, {"depth": 0, "score": -MATE_SCORE, "nodes": 0, "evaluated": 0,
                       "elapsed": 0.0, "no_moves": True}

    best_board, best_value, completed_depth = moves[0], None, 0
    for depth in range(1, max_depth + 1):
        try:
            alpha, beta = float("-inf"), float("inf")
            iter_best, iter_value = None, None
            for child in moves:
                if seen.get(child, 0) >= 2:
                    v = 0  # would complete a threefold repetition: a draw
                else:
                    v = search.alphabeta(child, depth - 1, alpha, beta, False, ply + 1, 1)
                if iter_value is None or v > iter_value:
                    iter_best, iter_value = child, v
                alpha = max(alpha, v)
        except TimeUp:
            break
        best_board, best_value, completed_depth = iter_best, iter_value, depth
        # Search the best move first next iteration: better pruning.
        moves.remove(iter_best)
        moves.insert(0, iter_best)
        if verbose:
            print(f"  depth {depth}: score {iter_value}, "
                  f"{time.monotonic() - start:.1f}s", file=sys.stderr)
        if abs(iter_value) >= MATE_SCORE - 1000:
            break  # forced win or loss found; deeper search changes nothing
        if len(moves) == 1:
            break
        # A search one ply deeper takes several times longer; don't start
        # one we almost certainly cannot finish.
        elapsed = time.monotonic() - start
        if elapsed > time_limit * 0.4:
            break

    result = swap_colors(best_board) if play_black else best_board
    return result, {
        "depth": completed_depth,
        "score": best_value,
        "nodes": search.nodes,
        "evaluated": search.positions_evaluated,
        "elapsed": time.monotonic() - start,
        "no_moves": False,
    }


def parse_args(argv):
    args = [a for a in argv[1:]]
    options = {"time": DEFAULT_TIME, "max-depth": DEFAULT_MAX_DEPTH, "history": None}
    positional = []
    i = 0
    while i < len(args):
        a = args[i]
        if a.startswith("--"):
            name = a[2:]
            if name not in options or i + 1 >= len(args):
                raise ValueError(f"unknown or incomplete option {a}")
            options[name] = args[i + 1]
            i += 2
        else:
            positional.append(a)
            i += 1
    if len(positional) != 4:
        raise ValueError("expected 4 positional arguments")
    input_file, output_file, color, move_number = positional
    color = color.upper()[:1]
    if color not in (WHITE, BLACK):
        raise ValueError("color must be W or B")
    return (input_file, output_file, color, int(move_number),
            float(options["time"]), int(options["max-depth"]), options["history"])


def main(argv):
    try:
        (input_file, output_file, color, move_number,
         time_limit, max_depth, history_file) = parse_args(argv)
        board = read_board(input_file)
        history = []
        if history_file:
            with open(history_file) as f:
                history = [line.strip() for line in f if line.strip()]
            for h in history:
                validate_board(h)
    except (OSError, ValueError) as e:
        print(f"error: {e}")
        print(__doc__)
        sys.exit(1)

    if move_number < 1:
        print("error: move number starts at 1")
        sys.exit(1)
    expected = WHITE if move_number % 2 == 1 else BLACK
    if color != expected:
        print(f"WARNING: move {move_number} is normally made by "
              f"{'White' if expected == WHITE else 'Black'}. Check the move number!",
              file=sys.stderr)

    best, info = choose_move(board, color, move_number, time_limit, max_depth,
                             history, verbose=True)
    side = "White" if color == WHITE else "Black"
    if info["no_moves"]:
        print(f"{side} has no legal move: this position is lost.")
        sys.exit(2)

    write_board(output_file, best)
    print(render_board(best))
    print()
    print(f"{describe_move(board, best, color)}  "
          f"(depth {info['depth']}, score {info['score']}, "
          f"{info['evaluated']} positions evaluated, {info['elapsed']:.1f}s)")
    print()
    print("Post this in Teams:")
    print(f"Move {move_number} - {side}")
    print(best)


if __name__ == "__main__":
    main(sys.argv)
