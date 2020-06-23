import paho.mqtt.client as mqtt

"""
--------------------------
Variables definition
--------------------------
"""
CLIENT_NAME = "GSM_Module"
MQTT_SERVER_HOST = 'localhost'
PORT = 1883
TOPIC = 'dev/ESP32'
PASSWORD = "24963808"
CLEAN_SESSION = False
QOS = 0

"""
----------------------------
Callbacks
----------------------------
"""
def on_connect(client, userdata, flags, rc):
    print("Connected flags", str(flags), "Result code", str(rc))
    client.subscribe('house', qos=0)


def on_message(client, userdata, message):
    print("message received", str(message.payload.decode("utf-8")))


def on_publish(client, userdata, mid):
    print("message published")


# Create a client instance
client = mqtt.Client(CLIENT_NAME, clean_session=CLEAN_SESSION)
client.username_pw_set(CLIENT_NAME, PASSWORD)  # Password set
client.on_connect = on_connect  # Attach function to callback
client.on_message = on_message
client. on_publish = on_publish
client.connect(host=MQTT_SERVER_HOST, port=PORT)  # Connect to broker
client.subscribe(topic="dev/GSM_Module", qos=QOS)
