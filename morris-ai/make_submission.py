"""
make_submission.py - build the ZIP to submit.

Each program imports the shared morris_core.py while we develop. For the
submission we paste morris_core.py into every program, so each submitted .py
file runs on its own, exactly as the project handout lists them. Then we
smoke-test every bundled file in an empty directory and zip everything.

Usage: python make_submission.py [team id, e.g. T07]
Output: submission/ and morris_submission[_T07].zip
"""

import os
import shutil
import subprocess
import sys
import tempfile
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "submission")
IMPORT_LINE = "from morris_core import *"

PROGRAMS = [
    "MiniMaxOpening.py", "MiniMaxGame.py", "ABOpening.py", "ABGame.py",
    "MiniMaxOpeningBlack.py", "MiniMaxGameBlack.py",
    "MiniMaxOpeningImproved.py", "MiniMaxGameImproved.py",
    "TournamentAgent.py",
]
TEXT_FILES = ["Examples.txt", "MyStaticEstimation.txt"]


def bundle(program, core):
    with open(os.path.join(HERE, program)) as f:
        lines = f.read().splitlines(keepends=True)
    out, inlined = [], False
    for line in lines:
        if line.startswith(IMPORT_LINE):
            out.append("# ---- begin shared code (morris_core.py) ----\n")
            out.append(core)
            out.append("# ---- end shared code ----\n")
            inlined = True
        else:
            out.append(line)
    if not inlined:
        raise SystemExit(f"{program}: no '{IMPORT_LINE}' line to inline")
    return "".join(out)


def smoke_test(path, name):
    with tempfile.TemporaryDirectory() as tmp:
        shutil.copy(path, tmp)
        inp, out = os.path.join(tmp, "in.txt"), os.path.join(tmp, "out.txt")
        opening = "Opening" in name or name == "TournamentAgent.py"
        board = "xxxWxBxxxBxxxxxxxWxxxxx" if opening else "xxxxxBxWWWWWBBBBxxxxxxx"
        with open(inp, "w") as f:
            f.write(board + "\n")
        args = [inp, out, "W", "5", "--time", "2"] if name == "TournamentAgent.py" else [inp, out, "2"]
        subprocess.run([sys.executable, name] + args, cwd=tmp, check=True,
                       capture_output=True, text=True)
        with open(out) as f:
            result = f.read().strip()
        if len(result) != 23:
            raise SystemExit(f"{name}: bad output board {result!r}")


def main():
    team = sys.argv[1] if len(sys.argv) > 1 else None
    with open(os.path.join(HERE, "morris_core.py")) as f:
        core = f.read()

    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)
    for program in PROGRAMS:
        path = os.path.join(OUT, program)
        with open(path, "w") as f:
            f.write(bundle(program, core))
        smoke_test(path, program)
        print(f"ok  {program}")
    for name in TEXT_FILES:
        shutil.copy(os.path.join(HERE, name), OUT)
        print(f"ok  {name}")

    zip_name = f"morris_submission_{team}.zip" if team else "morris_submission.zip"
    with zipfile.ZipFile(os.path.join(HERE, zip_name), "w", zipfile.ZIP_DEFLATED) as z:
        for name in PROGRAMS + TEXT_FILES:
            z.write(os.path.join(OUT, name), name)
    print(f"wrote {zip_name}")


if __name__ == "__main__":
    main()
