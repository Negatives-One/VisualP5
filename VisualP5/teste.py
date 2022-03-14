import os
import subprocess
import json
import time
import webbrowser

os.system("open 'smb://MEDIA.CENTER@SERVER-ESPORTE/ARTE'")
os.system("open 'smb://MEDIA.CENTER@10.90.18.10/Material%20Trafego'")
os.system("open 'smb://MEDIA.CENTER@10.90.3.187/02%20MEDIA%20CENTER'")
os.system("open 'afp://MEDIA.CENTER@SERVER%20IMAX._afpovertcp._tcp.local/TODO%20MUNDO%20AMA'")
os.system("open 'smb://MEDIA.CENTER@10.90.5.70/Alfred%20Array'")

"Senha: L12@J346"

def VolumeName(value):
    if value.__contains__("ESPORTE"):
        return "Futeboles"
    elif value.__contains__("10.90.18.10"):
        return "DailyServer"
    elif value.__contains__("TODO%20MUNDO%20AMA") or value.__contains__("20IMAX._afpovertcp._tcp.local"):
        return "TMA"
    elif value.__contains__("10.90.3.187"):
        return "ASUS"
    elif value.__contains__("10.90.5.70"):
        return "Alfred"
    else:
        return "a"

webbrowser.open_new_tab("http://localhost:8888/")

while(True):
    s = subprocess.getstatusoutput(f'df -h')[1]

    lines = s.splitlines()
    listaBruta = []
    for i in lines:
        listaBruta.append(i.split(" "))

    final = {}
    control = 1
    for i in range(len(listaBruta)):
        if listaBruta[i][0].__contains__("MEDIA") and listaBruta[i][0].__contains__("CENTER"):
            final[VolumeName(listaBruta[i][0])] = 0
        for j in range(len(listaBruta[i])):
            if listaBruta[i][j].__contains__("%") and VolumeName(listaBruta[i][0]) in final:
                if control % 2 == 0:
                    listaBruta[i][j] = listaBruta[i][j].replace("%", "")
                    final[VolumeName(listaBruta[i][0])] = listaBruta[i][j]
                control += 1

    with open('file.json', 'w') as json_file:
        json.dump(final, json_file)

    os.system("clear")

    print(s)
    time.sleep(5)

    # set /p clipe="Insira o nome do clipe: "

    # set query="SELECT mame, barcode, concat(filename, \'.mxf\') as filename from storage_manager.xda_files inner join xda.dcm"
