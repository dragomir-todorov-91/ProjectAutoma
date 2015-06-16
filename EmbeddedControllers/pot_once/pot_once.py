#!/usr/bin/python
from __future__ import print_function
import botbook_mcp3002 as mcp	# <1>
import time
import os #
from test import Output

class Sensor:

	def writeSensor(self,fileH):
		x = str(mcp.readAnalog(0,0))	# <2>
		ts = str(time.time())
		print(x+","+ts+","+"0",file=fileH)
		print (x+","+ts)
		return x

	def writeTemperature(self,fileH):
        	x = str(mcp.readAnalog(0,0))    # <2>
	        ts = str(time.time())
        	print(x+","+ts+","+"0",file=fileH)
	        print (x+","+ts)
		return x

	def readLight(self):
		f = open('lightMeasurements.csv','a')
		pinH = Output()
		#open pin 4
		pinH.open(4,"out")
		#wait for pin to go high
		time.sleep(1)
		#measure light
		value = self.writeSensor(f)
		pinH.close(4)
		#sleep for a second to avoid high voltage on pin 4
		time.sleep(1)
		return value

	def readTemperature(self):
		f = open('temperatureMeasurements.csv','a')
                pinH = Output()
		pinH.open(17,"out")
		#wait for pin to go high
	        time.sleep(1)
	        #measure temperature
		value = self.writeTemperature(f)
	        print("test")
	        pinH.close(17)
		return value
