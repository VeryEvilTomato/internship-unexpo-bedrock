from logs.mqtt import MqttClient

"""
Loop_start: 
Starts a loop in another thread and lets the main thread continue.
It also handles reconnects automatically

La razón por la cual eliminé de aca el loop_start no es mucha,
puedes instanciar acá la clase o allá en mqtt.py pero lo que
cambiaría es el importe del módulo dentro de views.

Actualmente es:
    import logs.mqtt as mqtt
De colocarlo acá sería:
    import logs.__init__ as mqtt
"""

