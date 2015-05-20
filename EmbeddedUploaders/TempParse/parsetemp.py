# Приложение за периодичен запис на температурни отчитания в cloud платформата parse.com
import os, sys
from utils import printTitle, printSubTitle, printExplain, printTab, printError

#APPLICATION_ID и REST_API_KEY от регистрирания проект в Parse.com
APPLICATION_ID = "WxrA9CtdMQ1kVF3sZgxtWdqDxsOhJC1bkvr5NyKL"
REST_API_KEY = "Vq6yZVkcHJUbiCNADmMgwN5ldsvTjvS23cGTQwG7"

# Използваме ParsePy framework, вкарваме нужните библиотеки от него
from parse_rest.connection import register, ParseBatcher

# Задаваме псевдоним на проекта, за да е ясно че не е обикновен Python Object
from parse_rest.datatypes import Object as ParseObject

# Регистрираме текущото приложение с проекта
register(APPLICATION_ID, REST_API_KEY)

# Създаваме клас TempReading, наследник на клас ParseObject
class TempReadings(ParseObject):
    pass

# Тук сме създали обект TempReadings -> това ни служи за името на таблицата в която ще пишем
Temp = TempReadings()

# Попълваме необходимите колони на таблицата
# | Date | Time | Value | ?
Temp.Date = '15.05.2015'
Temp.Time = '12:00:03'
Temp.Value = 100

def saveToParse(Temp):
    print("Saving...")
    Test.save()
    print("Done!")

# Извикваме функцията с обекта Temp
saveToParse(Temp)