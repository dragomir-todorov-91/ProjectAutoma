import json
import time
from pot_once import Sensor
from lirc import Lirc
from test import Output
import subprocess
output = Output()
isAirCondOn = 1
while True:
	with open('ManualOverride/data.json') as data_file:    
		data = json.load(data_file)
	if data['turnlight']=="0":
                print "Light turned on manually"
                output.open(18,"out")
	
	if data['turnaircond']=="0":
                print "Aircond turned on manually"
		print "Air cond is turned on!"
                Aircond=Lirc('/etc/lirc/lircd.conf')
                Aircond.send_once('diodnalenta','KEY_1')
                isAirCondOn = 0 

	#call the sensor readings
	sens = Sensor()
	#light
	lightLevel = sens.readLight()
	lightLevel2=(int(lightLevel)-40)/2.6
	print  lightLevel2
	#temp
	temperature = sens.readTemperature()
	#turn light on
	if float(data['lightlevel']) >= lightLevel2:
		print "Light is turned on!"
		output.open(18,"out")
		time.sleep(2)
		output.close(18)
	#turn air conditioning on
	temperature = float(temperature)/3.3
	#print data['temperature']
	#print temperature
	ctemperature = float(data['temperature'])
        if ((temperature <= (ctemperature-ctemperature*5/100.0)) or (temperature >= (ctemperature+ctemperature*5/100.0))):
            	if  isAirCondOn==1:
			print "Air cond is turned on!"
			Aircond=Lirc('/etc/lirc/lircd.conf')
			Aircond.send_once('diodnalenta','KEY_1')
			isAirCondOn = 0

	if ((temperature > (ctemperature-ctemperature*5/100.0)) and (temperature < (ctemperature+ctemperature*5/100.0))):
		if  isAirCondOn==0:
			print "Air cond is turned off!"
			Aircond=Lirc('/etc/lirc/lircd.conf')
        	        Aircond.send_once('diodnalenta','KEY_2')
			isAirCondOn = 1
    	
	time.sleep(float(data["sleeptime"]))
	subprocess.call("LightParse/parselight.py",shell=True)
 	subprocess.call("TempParse/parsetemp.py",shell=True)
