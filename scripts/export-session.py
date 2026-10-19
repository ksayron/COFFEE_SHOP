"""Export only visible human/assistant messages, never internal instructions or reasoning."""
import json
import re
import sys
from pathlib import Path

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'evidence'
destination.mkdir(exist_ok=True)
messages = []
for line in source.read_text(encoding='utf-8').splitlines():
    try:
        record = json.loads(line)
    except json.JSONDecodeError:
        continue
    payload = record.get('payload', {})
    role = payload.get('role')
    phase = payload.get('phase')
    if record.get('type') != 'response_item' or payload.get('type') != 'message':
        continue
    if role == 'assistant' and phase not in ('commentary', 'final_answer', 'final'):
        continue
    if role not in ('user', 'assistant'):
        continue
    text = '\n'.join(item.get('text', '') for item in payload.get('content', [])
                     if item.get('type') in ('input_text', 'output_text', 'text'))
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    # Desktop metadata is not a human message; omit it from the visible transcript.
    text = re.sub(r'<environment_context>.*?</environment_context>', '', text, flags=re.S)
    text = re.sub(r'<external_codex_apps_open_page>.*?</external_codex_apps_open_page>', '', text, flags=re.S).strip()
    if text:
        messages.append({'timestamp': record.get('timestamp'), 'role': role, 'phase': phase, 'text': text})

(destination / 'ai-session.jsonl').write_text(''.join(json.dumps(item, ensure_ascii=False) + '\n' for item in messages), encoding='utf-8', newline='\n')
markdown = ['# Visible AI session export', '',
            'Authentic visible human/assistant messages exported from this Codex conversation.',
            'Internal instructions, private reasoning and raw tool payloads are excluded.',
            'Desktop environment/page metadata is omitted; this covers the available implementation segment.',
            'Tool results, source changes and original images are documented separately in the repository.',
            'This snapshot stops before the final handoff; it is not a Claude Code export.', '']
for item in messages:
    markdown.extend([f"## {item['timestamp']} · {item['role']} · {item['phase'] or 'message'}", '',
                     '````text', item['text'], '````', ''])
(destination / 'ai-session.md').write_text('\n'.join(markdown), encoding='utf-8', newline='\n')
print(f'Exported {len(messages)} visible messages; no internal instructions/reasoning/tool payloads.')
