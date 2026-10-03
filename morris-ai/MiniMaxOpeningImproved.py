"""
MiniMaxOpeningImproved.py - White's best opening move with MINIMAX and our improved static estimation (Part IV).

Usage: python MiniMaxOpeningImproved.py <input board file> <output board file> <depth>
"""

import sys

from morris_core import *  # inlined by make_submission.py

if __name__ == "__main__":
    run_program(sys.argv, opening=True, improved=True)
