import json
import time
from pot_once import Sensor
from lirc import Lirc
from test import Output
import subprocess
output = Output()
isAirCondOn = False
while True:
	with open('ManualOverride/data.json') as data_file:    
		data = json.load(data_file)
	
	if data['turnlight']=="1":
		print "Light turned on manually"
	if data['turnaircond']=="1":
                print "Aircond turned on manually"
	#call the sensor readings
	sens = Sensor()
	#light
	lightLevel = sens.readLight()
	#temp
	temperature = sens.readTemperature()
	#turn light on
	if data['lightlevel'] >= lightLevel:
		print "Light is turned on!"
		output.open(18,"out")
	else:
		output.close(18)
	#turn air conditioning on
	temperature = float(temperature)/3.3
	print data['temperature']
	print temperature
	ctemperature = float(data['temperature'])
        if ((temperature <= (ctemperature-ctemperature*5/100.0)) or (temperature >= (ctemperature+ctemperature*5/100.0))):
            	if not isAirCondOn:
			print "Air cond is turned on!"
			Aircond=Lirc('/etc/lirc/lircd.conf')
			Aircond.send_once('topfield','KEY_1')
			isAirCondOn = True

	if ((temperature > (ctemperature-ctemperature*5/100.0)) and (temperature < (ctemperature+ctemperature*5/100.0))):
		print "ala bala nica"
		if isAirCondOn:
			print "testfddsgd";
			print "Air cond is turned off!"
			Aircond=Lirc('/etc/lirc/lircd.conf')
        	        Aircond.send_once('topfield','KEY_1')
			isAirCondOn = False
    	
	time.sleep(float(data["sleeptime"]))
	subprocess.call("LightParse/parselight.py",shell=True)
 	subprocess.call("TempParse/parsetemp.py",shell=True)
