import os

def find_text_in_files(directory, query):
    matches = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.js', '.jsx', '.css', '.html')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        for line_num, line in enumerate(f, 1):
                            if query in line:
                                matches.append((filepath, line_num, line.strip()))
                except Exception as e:
                    pass
    return matches

for match in find_text_in_files('src', 'rwanda-hills'):
    print(f"Match found: {match[0]}:{match[1]}: {match[2]}")
