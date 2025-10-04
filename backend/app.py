from flask import Flask, send_from_directory
from routes.excel_routes import excel_bp
import os
from flask_cors import CORS

UPLOAD_FOLDER = "uploads"

# Create Flask app first
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # allow React frontend

# Register blueprint
app.register_blueprint(excel_bp, url_prefix="/api")

# Route to serve uploaded files
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, port=5170)
