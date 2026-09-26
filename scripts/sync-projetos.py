#!/usr/bin/env python3
"""Compat: usa scripts/sync-catalogos.py."""

from pathlib import Path
import runpy

runpy.run_path(str(Path(__file__).with_name("sync-catalogos.py")), run_name="__main__")
