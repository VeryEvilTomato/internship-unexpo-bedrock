from gsm_function import TextMessage, serialPort
from psql_function import PgClient
from mqtt_client import on_connect, on_message, on_publish
from mqtt_client import client, TOPIC, QOS
import string
import time

gate = False

sms = TextMessage(b'+584124999133', b'Modulo gsm en linea!\r\n')
sms.sendMessage()
sms.deleteMessage()
sms.receiveMessage()
serialPort.flushInput()
gsmClient = PgClient()
client.loop_start()

while True:
    resp = serialPort.read(serialPort.inWaiting())
    
    if resp != b'':
        print ("Response:")
        sms.readMessage()
        resp = serialPort.read(serialPort.inWaiting())
        print (resp)
        s = str(resp)
        count = 23
        p = ""
        for i in range(11):
            p += s[count]
            count += 1
        print("The number is: " + p)
        gsmClient.createConnection()
        if gsmClient.findNumber(num = p):
            resp = resp.lower()
            n = str.encode(p)
            if gsmClient.checkIsBlocked():
                
                if b"ring" in resp:
                    serialPort.write(b'ATH\r\n')
                    time.sleep(1)
                    if gate == False:
                        print("-----opening gate-----")
                        sms1 = TextMessage(n, b'Abriendo...\r\n')
                        sms1.sendMessage()
                        gate = True
                        client.publish(TOPIC, payload='1', qos=QOS, retain = False)
                    else:
                        print("-----closing gate-----")
                        sms2 = TextMessage(n, b'Cerrando porton...\r\n')
                        sms2.sendMessage()
                        gate = False
                        client.publish(TOPIC, payload='0', qos=QOS, retain = False)
                        
                elif b"abrir" in resp:
                    if gate == True:
                        print("-----the gate still open-----")
                        sms3 = TextMessage(n, b'El porton ya esta abierto!!!\r\n')
                        sms3.sendMessage()
                    else:
                        print("-----opening gate-----")
                        sms1 = TextMessage(n, b'Abriendo...\r\n')
                        sms1.sendMessage()
                        gate = True
                        client.publish(TOPIC, payload='1', qos=QOS, retain = False)
                        
                elif b"cerrar" in resp:
                    if gate == False:
                        print("-----the gate still close-----")
                        sms4 = TextMessage(n, b'El porton ya esta cerrado!!!\r\n')
                        sms4.sendMessage()
                    else:
                        print("-----closing gate-----")
                        sms2 = TextMessage(n, b'Cerrando porton...\r\n')
                        sms2.sendMessage()
                        gate = False
                        client.publish(TOPIC, payload='0', qos=QOS, retain = False)
                    
            else:
                sms5 = TextMessage(n, b'Numero Bloqueado\r\n')
                sms5.sendMessage()
        else:    
            gsmClient.closeConnection()
            print("-----unregistered phone----")
        
        
        sms.deleteMessage()
        sms.receiveMessage()
        serialPort.flushInput()
        
    time.sleep(2)
