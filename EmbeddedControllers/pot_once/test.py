import time #
import os #

class Output:
	def writeFile(self, filename, contents): 
		with open(filename, 'w') as f: 
			f.write(contents) 


	def open(self, pin, direction):
		pin = str(pin)
		# main
		print "Opening LED on GPIO "+pin+" once..."
		if not os.path.isfile("/sys/class/gpio/gpio"+pin+"/direction"):
			self.writeFile("/sys/class/gpio/export", pin) 
		self.writeFile("/sys/class/gpio/gpio"+pin+"/direction", direction)
		if direction in ["out"]:
			self.writeFile("/sys/class/gpio/gpio"+pin+"/value", "1") 
		
	def close(self,pin):
		pin=str(pin)
		if not os.path.isfile("/sys/class/gpio/gpio"+pin+"/direction"): #
<<<<<<< HEAD
			self.writeFile("/sys/class/gpio/export", pin) 
=======
			self.writeFile("/sys/class/gpio/export", pin) #
>>>>>>> e7d2e6e9463b163cbc7ba50a80bf70f0c55633af
		self.writeFile("/sys/class/gpio/gpio"+pin+"/value", "0")
