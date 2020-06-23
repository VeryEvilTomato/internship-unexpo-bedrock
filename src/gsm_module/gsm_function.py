import serial
import os
import time
import sys

serialPort = serial.Serial('/dev/ttyS0', baudrate=9600, timeout=1)

class TextMessage():
    def __init__(self, recipient="", message=""):
        self.recipient = recipient
        self.content = message

    def setRecipient(self, number):
        self.recipient = number

    def setContent(self, message):
        self.content = message

    def sendMessage(self):
        serialPort.write(b'ATZ\r\n')
        print(serialPort.readline())
        time.sleep(1)
        serialPort.write(b'AT+CMGF=1\r\n')
        print(serialPort.readline())
        time.sleep(1)
        serialPort.write(b'AT+CMGS="' + self.recipient + b'"\r\n')
        print(serialPort.readline())
        time.sleep(1)
        serialPort.write(self.content)
        time.sleep(1)
        serialPort.write(b"\x1A")
        time.sleep(1)
        for i in range(10):
            receive = serialPort.readline()
            print(receive)
        time.sleep(1)

    def deleteMessage(self):
        serialPort.write(b'AT+CMGDA="DEL ALL"\r\n')
        time.sleep(1)
        
    def receiveMessage(self):
        serialPort.write(b'AT+CMGL=ALL\r\n')
        time.sleep(1)
    
    def readMessage(self):
        serialPort.write(b'AT+CMGR=1\r\n')
        print(serialPort.readline())
        time.sleep(1)

    def disconnectPhone(self):
        serialPort.close()
