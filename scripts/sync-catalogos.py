#!/usr/bin/env python3
"""Lista pastas com index.json e grava manifest.json em projetos/ e artigos/."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def sync(folder_name: str) -> list[str]:
    folder = ROOT / folder_name
    folders = sorted(
        path.name
        for path in folder.iterdir()
        if path.is_dir()
        and not path.name.startswith("_")
        and (path / "index.json").is_file()
    )
    (folder / "manifest.json").write_text(
        json.dumps({"folders": folders}, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"{folder_name}/manifest.json ->", ", ".join(folders) or "(vazio)")
    return folders


if __name__ == "__main__":
    sync("projetos")
    sync("artigos")
