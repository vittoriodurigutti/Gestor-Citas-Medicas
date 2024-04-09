import calendar

#calendario tipo texto. Donde se define Sunday, indicas cual es la primer columna del mes. formatmonth indcas año y mes a crear.


c=calendar.TextCalendar(calendar.SUNDAY)
#str = c.formatmonth (2024, 4)
str = c.formatyear (2024)
print(str)

# calendario creado en formato HTML.
"""c=calendar.HTMLCalendar(calendar.SUNDAY)
str = c.formatmonth (2024,4)
print(str)"""

"""#con la siguiente funcion se puede iterar, monstrando los por ejemplo, dias indicados
c=calendar.TextCalendar(calendar.MONDAY)
for i in c.itermonthdays(2024,5):
    print (i)"""

#con estas funciones se puede indcar los nombres de los meses, o dias establecidos en el calendario
#siendo name el nombre que pongamos a la funcion
#calendar la lista/arreglo del que sacamos los datos
#month_name, o day_name el filtro concreto a seleccionar.
"""for name in calendar.month_name:
    print(name)
for namedays in calendar.day_name:
    print(namedays)
"""
#con esto podemos buscar, por ejemplo el primer lunes de cada mes, y en que fecha cae cada uno.

"""for month in range (1,13): #en un arreglo siempre uno mas del maximo a buscar.
    mycal = calendar.monthcalendar (2024, month) # devuelve lista de semanas que represnetan a cada mes
    week1= mycal[0] # esto para definir que busque en la primer semana, o en la segunda, esegun donde este el primer lunes.
    week2= mycal[1]

    if week1[calendar.MONDAY] !=0: #esto para que no considere los ceros osea dias que no correspondan al mes que buscamos
        auditday=week1[calendar.MONDAY]
    else:
        auditday=week2[calendar.MONDAY]

print ("%10s %2d" % (calendar.month_name[month], auditday))"""