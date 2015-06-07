from test import Output
import time

out = Output()

print "open"
out.open(18,"out")
time.sleep(10)
out.close(18)
