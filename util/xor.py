#!/usr/bin/env python3

import sys

def xor(a, b):
    out = bytearray()
    for x in a:
        out.append(x ^ b)
    return bytes(out)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("usage: {} in-file out-file enc-byte".format(sys.argv[0]))
        print("where enc-byte is a hex encoded byte (e.g. f7)")
    else:
        in_file = sys.argv[1]
        out_file = sys.argv[2]
        enc_byte = int(sys.argv[3], 16)
        with open(in_file, "rb") as inf:
            out_data = xor(inf.read(), enc_byte)
        with open(out_file, "wb") as of:
            of.write(out_data)
