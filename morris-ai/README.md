# Morris AI Tournament (CS4346)

Reference implementation of the *Morris Game, Variant* programming project:
MINIMAX, ALPHA-BETA, playing Black, an improved static estimation, and a
tournament agent. Python 3.8+ with no dependencies.

> This folder is separate from the website in the rest of the repository. It
> does not affect the site build.

## Files

| Deliverable | File | Part |
|---|---|---|
| White opening move, MINIMAX | `MiniMaxOpening.py` | I |
| White midgame/endgame move, MINIMAX | `MiniMaxGame.py` | I |
| Same with ALPHA-BETA | `ABOpening.py`, `ABGame.py` | II |
| Black moves (color swapping) | `MiniMaxOpeningBlack.py`, `MiniMaxGameBlack.py` | III |
| Improved static estimation | `MiniMaxOpeningImproved.py`, `MiniMaxGameImproved.py`, `MyStaticEstimation.txt` | IV |
| Tournament player | `TournamentAgent.py` | V |
| Sample runs, incl. ALPHA-BETA < MINIMAX cases | `Examples.txt` | I, II |

Shared code lives in **`morris_core.py`**: board geometry, the handout's move
generators, the static estimators, and MINIMAX/ALPHA-BETA. The program files
are thin wrappers around it.

Tools (not submitted):

- `make_submission.py [T07]` pastes `morris_core.py` into every program, so
  each submitted file is self-contained. It then runs each one in an empty
  folder and writes `morris_submission.zip`.
- `make_examples.py` regenerates `Examples.txt`.
- `check_move.py` checks whether an opponent's posted board is legal.
- `play.py` runs practice games between engines (agent, basic, improved, random).
- `tests/` holds unit tests: `python -m unittest discover -s tests`

## Running the Part I–IV programs

```
python MiniMaxOpening.py board1.txt board2.txt 2
Board Position: ...
Positions evaluated by static estimation: ...
MINIMAX estimate: ...
```

All eight programs take the same arguments and print the same three lines.
The chosen board is also written to the output file.

## Tournament day

```
# White makes the odd-numbered moves and Black the even ones.
# Here we are Black, White just posted move 21, and we make move 22.
echo "WxWWxWWWWWBBBBBBBBxxxxx" > in.txt
python TournamentAgent.py in.txt out.txt B 22 --time 60 --history game.txt
```

It prints the board as an ASCII picture and a description of the move
("f3 -> f5, remove a3"). It also prints the exact text to paste into Teams:

```
Move 22 - Black
WxWWxWWWWWBBxBBBBBxBxxx
```

Workflow for the designated communicator:

1. Copy the opponent's board into `in.txt`, then check it:
   `python check_move.py <our last board> <their board> <their color> <their move number>`.
   An illegal move that isn't corrected within its 4 minutes is a win for us,
   so say so in the chat.
2. Append their board to `game.txt`, one board per line in move order. The
   agent uses this file to avoid a threefold-repetition draw when it is ahead.
3. Run the agent with the **move number we are making**. The move number
   decides when the opening ends (moves 1–18 are placements), so keep it
   right. The agent warns if the number doesn't match the color.
4. Paste the "Post this in Teams" lines, then append our board to `game.txt`.

The 4-minute limit includes copying and pasting, so keep `--time` at 60–90 s.
Iterative deepening means the agent always has a move ready when its time
runs out.

## Design decisions to confirm with the instructor / TA

These are interpretations of the handouts. Check them before submitting:

1. **Positions evaluated** counts calls to the static estimation at search
   leaves. Move generation inside the handout's midgame estimate (counting
   Black's moves) is not counted.
2. **Leaves:** a node is a leaf when the depth is used up, when the game is
   over in the midgame (a side has ≤ 2 pieces), or when the side to move has
   no moves.
3. **Opening programs** use opening moves at every level of the tree, as the
   handout's `GenerateMovesOpening` implies, even if the search runs past
   move 18. Only `TournamentAgent.py` tracks the move number and switches
   phase inside the search.
4. **Black programs** report the MINIMAX estimate from Black's point of view,
   which follows naturally from color swapping.
5. **Tie-breaking:** the first best move in generation order (location
   index 0→22) wins. ALPHA-BETA uses the same order, so it returns the same
   move as MINIMAX, as the project requires.
6. **GenerateRemove:** if every opposing piece is in a mill, nothing is
   removed, exactly as written in the handout.

## Things the team must be able to explain (project §16)

- How `neighbors`/`close_mill` map onto the board picture. The tables in
  `morris_core.py` are commented with location names, and `render_board()`
  draws a board.
- Why ALPHA-BETA returns the same value and move as MINIMAX while evaluating
  fewer positions. The tests check this on random boards.
- How color swapping turns a White move generator into a Black one.
- The reasoning behind each term in `MyStaticEstimation.txt`.

Note: the course rules forbid sharing this code or its prompts with other
teams.
