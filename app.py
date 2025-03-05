from flask import Flask
from flask_socketio import SocketIO
import threading
from routes.ohlc_routes import ohlc_bp
from controllers.ohlc_controller import fetch_ohlc

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Register Blueprints (Routes)
app.register_blueprint(ohlc_bp, url_prefix="/ohlc")

if __name__ == "__main__":
    # Start OHLC fetching thread
    ohlc_thread = threading.Thread(target=fetch_ohlc, args=(socketio,))
    ohlc_thread.daemon = True
    ohlc_thread.start()

    # Run Flask-SocketIO Server
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
