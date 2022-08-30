import string
import random

characters = list(string.ascii_letters + string.digits + "!@#$%^&*()-_")

char_arr = []

for i in range(50):
    char_arr.append(random.choice(characters))

print (''.join(char_arr))
