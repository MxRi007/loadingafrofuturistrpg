#!/usr/bin/env python3
# Simple generator: scan /posts/*.html and build posts/index.json automatically.
import os, json, re
from datetime import datetime
pdir = os.path.join(os.path.dirname(__file__), 'posts')
entries = []
for fname in os.listdir(pdir):
    if not fname.endswith('.html'): continue
    path = os.path.join('posts', fname)
    full = os.path.join(pdir, fname)
    with open(full, 'r', encoding='utf8') as f:
        text = f.read()
    # title from <title> or first h1/h2/h3
    m = re.search(r'<title>(.*?)</title>', text, re.I)
    title = m.group(1).strip() if m else fname
    # excerpt: first <p> after the first h1/h2
    m2 = re.search(r'<h1.*?>(.*?)</h1>', text, re.I) or re.search(r'<h2.*?>(.*?)</h2>', text, re.I)
    excerpt = ''
    m3 = re.search(r'<p>(.*?)</p>', text, re.I|re.S)
    if m3:
        excerpt = re.sub('\s+',' ', m3.group(1)).strip()
        if len(excerpt)>200: excerpt = excerpt[:197]+'...'
    # date from filename yyyy-mm-dd-*
    date = '1970-01-01'
    mdate = re.match(r'(\d{4}-\d{2}-\d{2})', fname)
    if mdate: date = mdate.group(1)
    entries.append({'title':title,'url':path,'date':date,'excerpt':excerpt})
# sort and write
entries.sort(key=lambda x: x['date'], reverse=True)
with open(os.path.join(pdir,'index.json'),'w',encoding='utf8') as o:
    json.dump(entries,o,indent=2,ensure_ascii=False)
print('Wrote posts/index.json with', len(entries), 'entries.')
