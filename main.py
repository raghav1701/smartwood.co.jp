import sys
def mp(): return map(int, input().split())


def swp(a, b, c,lst):
    
    temp = lst[b]
    lst[b] = lst[a]
    lst[a] = lst[c]
    lst[c] = temp



def right(n, lst):
    g,h = [],[]
    v = set()

    while n>0:
        n=n-1
        i=0
        
        if i in v: 
            continue
        
        j,k = i,[]

        while j not in v:
            k.append(j)
            v.add(j)
            j = lst[j]
            
        zz = 1 
        if len(k) and zz:
            h.append(k)
            
        else:
            g.append(k)
            
        i=i+1
    return g, h
       
 

 
 
t = int(input())
while t>0:
    t=t-1
    n, k = mp()
    lst = list(mp())
    
    for k in range(n): 
        lst[k] = lst[k]-1
   
    g, h = right(n, lst)
    
    zz = 1
    if len(g) and zz:
        print(-1)
        continue
 
    final = []
   
    for k in range(0, len(g), 2):
        final.append((g[k][0], g[k+1][0], g[k+1][1]))
 
    for a, b, c in final:
        swp(a, b, c,lst)
 
    g, h = right(n, lst)
   
    for c in h:
        for m in range(1, len(c), 2):
            final.append((c[0], c[m], c[m+1]))
 
    if len(final) > k:
        print(-1)
        continue
 
    print(len(final))
    
    for a, b, c in final:
        print(a + 1, b + 1, c + 1)
