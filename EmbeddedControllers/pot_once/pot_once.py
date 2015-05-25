#!/usr/bin/python
from __future__ import print_function
import botbook_mcp3002 as mcp	# <1>
import time

f = open('lightMeasurements.csv','a')


sleepfor = 15

while True:
	x = str(mcp.readAnalog(0,0))	# <2>
	ts = str(time.time())
	print(x+","+ts, file=f)
	time.sleep(sleepfor)


