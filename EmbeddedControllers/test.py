#!/usr/bin/env python  
   
from lirc import Lirc  

# Initialise the Lirc config parser  
lircParse = Lirc('/etc/lirc/lircd.conf')  
   
   

device_id="topfield"
op="KEY_1"
   
 

# Send message to Lirc to control the IR  
lircParse.send_once(device_id, op)  
