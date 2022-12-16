# opcode table by izik1
# https://izik1.github.io/gbops/

# opcode format: opcode name length duration flags prefixed
# example: 0 "NOP" 1 4t ---- f

from bs4 import BeautifulSoup

def opcodes_from_table(table, prefixed):
    opcodes = []
    table_body = table.find("tbody")

    rows = table_body.find_all("tr")
    for row in rows:
        cols = row.find_all("td")
        for col in cols:
            opcode = opcode_processor(col, prefixed)
            if opcode is not None: opcodes.append(opcode)
    
    return opcodes

def opcode_processor(col, prefixed):
    code = col["data-index"]
    name = ""
    length_time = ""
    flags = ""
    prefixed = "t" if prefixed else "f"
    
    i = 0
    strings = col.stripped_strings
    for string in strings:
        if i == 0:
            name = '"' + string + '"'
        elif i == 1:
            length_time = string
        elif i == 2:
            flags = string

        i += 1
    
    if i == 3:
        return f"{code} {name} {length_time} {flags} {prefixed}"

page = open("resources/gbops.htm", "r")
soup = BeautifulSoup(page, "html.parser")
unprefixed_table = soup.find("table", id="unprefixed-16-t")
prefixed_table = soup.find("table", id="cbprefixed-16-t")
opcodes = opcodes_from_table(unprefixed_table, False) + opcodes_from_table(prefixed_table, True)

f = open("resources/opcodes", "w")

for opcode in opcodes: f.write(opcode + "\n")
f.truncate(f.tell() - 1)

f.close()


