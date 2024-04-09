# secuencia de fibonacci usando bucle con while
n = 10
num1 = 0
num2 = 1
next_num = num2
count = 1

while count <= n:
    print (next_num, end=' ')
    count +=1
    num1, num2 = num2, next_num
    next_num = num1 + num2
print ()

#secuencia de fibonacci usando recursion
def fibonacci(n):

    if n < 0:
        print ('incorrect input')
    elif n == 0:
        return 0
    elif n==1 or n==2:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# se indica la posicion de fibonacci que queremos. 
print (fibonacci(2))

# secuencia de fibonacci usando programacion dinamica (considera los dos primeros nros de la secuencia como 0 y 1)
FibArray = [0,1]

def fcci(n):
    if n < 0:
        print ('incorrect input')
    elif n < len(FibArray):
        return FibArray [n]
    else:
        FibArray.append(fcci(n-1)+fcci(n-2))
        return FibArray [n]
    
print (fcci(6))