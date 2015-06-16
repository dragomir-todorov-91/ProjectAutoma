#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Приложение за периодичен запис на отчитания на температурата в cloud платформата parse.com
import os, sys
import json
import csv
import datetime
from pprint import pprint
from utils import printTitle, printSubTitle, printExplain, printTab, printError
import urllib.request,urllib.error
import sys

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
class TempReadings(ParseObject):
    pass

# Дефинираме функция за запис в Parse
def saveToParse(temperature):
    temperature.save()
    
# Дефинираме функция за проверка на интернет достъп
def internet_on():
    try:
        response=urllib.request.urlopen('http://www.google.com',timeout=1)
        return True
    except urllib.error.URLError as err: pass
    return False
    
# Четем файла и обхождаме данните за качване
r = csv.reader(open('temp.csv', 'r')) # CSV файл, съдържащ отчитанията
lines = [l for l in r]

# При неналичие на интернет достъп терминираме програмата
if(internet_on()==False):
	print(internet_on())
	sys.exit(0)

for row in lines:
	if int(row[2])==0:
		print (row)
		# Тук сме създали обект TempReadings -> това ни служи за името на таблицата в която ще пишем
		Temp = TempReadings()
		# Попълваме необходимите колони на таблицата
		# | Date | Time | Value | ?
		t=datetime.datetime.fromtimestamp(float(row[1]))
		Temp.date = t.strftime('%Y-%m-%d')
		Temp.time = t.strftime('%H:%M:%S')
        # Стойност на температурата по предварителен коефициент:
		Temp.value = int(row[0])/3.3
		saveToParse(Temp)
		row[2] = 1
		print (row)
		

writer = csv.writer(open('temp.csv', 'w', newline=''))
writer.writerows(lines)