import paho.mqtt.client as mqtt

"""
    Tuve que crear el cliente MQTT como una clase para que fuera
    más sencillo importarlo, eso bajo experimentación.

    El constructor de la clase (__init__) instancia el cliente
    MQTT y nosotros solo accedemos a él a través de los métodos
    que tiene (como publish, que no es el mismo publish de mqtt.client)
"""

"""
--------------------------------------------------------
----------Initial configuration for MQTT client---------
--------------------------------------------------------
"""

CLIENT_NAME = "Django"
MQTT_SERVER_HOST = '0.0.0.0'
PORT = 1883
TOPIC = 'dev/ESP32'
PASSWORD = "24963808"
CLEAN_SESSION = False
QOS = 2


def on_connect(client, userdata, flags, rc):
    print("Connected flags", str(flags), "Result code", str(rc))
    client.subscribe('house', qos=0)

def on_message(client, userdata, message):
    print("message received", str(message.payload.decode("utf-8")))


def on_publish(client, userdata, mid):
    print("message published")

class MqttClient():
    def __init__(self):
        self.client = mqtt.Client(CLIENT_NAME, clean_session=CLEAN_SESSION)
        self.client.username_pw_set(CLIENT_NAME, PASSWORD)
        self.client.on_connect = on_connect
        self.client.on_message = on_message
        self.client.on_publish = on_publish
        self.client.connect(host=MQTT_SERVER_HOST, port=PORT)
        self.client.loop_start()
    def publish(self):
        self.client.publish('house', payload='1', qos=0, retain=False)

client = MqttClient()

# despues de conectarme y subscribirme al topico quiero hace una condicion tipo:
""" 
if flag:
    client.publish('dev/ESP32', "aqui va el mensaje", qos=QOS)
    flag = False
la bandera deberia ser (flag=True) cuando alguien mande un POST a (api/logs)
y la respuesta sea correcta. eso es todo 
"""
