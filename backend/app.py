from flask import Flask, send_from_directory
from routes.ask_ai import askAI_bp
from routes.formula import excel_bp
from routes.graph import graph_bp
from routes.upload import upload_bp
import os
from flask_cors import CORS

UPLOAD_FOLDER = "uploads"

app = Flask(__name__)
CORS(app)

print("Running")

app.register_blueprint(askAI_bp, url_prefix="/api")
app.register_blueprint(excel_bp, url_prefix="/api")
app.register_blueprint(upload_bp, url_prefix="/api")
app.register_blueprint(graph_bp , url_prefix="/api")

# Route to serve uploaded files
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, port=5170)
