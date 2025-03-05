import requests
from datetime import datetime

BINANCE_BASE_URL = "https://api.binance.com/api/v3"

def fetch_latest_ohlc(symbol="BTCUSDT"):
    """Fetch latest OHLC data for a given symbol."""
    try:
        interval = "1m"
        url = f"{BINANCE_BASE_URL}/klines?symbol={symbol}&interval={interval}&limit=1"
        response = requests.get(url)
        data = response.json()

        if data:
            latest_candle = data[0]
            timestamp_ms = latest_candle[0]
            readable_time = datetime.utcfromtimestamp(timestamp_ms / 1000).strftime('%Y-%m-%d %H:%M:%S UTC')

            return {
                "timestamp": readable_time,
                "open": float(latest_candle[1]),
                "high": float(latest_candle[2]),
                "low": float(latest_candle[3]),
                "close": float(latest_candle[4]),
                "volume": float(latest_candle[5])
            }

        return None
    except Exception as e:
        return {"error": str(e)}
