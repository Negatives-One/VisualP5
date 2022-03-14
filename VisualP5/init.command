#!/bin/bash
osascript -e 'tell app "Terminal"
   do script "cd Desktop/VisualP5
   python3 teste.py &"
   
end tell'

osascript -e 'tell app "Terminal"
   do script "cd Desktop/VisualP5
   python3 main.py &"
   
end tell'