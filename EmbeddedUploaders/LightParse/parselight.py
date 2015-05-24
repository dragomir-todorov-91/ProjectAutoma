# Приложение за периодичен запис на отчитания на светлината в cloud платформата parse.com
import os, sys
from utils import printTitle, printSubTitle, printExplain, printTab, printError

#This is the parse.com application and api keys
APPLICATION_ID = "WxrA9CtdMQ1kVF3sZgxtWdqDxsOhJC1bkvr5NyKL"
REST_API_KEY = "Vq6yZVkcHJUbiCNADmMgwN5ldsvTjvS23cGTQwG7"

# Използваме ParsePy framework, вкарваме нужните библиотеки от него
from parse_rest.connection import register, ParseBatcher

# Задаваме псевдоним на проекта, за да е ясно че не е обикновен Python Object
from parse_rest.datatypes import Object as ParseObject

# Регистрираме текущото приложение с проекта
register(APPLICATION_ID, REST_API_KEY)

# Създаваме клас LightReading, наследник на клас ParseObject
class LightReadings(ParseObject):
    pass

# Тук сме създали обект LightReadings -> това ни служи за името на таблицата в която ще пишем
Light = LightReadings()

# Попълваме необходимите колони на таблицата
# | Date | Time | Value | ?
Light.date = '15.05.2015'
Light.time = '12:00:03'
Light.value = 100

def saveToParse(Light):
    print("Saving...")
    Light.save()
    print("Done!")

# Извикваме функцията с обекта Light
saveToParse(Light)