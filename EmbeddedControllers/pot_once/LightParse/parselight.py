#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Приложение за периодичен запис на отчитания на светлината в cloud платформата parse.com
import os, sys
import json
import csv
import datetime
from pprint import pprint
from utils import printTitle, printSubTitle, printExplain, printTab, printError
import sys

import urllib2

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

# Дефинираме функция за запис в Parse
def saveToParse(Temp):
    Temp.save()
    
# Дефинираме функция за проверка на интернет достъп
def internet_on():
    try:
        response=urllib2.urlopen('http://www.google.com',timeout=1)
        return True
    except urllib2.URLError as err: pass
    return False
    
# Четем файла и обхождаме данните за качване
r = csv.reader(open('../lightMeasurements.csv', 'r')) # CSV файл, съдържащ отчитанията
lines = [l for l in r]

# При неналичие на интернет достъп терминираме програмата
if(internet_on()==False):
	print(internet_on())
	sys.exit(0)

for row in lines:
	if int(row[2])==0:
		print (row)
		# Тук сме създали обект LightReadings -> това ни служи за името на таблицата в която ще пишем
		Light = LightReadings()
		# Попълваме необходимите колони на таблицата
		# | Date | Time | Value | ?
		t=datetime.datetime.fromtimestamp(float(row[1]))
		Light.date = t.strftime('%Y-%m-%d')
		Light.time = t.strftime('%H:%M:%S')
		# Стойност на осветеността по предварително замерена стойност:
		# Определяме минимум и максимум осветеност (min, max)
		# Изчисляваме коефициент: (max - min)/100
		# Използваме коефициент по следния начин: (value-min)/коефициента
		# резултат в проценти!
		Light.value = ((int(row[0]) - 40)/2.6)
		saveToParse(Light)
		row[2] = 1
		print (row)
		

writer = csv.writer(open('../lightMeasurements.csv', 'w', newline=''))
writer.writerows(lines)