import paho.mqtt.client as mqtt
import os
import time
import sys
"""
--------------------------------------------------------
----------Initial configuration for MQTT client---------
--------------------------------------------------------
"""

CLIENT_NAME = "Django"
MQTT_SERVER_HOST = '192.168.1.102'
PORT = 1883
TOPIC = 'dev/ESP32'
PASSWORD = "24963808"
CLEAN_SESSION = False
QOS = 0


def on_connect(client, userdata, flags, rc):
    print("Connected flags", str(flags), "Result code", str(rc))


def on_message(client, userdata, message):
    print("message received", str(message.payload.decode("utf-8")))


def on_publish(client, userdata, mid):
    print("message published", str(message.payload.decode("utf-8")))


# creating a client instance
client = mqtt.Client(CLIENT_NAME, clean_session=CLEAN_SESSION)
client.username_pw_set(CLIENT_NAME, PASSWORD)
client.on_connect = on_connect
client.on_message = on_message
client.on_publish = on_publish
print("Connecting to", MQTT_SERVER_HOST)
client.connect(host=MQTT_SERVER_HOST, port=PORT)
client.subscribe('dev/Django', qos=QOS)

# despues de conectarme y subscribirme al topico quiero hace una condicion tipo:
""" 
if flag:
    client.publish('dev/ESP32', "aqui va el mensaje", qos=QOS)
    flag = False
la bandera deberia ser (flag=True) cuando alguien mande un POST a (api/logs)
y la respuesta sea correcta. eso es todo 
"""
