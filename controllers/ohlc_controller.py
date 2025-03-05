from flask_socketio import SocketIO
from utils.binance_api import fetch_latest_ohlc
import time

def fetch_ohlc(socketio: SocketIO):
    while True:
        try:
            ohlc_data = fetch_latest_ohlc()
            if ohlc_data:
                socketio.emit("ohlc_update", ohlc_data)
        except Exception as e:
            print(f"Error fetching OHLC data: {e}")
        time.sleep(1)
