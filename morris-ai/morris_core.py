"""
Shared core for the Morris Game, Variant (CS4346 Morris AI Tournament).

Everything the individual programs need lives here:

  * board geometry (neighbors and mills) taken from the Morris Variant handout,
  * the move generators from the handout (GenerateAdd, GenerateMove,
    GenerateHopping, GenerateRemove), plus Black move generation by color swap,
  * the handout's static estimation functions and our improved ones,
  * MINIMAX and ALPHA-BETA search that count static evaluations,
  * the command-line driver shared by the Part I-IV programs.

A board is a 23-character string of 'W', 'B' and 'x'. Index -> location:

     0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22
    a0 d0 g0 b1 d1 f1 c2 e2 a3 b3 c3 e3 f3 g3 c4 d4 e4 b5 d5 f5 a6 d6 g6

Run make_submission.py to inline this file into each program, so every
submitted .py file is self-contained.
"""

import sys

WHITE = "W"
BLACK = "B"
EMPTY = "x"
BOARD_SIZE = 23

# Score used by the static estimators for a won / lost position.
WIN_SCORE = 10000

LOCATION_NAMES = (
    "a0", "d0", "g0", "b1", "d1", "f1", "c2", "e2", "a3", "b3", "c3", "e3",
    "f3", "g3", "c4", "d4", "e4", "b5", "d5", "f5", "a6", "d6", "g6",
)

# neighbors(j) from the handout, written out for every location.
NEIGHBORS = (
    (1, 3, 8),         # 0  a0: d0 b1 a3
    (0, 2, 4),         # 1  d0: a0 g0 d1
    (1, 5, 13),        # 2  g0: d0 f1 g3
    (0, 4, 6, 9),      # 3  b1: a0 d1 c2 b3
    (1, 3, 5),         # 4  d1: d0 b1 f1
    (2, 4, 7, 12),     # 5  f1: g0 d1 e2 f3
    (3, 7, 10),        # 6  c2: b1 e2 c3
    (5, 6, 11),        # 7  e2: f1 c2 e3
    (0, 9, 20),        # 8  a3: a0 b3 a6
    (3, 8, 10, 17),    # 9  b3: b1 a3 c3 b5
    (6, 9, 14),        # 10 c3: c2 b3 c4
    (7, 12, 16),       # 11 e3: e2 f3 e4
    (5, 11, 13, 19),   # 12 f3: f1 e3 g3 f5
    (2, 12, 22),       # 13 g3: g0 f3 g6
    (10, 15, 17),      # 14 c4: c3 d4 b5
    (14, 16, 18),      # 15 d4: c4 e4 d5
    (11, 15, 19),      # 16 e4: e3 d4 f5
    (9, 14, 18, 20),   # 17 b5: b3 c4 d5 a6
    (15, 17, 19, 21),  # 18 d5: d4 b5 f5 d6
    (12, 16, 18, 22),  # 19 f5: f3 e4 d5 g6
    (8, 17, 21),       # 20 a6: a3 b5 d6
    (18, 20, 22),      # 21 d6: d5 a6 g6
    (13, 19, 21),      # 22 g6: g3 f5 d6
)

# Every straight line of three locations. Note that c2-e2 and d0-d1 are
# lines with only two points, so they can never form a mill.
MILLS = (
    (0, 1, 2), (0, 8, 20), (20, 21, 22), (2, 13, 22),    # outer square
    (3, 4, 5), (3, 9, 17), (17, 18, 19), (5, 12, 19),    # middle square
    (6, 10, 14), (14, 15, 16), (7, 11, 16),              # inner square
    (8, 9, 10), (11, 12, 13), (15, 18, 21),              # cross lines
    (0, 3, 6), (2, 5, 7), (20, 17, 14), (22, 19, 16),    # diagonals
)

# For each location, the pairs of other locations that complete a mill with it.
MILL_PARTNERS = tuple(
    tuple(tuple(p for p in mill if p != j) for mill in MILLS if j in mill)
    for j in range(BOARD_SIZE)
)

# Points where four lines meet: the most flexible squares on the board.
JUNCTIONS = tuple(j for j in range(BOARD_SIZE) if len(NEIGHBORS[j]) == 4)

_SWAP_TABLE = str.maketrans({WHITE: BLACK, BLACK: WHITE})


# ---------------------------------------------------------------------------
# Basic board helpers
# ---------------------------------------------------------------------------

def neighbors(j):
    return NEIGHBORS[j]


def close_mill(j, b):
    """True if the piece on location j is part of a mill (handout's closeMill)."""
    c = b[j]
    if c == EMPTY:
        return False
    return any(b[p] == c and b[q] == c for p, q in MILL_PARTNERS[j])


def set_at(b, j, c):
    return b[:j] + c + b[j + 1:]


def swap_colors(b):
    """Replace every W by B and every B by W."""
    return b.translate(_SWAP_TABLE)


def other(color):
    return BLACK if color == WHITE else WHITE


def validate_board(b):
    """Raise ValueError if b is not a legal-looking board string."""
    if len(b) != BOARD_SIZE:
        raise ValueError(f"board must have {BOARD_SIZE} characters, got {len(b)}: {b!r}")
    bad = set(b) - {WHITE, BLACK, EMPTY}
    if bad:
        raise ValueError(f"board may only contain W, B and x; found {sorted(bad)} in {b!r}")
    for color in (WHITE, BLACK):
        if b.count(color) > 9:
            raise ValueError(f"board has more than 9 {color} pieces: {b!r}")


# ---------------------------------------------------------------------------
# Move generators for White (handout pseudo-code)
# ---------------------------------------------------------------------------

def generate_remove(b, L):
    """Add to L every board obtained by removing one black piece not in a mill.

    As in the handout: if every black piece is in a mill, b is added unchanged.
    """
    added = False
    for location in range(BOARD_SIZE):
        if b[location] == BLACK and not close_mill(location, b):
            L.append(set_at(b, location, EMPTY))
            added = True
    if not added:
        L.append(b)


def generate_add(b):
    L = []
    for location in range(BOARD_SIZE):
        if b[location] == EMPTY:
            nb = set_at(b, location, WHITE)
            if close_mill(location, nb):
                generate_remove(nb, L)
            else:
                L.append(nb)
    return L


def generate_move(b):
    L = []
    for location in range(BOARD_SIZE):
        if b[location] == WHITE:
            for j in NEIGHBORS[location]:
                if b[j] == EMPTY:
                    nb = set_at(set_at(b, location, EMPTY), j, WHITE)
                    if close_mill(j, nb):
                        generate_remove(nb, L)
                    else:
                        L.append(nb)
    return L


def generate_hopping(b):
    L = []
    for alpha in range(BOARD_SIZE):
        if b[alpha] == WHITE:
            for beta in range(BOARD_SIZE):
                if b[beta] == EMPTY:
                    nb = set_at(set_at(b, alpha, EMPTY), beta, WHITE)
                    if close_mill(beta, nb):
                        generate_remove(nb, L)
                    else:
                        L.append(nb)
    return L


def generate_moves_opening(b):
    return generate_add(b)


def generate_moves_midgame_endgame(b):
    if b.count(WHITE) == 3:
        return generate_hopping(b)
    return generate_move(b)


# Black moves: swap colors, generate White moves, swap the results back.

def generate_black_moves_opening(b):
    return [swap_colors(p) for p in generate_moves_opening(swap_colors(b))]


def generate_black_moves_midgame_endgame(b):
    return [swap_colors(p) for p in generate_moves_midgame_endgame(swap_colors(b))]


def generate_moves_for(b, color, opening):
    """All positions reachable by one move of `color` in the given phase."""
    if color == WHITE:
        return generate_moves_opening(b) if opening else generate_moves_midgame_endgame(b)
    return generate_black_moves_opening(b) if opening else generate_black_moves_midgame_endgame(b)


# ---------------------------------------------------------------------------
# Static estimation: the handout's functions (always from White's point of view)
# ---------------------------------------------------------------------------

def static_estimation_opening(b):
    return b.count(WHITE) - b.count(BLACK)


def static_estimation_midgame_endgame(b):
    num_white = b.count(WHITE)
    num_black = b.count(BLACK)
    if num_black <= 2:
        return WIN_SCORE
    if num_white <= 2:
        return -WIN_SCORE
    num_black_moves = len(generate_black_moves_midgame_endgame(b))
    if num_black_moves == 0:
        return WIN_SCORE
    return 1000 * (num_white - num_black) - num_black_moves


# ---------------------------------------------------------------------------
# Static estimation: our improved functions (see MyStaticEstimation.txt)
# ---------------------------------------------------------------------------

def count_mills(b, color):
    """Number of complete mills owned by color."""
    return sum(1 for p, q, r in MILLS if b[p] == color and b[q] == color and b[r] == color)


def count_potential_mills(b, color):
    """Lines holding two of color's pieces and an empty third point."""
    total = 0
    for mill in MILLS:
        own = empty = 0
        for j in mill:
            if b[j] == color:
                own += 1
            elif b[j] == EMPTY:
                empty += 1
        if own == 2 and empty == 1:
            total += 1
    return total


def count_adjacent_moves(b, color):
    """Number of (piece, adjacent empty point) pairs for color: its sliding mobility."""
    return sum(
        1
        for j in range(BOARD_SIZE)
        if b[j] == color
        for n in NEIGHBORS[j]
        if b[n] == EMPTY
    )


def count_blocked(b, color):
    """Pieces of color with no adjacent empty point."""
    return sum(
        1
        for j in range(BOARD_SIZE)
        if b[j] == color and all(b[n] != EMPTY for n in NEIGHBORS[j])
    )


def count_junctions(b, color):
    return sum(1 for j in JUNCTIONS if b[j] == color)


def improved_estimation_opening(b):
    num_white = b.count(WHITE)
    num_black = b.count(BLACK)
    return (
        100 * (num_white - num_black)
        + 25 * (count_potential_mills(b, WHITE) - count_potential_mills(b, BLACK))
        + 10 * (count_mills(b, WHITE) - count_mills(b, BLACK))
        + 4 * (count_junctions(b, WHITE) - count_junctions(b, BLACK))
        + 2 * (count_adjacent_moves(b, WHITE) - count_adjacent_moves(b, BLACK))
    )


# A side with three pieces can hop anywhere, so sliding mobility does not
# apply to it; we credit it with this fixed mobility instead.
HOPPING_MOBILITY = 8


def improved_estimation_midgame_endgame(b):
    num_white = b.count(WHITE)
    num_black = b.count(BLACK)
    if num_black <= 2:
        return WIN_SCORE
    if num_white <= 2:
        return -WIN_SCORE
    white_mobility = HOPPING_MOBILITY if num_white == 3 else count_adjacent_moves(b, WHITE)
    black_mobility = HOPPING_MOBILITY if num_black == 3 else count_adjacent_moves(b, BLACK)
    if black_mobility == 0:
        return WIN_SCORE
    if white_mobility == 0:
        return -WIN_SCORE
    return (
        1000 * (num_white - num_black)
        + 60 * (count_mills(b, WHITE) - count_mills(b, BLACK))
        + 40 * (count_potential_mills(b, WHITE) - count_potential_mills(b, BLACK))
        + 8 * (white_mobility - black_mobility)
        + 12 * (count_blocked(b, BLACK) - count_blocked(b, WHITE))
    )


# ---------------------------------------------------------------------------
# MINIMAX and ALPHA-BETA (White is MAX, Black is MIN)
# ---------------------------------------------------------------------------

class Search:
    """Fixed-depth MINIMAX / ALPHA-BETA as presented in class.

    white_moves(b) / black_moves(b) generate children, estimate(b) is the
    static estimation (from White's point of view), and is_terminal(b) says
    whether the game is already over at b. A node is a leaf when the depth is
    exhausted, the game is over, or the side to move has no moves; leaves are
    scored by the static estimation and counted in positions_evaluated.
    """

    def __init__(self, white_moves, black_moves, estimate, is_terminal=None):
        self.white_moves = white_moves
        self.black_moves = black_moves
        self.estimate = estimate
        self.is_terminal = is_terminal or (lambda b: False)
        self.positions_evaluated = 0

    def _leaf(self, b):
        self.positions_evaluated += 1
        return self.estimate(b)

    # ----- MINIMAX -----

    def minimax(self, b, depth):
        """Return (MINIMAX estimate, best board for White) from root b."""
        self.positions_evaluated = 0
        best_value, best_board = None, None
        for child in self.white_moves(b):
            v = self._min_max(child, depth - 1)
            if best_value is None or v > best_value:  # strict: first best wins ties
                best_value, best_board = v, child
        if best_board is None:  # White has no legal move at the root
            return self._leaf(b), b
        return best_value, best_board

    def _max_min(self, b, depth):
        """MAX node: White to move."""
        if depth == 0 or self.is_terminal(b):
            return self._leaf(b)
        children = self.white_moves(b)
        if not children:
            return self._leaf(b)
        return max(self._min_max(c, depth - 1) for c in children)

    def _min_max(self, b, depth):
        """MIN node: Black to move."""
        if depth == 0 or self.is_terminal(b):
            return self._leaf(b)
        children = self.black_moves(b)
        if not children:
            return self._leaf(b)
        return min(self._max_min(c, depth - 1) for c in children)

    # ----- ALPHA-BETA -----

    def alphabeta(self, b, depth):
        """Same result as minimax(), but prunes branches that cannot matter."""
        self.positions_evaluated = 0
        alpha, beta = float("-inf"), float("inf")
        best_value, best_board = None, None
        for child in self.white_moves(b):
            v = self._ab_min(child, depth - 1, alpha, beta)
            if best_value is None or v > best_value:
                best_value, best_board = v, child
            alpha = max(alpha, v)
        if best_board is None:
            return self._leaf(b), b
        return best_value, best_board

    def _ab_max(self, b, depth, alpha, beta):
        if depth == 0 or self.is_terminal(b):
            return self._leaf(b)
        children = self.white_moves(b)
        if not children:
            return self._leaf(b)
        v = float("-inf")
        for c in children:
            v = max(v, self._ab_min(c, depth - 1, alpha, beta))
            if v >= beta:
                return v
            alpha = max(alpha, v)
        return v

    def _ab_min(self, b, depth, alpha, beta):
        if depth == 0 or self.is_terminal(b):
            return self._leaf(b)
        children = self.black_moves(b)
        if not children:
            return self._leaf(b)
        v = float("inf")
        for c in children:
            v = min(v, self._ab_max(c, depth - 1, alpha, beta))
            if v <= alpha:
                return v
            beta = min(beta, v)
        return v


def midgame_game_over(b):
    """In the midgame/endgame the game ends when a side is down to two pieces."""
    return b.count(WHITE) <= 2 or b.count(BLACK) <= 2


def make_search(opening, improved=False):
    if opening:
        estimate = improved_estimation_opening if improved else static_estimation_opening
        return Search(generate_moves_opening, generate_black_moves_opening, estimate)
    estimate = improved_estimation_midgame_endgame if improved else static_estimation_midgame_endgame
    return Search(
        generate_moves_midgame_endgame,
        generate_black_moves_midgame_endgame,
        estimate,
        midgame_game_over,
    )


# ---------------------------------------------------------------------------
# Display helpers
# ---------------------------------------------------------------------------

_BOARD_TEMPLATE = (
    "6 *-----------*-----------*",
    "  |\\          |          /|",
    "5 | *---------*---------* |",
    "  | |\\        |        /| |",
    "4 | | *-------*-------* | |",
    "  | | |               | | |",
    "3 *-*-*               *-*-*",
    "  | | |               | | |",
    "2 | | *---------------* | |",
    "  | |/                 \\| |",
    "1 | *---------*---------* |",
    "  |/          |          \\|",
    "0 *-----------*-----------*",
    "  a b c       d       e f g",
)
_FILE_COLUMNS = {"a": 2, "b": 4, "c": 6, "d": 14, "e": 22, "f": 24, "g": 26}


def render_board(b):
    """ASCII picture of the board; empty points are shown as '.'."""
    grid = [list(line) for line in _BOARD_TEMPLATE]
    for j, name in enumerate(LOCATION_NAMES):
        row = 2 * (6 - int(name[1]))
        grid[row][_FILE_COLUMNS[name[0]]] = "." if b[j] == EMPTY else b[j]
    return "\n".join("".join(line) for line in grid)


def describe_move(before, after, color):
    """Human-readable description of the move color made from before to after."""
    placed = [j for j in range(BOARD_SIZE) if before[j] == EMPTY and after[j] == color]
    vacated = [j for j in range(BOARD_SIZE) if before[j] == color and after[j] == EMPTY]
    removed = [j for j in range(BOARD_SIZE) if before[j] == other(color) and after[j] == EMPTY]
    parts = []
    if placed and vacated:
        parts.append(f"{LOCATION_NAMES[vacated[0]]} -> {LOCATION_NAMES[placed[0]]}")
    elif placed:
        parts.append(f"place {LOCATION_NAMES[placed[0]]}")
    if removed:
        parts.append(f"remove {LOCATION_NAMES[removed[0]]}")
    return ", ".join(parts) if parts else "no change"


# ---------------------------------------------------------------------------
# Command-line driver for the Part I-IV programs
# ---------------------------------------------------------------------------

def read_board(path):
    with open(path) as f:
        b = f.read().strip()
    validate_board(b)
    return b


def write_board(path, b):
    with open(path, "w") as f:
        f.write(b + "\n")


def run_program(argv, opening, use_alphabeta=False, play_black=False, improved=False):
    """Shared main() for MiniMaxOpening.py, ABGame.py, MiniMaxGameBlack.py, ...

    Usage: python <Program>.py <input board file> <output board file> <depth>

    Black programs use the color-swapping method: swap the board, find White's
    best move, swap the answer back. The printed estimate is therefore from
    the point of view of the player whose move is computed.
    """
    program = argv[0] if argv else "program.py"
    if len(argv) != 4:
        print(f"usage: python {program} <input board file> <output board file> <depth>")
        sys.exit(1)
    input_file, output_file = argv[1], argv[2]
    try:
        depth = int(argv[3])
        if depth < 1:
            raise ValueError
    except ValueError:
        print("depth must be a positive integer")
        sys.exit(1)
    try:
        board = read_board(input_file)
    except (OSError, ValueError) as e:
        print(f"could not read board: {e}")
        sys.exit(1)

    root = swap_colors(board) if play_black else board
    search = make_search(opening, improved)
    if use_alphabeta:
        estimate, best = search.alphabeta(root, depth)
    else:
        estimate, best = search.minimax(root, depth)
    if play_black:
        best = swap_colors(best)

    write_board(output_file, best)
    print(f"Board Position: {best}")
    print(f"Positions evaluated by static estimation: {search.positions_evaluated}")
    print(f"MINIMAX estimate: {estimate}")
    return estimate, best, search.positions_evaluated
