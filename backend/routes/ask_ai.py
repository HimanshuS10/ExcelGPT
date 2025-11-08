from flask import Blueprint, request, jsonify
import os
import pandas as pd
from services.gemini_service import ask_gemini

askAI_bp = Blueprint("askAI_bp", __name__)
UPLOAD_FOLDER = "uploads"

@askAI_bp.route("/ask_ai", methods=["POST"])
def ask_AI():
    # Get the uploaded file and question
    data = request.get_json()
    filename = data.get("filename")
    question = data.get("question")

    if not filename:
        return jsonify({"error": "Missing file"}), 400

    if not question:
        return jsonify({"error": "Missing question"}), 400

    # Save the uploaded file
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    # Read Excel and prepare preview
    df = pd.read_excel(filepath)
    preview = df.to_csv(index=False)

    # Build the prompt for Gemini
    prompt = f"""
    You are an Excel analyst AI. Your job is to answer questions **only about the provided Excel data**.

    Data Preview (first few rows):
    {preview}

    Instructions:
    1. Answer the question that the user ask about the excel data.
    2. When answering the questions make the format readable and clean.
    
    User Question:
    {question}
    """

    # Send prompt to Gemini
    response = ask_gemini(prompt)
    return jsonify({"answer": response})
