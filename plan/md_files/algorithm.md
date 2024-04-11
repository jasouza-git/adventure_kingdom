# Physics
- Generation
    - cdr
    - cdr_it
    - random
- Physics



# Catalan and Dyck Algorithm
[Catalan Numbers](https://en.wikipedia.org/wiki/Catalan_number)
```python
import random

def c(n):
    o = 1
    for k in range(2, n+1): o *= (n+k)/k
    return o

def cdrg(n): # Catalan Number, Dyck Word, Random Generation
    if n < 2: return n
    o = 0
    x = 0
    y = 0
    for i in range(0, 2*n):
        if x == y or (x < n and random.choice([True,False])):
            o += 2**i
            x += 1
        else: y += 1
    return o
def cdg(n): # Catalan Number, Dyck Word, Generation
    # Get length and position
    k = 1
    m = 1
    d = 0
    while n >= m:
        d = m
        k += 1
        m += c(k)
    m = int(n-d)
    
    if k < 2: return k
    o = 0
    x = 0
    y = 0
    d = 0
    for i in range(0, 2*k):
        if x == y:
            o += 2**i
            x += 1
        elif x < n:
            if (m>>d)&1:
                o += 2**i
                x += 1
            else: y += 1
            d += 1
        else: y += 1
    
    return o
```