import os

TARGET_FOLDERS = ["components", "app"]
OUTPUT_FILE = "sponsorbridge_extracted_text.txt"

TEXT_EXTENSIONS = {
    ".js", ".jsx", ".ts", ".tsx",
    ".json", ".md", ".txt",
    ".html", ".css", ".scss",
    ".yml", ".yaml", ".mjs"
}

SKIP_DIR_NAMES = {
    "node_modules", ".next", "dist", "build", ".git", ".turbo", "coverage"
}

def is_text_file(filename):
    name = filename.lower()
    if name in {".env", ".gitignore"}:
        return True
    if name.endswith(".d.ts"):
        return True
    _, ext = os.path.splitext(name)
    return ext in TEXT_EXTENSIONS

with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
    for folder in TARGET_FOLDERS:
        if not os.path.exists(folder):
            print(f"Missing folder: {folder}")
            continue

        for root, dirs, files in os.walk(folder):
            dirs[:] = [d for d in dirs if d not in SKIP_DIR_NAMES]

            for file in sorted(files):
                if is_text_file(file):
                    path = os.path.join(root, file)
                    try:
                        with open(path, "r", encoding="utf-8", errors="ignore") as f:
                            out.write("\n")
                            out.write("-" * 80 + "\n")
                            out.write(f"FILE: {path}\n")
                            out.write("-" * 80 + "\n\n")
                            out.write(f.read().strip())
                            out.write("\n\n")
                            print(f"Added: {path}")
                    except Exception as e:
                        print(f"Skipped {path}: {e}")

print(f"\nDONE. Saved to {OUTPUT_FILE}")