import paho.mqtt.client as mqtt

"""
--------------------------------------------------------
----------Initial configuration for MQTT client---------
--------------------------------------------------------
"""

CLIENT_NAME = ''
MQTT_SERVER_HOST = ''
TOPIC = ''
# creating a client
client = mqtt.Client(CLIENT_NAME)
# conecting to broker
client.connect(host=MQTT_SERVER_HOST, port=1883)
print("Conecting to Broker!!!")
# broker subcription
client.subscribe(topic=TOPIC, qos=2)
print("subscribing to a topic!!!")
