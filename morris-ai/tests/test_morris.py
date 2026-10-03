"""Tests for the Morris Variant programs. Run: python -m unittest discover -s tests"""

import os
import random
import subprocess
import sys
import tempfile
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, ROOT)

from morris_core import *  # noqa: E402,F403
from TournamentAgent import choose_move  # noqa: E402
from check_move import check  # noqa: E402


def random_board(rng, max_white=9, max_black=9):
    nw = rng.randint(3, max_white)
    nb = rng.randint(3, max_black)
    spots = rng.sample(range(BOARD_SIZE), nw + nb)
    b = [EMPTY] * BOARD_SIZE
    for j in spots[:nw]:
        b[j] = WHITE
    for j in spots[nw:]:
        b[j] = BLACK
    return "".join(b)


class GeometryTests(unittest.TestCase):
    def test_handout_examples(self):
        self.assertEqual(sorted(neighbors(0)), [1, 3, 8])
        self.assertEqual(sorted(neighbors(1)), [0, 2, 4])
        b = set_at(set_at(set_at(EMPTY * 23, 0, WHITE), 1, WHITE), 2, WHITE)
        self.assertTrue(close_mill(0, b))
        b = set_at(set_at(set_at(EMPTY * 23, 0, BLACK), 8, BLACK), 20, BLACK)
        self.assertTrue(close_mill(0, b))
        b = set_at(set_at(set_at(EMPTY * 23, 0, WHITE), 3, WHITE), 6, WHITE)
        self.assertTrue(close_mill(0, b))

    def test_adjacency_is_symmetric(self):
        for j in range(BOARD_SIZE):
            for n in NEIGHBORS[j]:
                self.assertIn(j, NEIGHBORS[n], f"{LOCATION_NAMES[j]}-{LOCATION_NAMES[n]}")

    def test_mills_are_connected_lines(self):
        self.assertEqual(len(MILLS), 18)
        for a, b, c in MILLS:
            self.assertIn(b, NEIGHBORS[a])
            self.assertIn(c, NEIGHBORS[b])

    def test_two_point_lines_are_not_mills(self):
        b = EMPTY * 23
        for pair in ((6, 7), (1, 4)):  # c2-e2 and d0-d1
            bb = b
            for j in pair:
                bb = set_at(bb, j, WHITE)
            self.assertFalse(any(close_mill(j, bb) for j in pair))

    def test_handout_pictures(self):
        # Second example from the handout picture.
        b = "WxWWxWWWWWBBBBBBBBxxxxx"
        names = {LOCATION_NAMES[j] for j in range(23) if b[j] == WHITE}
        self.assertEqual(names, {"a0", "g0", "b1", "f1", "c2", "e2", "a3", "b3"})
        names = {LOCATION_NAMES[j] for j in range(23) if b[j] == BLACK}
        self.assertEqual(names, {"c3", "e3", "f3", "g3", "c4", "d4", "e4", "b5"})

    def test_render_fills_every_point(self):
        art = render_board(EMPTY * 23)
        self.assertNotIn("*", art)
        self.assertEqual(art.count("."), 23)


class MoveGeneratorTests(unittest.TestCase):
    def test_opening_on_empty_board(self):
        self.assertEqual(len(generate_moves_opening(EMPTY * 23)), 23)

    def test_remove_skips_pieces_in_mills(self):
        # Black mill a0 d0 g0 plus a lone black piece on g6.
        b = list(EMPTY * 23)
        for j in (0, 1, 2, 22):
            b[j] = BLACK
        b[3], b[4] = WHITE, WHITE  # white about to close b1 d1 f1
        b = "".join(b)
        results = [r for r in generate_moves_opening(b) if r[5] == WHITE]
        self.assertEqual(results, [set_at(set_at(b, 5, WHITE), 22, EMPTY)])

    def test_remove_when_all_black_in_mills(self):
        b = list(EMPTY * 23)
        for j in (0, 1, 2):
            b[j] = BLACK
        b[3], b[4] = WHITE, WHITE
        b = "".join(b)
        results = [r for r in generate_moves_opening(b) if r[5] == WHITE]
        self.assertEqual(results, [set_at(b, 5, WHITE)])  # nothing removed

    def test_hopping_with_three_pieces(self):
        b = "WWxxxxxxxxxxxxxxxxBBBBW"
        b = b[:23]
        self.assertEqual(b.count(WHITE), 3)
        moves = generate_moves_midgame_endgame(b)
        empties = b.count(EMPTY)
        self.assertGreaterEqual(len(moves), 3 * empties)

    def test_black_moves_are_white_moves_mirrored(self):
        rng = random.Random(1)
        for _ in range(50):
            b = random_board(rng)
            for opening in (True, False):
                black = generate_moves_for(b, BLACK, opening)
                for r in black:
                    # Black placed (opening) or moved: white count can only drop.
                    self.assertEqual(r.count(BLACK), b.count(BLACK) + (1 if opening else 0))
                    self.assertLessEqual(r.count(WHITE), b.count(WHITE))


class SearchTests(unittest.TestCase):
    def test_alphabeta_matches_minimax(self):
        rng = random.Random(7)
        fewer = 0
        for trial in range(40):
            opening = trial % 2 == 0
            b = random_board(rng, 6, 6) if opening else random_board(rng)
            depth = 3 if opening else 2
            for improved in (False, True):
                mm = make_search(opening, improved)
                v1, m1 = mm.minimax(b, depth)
                ab = make_search(opening, improved)
                v2, m2 = ab.alphabeta(b, depth)
                self.assertEqual(v1, v2, b)
                self.assertEqual(m1, m2, b)
                self.assertLessEqual(ab.positions_evaluated, mm.positions_evaluated)
                fewer += ab.positions_evaluated < mm.positions_evaluated
        self.assertGreater(fewer, 0)

    def test_minimax_counts_leaves_depth_one(self):
        s = make_search(True)
        s.minimax(EMPTY * 23, 1)
        self.assertEqual(s.positions_evaluated, 23)
        s.minimax(EMPTY * 23, 2)
        self.assertEqual(s.positions_evaluated, 23 * 22)

    def test_takes_free_mill(self):
        # White on b1, d1; f1 empty: placing f1 makes a mill.
        b = set_at(set_at(EMPTY * 23, 3, WHITE), 4, WHITE)
        b = set_at(b, 22, BLACK)
        v, best = make_search(True).minimax(b, 1)
        self.assertEqual(best[5], WHITE)
        self.assertEqual(best[22], EMPTY)


class AgentTests(unittest.TestCase):
    def test_agent_moves_are_legal(self):
        rng = random.Random(3)
        for move_number in (1, 2, 17, 18, 19, 20, 41, 42):
            color = WHITE if move_number % 2 else BLACK
            if move_number <= 18:
                b = random_board(rng, 4, 4)
            else:
                b = random_board(rng)
            best, info = choose_move(b, color, move_number, time_limit=1.0)
            ok, msg = check(b, best, color, move_number)
            self.assertTrue(ok, f"{b} -> {best}: {msg}")
            self.assertGreaterEqual(info["depth"], 1)

    def test_agent_finds_winning_capture(self):
        # Midgame: black has 3 pieces; white can close a mill and win.
        b = list(EMPTY * 23)
        for j in (3, 4, 12, 9):  # white b1 d1 f3 b3; f3->f1 closes b1 d1 f1
            b[j] = WHITE
        for j in (20, 21, 13):    # black a6 d6 g3
            b[j] = BLACK
        b = "".join(b)
        best, info = choose_move(b, WHITE, 25, time_limit=2.0)
        self.assertEqual(best.count(BLACK), 2)

    def test_agent_avoids_threefold_repetition_when_ahead(self):
        rng = random.Random(11)
        b = random_board(rng)
        best, _ = choose_move(b, WHITE, 41, time_limit=0.5, max_depth=2)
        # Pretend the chosen position already occurred twice after our moves.
        history = ["x" * 23] * 40
        history[38] = best  # after move 39 (ours)
        history[36] = best  # after move 37 (ours)
        again, info = choose_move(b, WHITE, 41, time_limit=0.5, max_depth=2, history=history)
        if info["score"] > 0:
            self.assertNotEqual(again, best)


class CommandLineTests(unittest.TestCase):
    PROGRAMS = [
        ("MiniMaxOpening.py", True), ("ABOpening.py", True),
        ("MiniMaxOpeningBlack.py", True), ("MiniMaxOpeningImproved.py", True),
        ("MiniMaxGame.py", False), ("ABGame.py", False),
        ("MiniMaxGameBlack.py", False), ("MiniMaxGameImproved.py", False),
    ]

    def run_program(self, name, board, depth):
        with tempfile.TemporaryDirectory() as tmp:
            inp, out = os.path.join(tmp, "in.txt"), os.path.join(tmp, "out.txt")
            with open(inp, "w") as f:
                f.write(board + "\n")
            proc = subprocess.run(
                [sys.executable, os.path.join(ROOT, name), inp, out, str(depth)],
                capture_output=True, text=True, check=True,
            )
            with open(out) as f:
                return proc.stdout, f.read().strip()

    def test_programs_output_format_and_legality(self):
        opening_board = "xxxxxxWxxxxBxxxxxxxxxxx"
        game_board = "WxWWxWWWWWBBBBBBBBxxxxx"
        for name, opening in self.PROGRAMS:
            board = opening_board if opening else game_board
            stdout, result = self.run_program(name, board, 2)
            lines = stdout.strip().splitlines()
            self.assertTrue(lines[0].startswith("Board Position: "), name)
            self.assertTrue(lines[1].startswith("Positions evaluated by static estimation: "))
            self.assertTrue(lines[2].startswith("MINIMAX estimate: "))
            self.assertEqual(lines[0].split(": ")[1], result)
            color = BLACK if "Black" in name else WHITE
            self.assertIn(result, generate_moves_for(board, color, opening), name)


if __name__ == "__main__":
    unittest.main()
