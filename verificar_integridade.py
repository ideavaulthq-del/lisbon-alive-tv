import json,hashlib,pathlib,sys
base=pathlib.Path(__file__).resolve().parent
m=json.loads((base/'VISUAL_LOCK_MANIFEST.json').read_text(encoding='utf-8'))
fail=[n for n,h in m['sha256'].items() if not (base/n).is_file() or hashlib.sha256((base/n).read_bytes()).hexdigest()!=h]
print('Ficheiros alterados:',fail)
sys.exit(bool(fail))
