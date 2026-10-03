"""
ABGame.py - White's best midgame/endgame move with ALPHA-BETA (Part II).

Usage: python ABGame.py <input board file> <output board file> <depth>
"""

import sys

from morris_core import *  # inlined by make_submission.py

if __name__ == "__main__":
    run_program(sys.argv, opening=False, use_alphabeta=True)
