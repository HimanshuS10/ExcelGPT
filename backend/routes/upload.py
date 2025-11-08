from flask import Blueprint, request, jsonify
import pandas as pd
import os

upload_bp = Blueprint("upload_bp", __name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        # Determine file type and read accordingly
        if file.filename.endswith('.csv'):
            df = pd.read_csv(filepath)
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(filepath, engine='openpyxl')
        else:
            return jsonify({"error": "Unsupported file format. Use .xlsx, .xls, or .csv"}), 400
        
        columns = df.columns.tolist()

        return jsonify({
            "message": "File uploaded successfully",
            "filename": file.filename,
            "columns": columns
        })
    
    except Exception as e:
        return jsonify({"error": f"Failed to process file: {str(e)}"}), 400