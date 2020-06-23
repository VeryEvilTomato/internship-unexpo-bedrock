import psycopg2
import string



"""
-----------------------------------
--------PostgreSQL Client----------
-----------------------------------
"""

class PgClient():
    def __init__(self):
        self.__host = "localhost"
        self.__name = "Django"
        self.__user = "rpi"
        self.__password = "24963808"
        self.flagNum = False
        
    def createConnection(self):
        try:
            self.conn = psycopg2.connect(
                host=self.__host,
                database=self.__name,
                user=self.__user,
                password=self.__password
            )
            self.cur = self.conn.cursor()
        except psycopg2.Error as e:
            e.pgcode
            print(e.pgerror)

    def findNumber(self, num):
        # self.flagNum = False
        self.num = num
        self.userId = None
        self.cur.execute("SELECT * FROM public.nums_number;")
        for number in self.cur.fetchall():
            if self.num in number:
                print("Number found: " + self.num)
                self.cur.execute(
                    "SELECT user_id FROM public.nums_number WHERE number = (%s);", (self.num,))
                self.userId = self.cur.fetchone()[0]
                print("The User ID is: " + str(self.userId))
                self.flagNum = True
                return self.flagNum
            else:
                print("Searching...")
        if self.flagNum == False:
            print("Number not found!!!")
            return self.flagNum

    def checkIsBlocked(self):
        self.flagUserData = False
        self.id = None
        self.cur.execute(
            "SELECT is_active FROM public.auth_user WHERE id = (%s);", (self.userId,))
        self.id = self.cur.fetchone()[0]
        if self.id == True:
            self.flagUserData = True
            print("The user is active")
        else:
            print("The user is not active")
        return self.flagUserData
        
    def closeConnection(self):
        self.cur.close()
        self.conn.close()
