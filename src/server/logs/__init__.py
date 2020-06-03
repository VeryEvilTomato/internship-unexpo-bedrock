from . import mqtt
import time
"""
Loop_start: 
Starts a loop in another thread and lets the main thread continue.
It also handles reconnects automatically
"""
mqtt.client.loop_start()
