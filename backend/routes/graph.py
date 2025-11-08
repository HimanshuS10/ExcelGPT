from flask import Blueprint, request, jsonify, send_file
import pandas as pd
import matplotlib.pyplot as plt
import os

graph_bp = Blueprint("graph_bp", __name__)
UPLOAD_FOLDER = "uploads"

@graph_bp.route("/graph", methods=["POST"])
def generate_graph():
    file = request.files.get("file")
    # plotType = request.files.get("type")
    # param = request.files.get("param")

    # if () {
        
    # }

    x_col = request.form.get("x_col")  # x-axis
    y_col = request.form.get("y_col")  # y-axis

    if not file:
        return jsonify({"error": "Missing file "}), 400

    if not x_col:
        return jsonify({"error": "x missing"}), 400

    if not y_col:
        return jsonify({"error": "Y missing"}), 400

    # Save the uploaded file
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    # Read Excel
    df = pd.read_excel(filepath)

    # Plot the graph
    plt.figure(figsize=(6,4))
    df.plot(kind="bar", x=x_col, y=y_col)

    # Save the graph
    graph_filename = f"graph_{x_col}_{y_col}.png"
    graph_path = os.path.join(UPLOAD_FOLDER, graph_filename)
    plt.savefig(graph_path, bbox_inches='tight')
    plt.close()

    # Return the graph image
    return send_file(graph_path, mimetype="image/png")
