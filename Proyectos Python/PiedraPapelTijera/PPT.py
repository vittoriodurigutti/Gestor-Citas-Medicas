import random

def jugar (player, pc):
    options= ["piedra", "papel", "tijera"]

    if player == pc: return "empate"
    if player == "piedra":
        if pc == "tijera":
            return "jugador gana"
        else: return "pc gana"
    
    if player == "tijera":
        if pc == "papel":
            return "jugador gana"
        else: return "pc gana"

    if player == "papel":
        if pc == "piedra":
            return "jugador gana"
        else: return "pc gana"

def main():
    print ("Bienvenido a Piedra, papel o tijera")
    player = input ("Elije:  piedra, papel o tijera:").lower()
    pc = random.choice (["piedra", "papel", "tijera"])
    resultado = jugar (player, pc)
    print (f"Jugador eligio {player}")
    print (f"PC eligio {pc}")
    print (resultado)

if __name__ == '__main__':
    main()