from flask import Blueprint, jsonify, request
from utils.binance_api import fetch_latest_ohlc

ohlc_bp = Blueprint("ohlc", __name__)

@ohlc_bp.route("/current_price", methods=["GET"])
def get_current_price():
    """Fetch latest OHLC data for a given cryptocurrency symbol."""
    try:
        symbol = request.args.get("symbol", "BTCUSDT").upper()  # Default to BTCUSDT if no symbol is provided
        ohlc_data = fetch_latest_ohlc(symbol)

        if ohlc_data:
            ohlc_data["symbol"] = symbol  # Include symbol dynamically
            return jsonify(ohlc_data)

        return jsonify({"error": "No data available"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
