#!/usr/bin/python
from __future__ import print_function
import botbook_mcp3002 as mcp	# <1>
import time
import os #
from test import Output

def writeSensor(fileH):
	x = str(mcp.readAnalog(0,0))	# <2>
	ts = str(time.time())
	print(x+","+ts, file=fileH)
	print (x+","+ts)

def writeTemperature(fileH):
        x = str(mcp.readAnalog(0,0))    # <2>
        ts = str(time.time())
        print(x+","+ts, file=fileH)
        print (x+","+ts)



f = open('lightMeasurements.csv','a')

pinH = Output()

#open pin 4

while True:
	pinH.open(4,"out")
	#wait for pin to go high
	time.sleep(1)
	#measure light
	writeSensor(f)
	print("test")		
	pinH.close(4)
	#sleep for a second to avoid high voltage on pin 4
	time.sleep(3)
	pinH.open(17,"out")
	#wait for pin to go high
        time.sleep(1)
        #measure temperature
	writeTemperature(f)
        print("test")
        pinH.close(17)
	#wait for the amaount of time set in configuration
        time.sleep(3)

