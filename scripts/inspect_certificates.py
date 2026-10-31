import os
import sys
import json
import hashlib
from pypdf import PdfReader

# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

cert_dir = r"D:\PORTFOLIO\temp_certificates"
files = [f for f in os.listdir(cert_dir) if f.endswith('.pdf')]

file_hashes = {}
results = []

for f in sorted(files):
    path = os.path.join(cert_dir, f)
    size = os.path.getsize(path)
    
    with open(path, 'rb') as fp:
        content = fp.read()
        sha256 = hashlib.sha256(content).hexdigest()
    
    file_hashes.setdefault(sha256, []).append(f)
    
    pages_text = []
    try:
        reader = PdfReader(path)
        for i, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            pages_text.append(text.strip())
    except Exception as e:
        pages_text.append(f"ERROR: {e}")

    results.append({
        'filename': f,
        'size': size,
        'pages': len(pages_text),
        'sha256': sha256,
        'text': "\n\n".join(pages_text)
    })

# Check duplicates
duplicates = {h: flist for h, flist in file_hashes.items() if len(flist) > 1}

output_data = {
    'total_files': len(results),
    'duplicates': duplicates,
    'certificates': results
}

with open(r"D:\PORTFOLIO\docs\certificate_inspection.json", "w", encoding="utf-8") as out_fp:
    json.dump(output_data, out_fp, indent=2, ensure_ascii=False)

print(f"Parsed {len(results)} certificates. Saved report to docs/certificate_inspection.json")

for r in results:
    print(f"\n==================================================")
    print(f"FILE: {r['filename']} ({r['size']:,} bytes, {r['pages']} pages, SHA256: {r['sha256'][:10]}...)")
    preview = r['text'].replace('\n', ' ')[:350]
    print(f"TEXT: {preview}")

if duplicates:
    print("\nDUPLICATES DETECTED:")
    for h, flist in duplicates.items():
        print(f"Hash {h[:12]}: {flist}")
else:
    print("\nNo identical hash duplicates.")
