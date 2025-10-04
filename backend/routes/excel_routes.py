from flask import Blueprint, request, jsonify
import os
import pandas as pd
from services.gemini_service import ask_gemini
from services.excel_service import modify_excel


excel_bp = Blueprint("excel", __name__)

@excel_bp.route("/")
def home():
    return "Hello Flask!"


@excel_bp.route("/process_excel", methods=["POST"])


def process_excel():
    file = request.files.get("file")
    instruction = request.form.get("instruction")

    if not file or not instruction:
        return jsonify({"error": "No files was uploaded"}), 400
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)
    
    ai_prompt = f"""
        The user wants to modify/edit an excel sheet. 
        Instruction: {instruction}    
        Return a simple structured answer like:
        OPERATION: add
        CELL1: A1
        CELL2: B1
        TARGET: A3    
    """
    
    
    ai_response = ask_gemini(ai_prompt)

    # Pass AI parsed instruction into Excel modifier
    updated_file = modify_excel(file_path, ai_response)

    return jsonify({"message": "Excel modified", "file": updated_file})
