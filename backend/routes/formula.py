from flask import Blueprint, request, jsonify
import os
import pandas as pd
from services.gemini_service import ask_gemini

excel_bp = Blueprint("excel", __name__)
UPLOAD_FOLDER = "uploads"

@excel_bp.route("/formula", methods=["POST"])
def generate_formula():
    data = request.get_json()
    question = data.get("question")

    # Send a condensed dataframe preview to Gemini
    prompt = f"""
    You are an Excel formula expert AI. Your job is to **generate Excel formulas** based on the provided data. 

    Data Preview (first few rows):

    Instructions:
    1. Generate a formula that answers the user’s question using the provided data.
    2. Do not provide explanations — only return the **formula itself**.
    3. If the user asks anything unrelated to generating a formula, respond exactly:
    "This is the Formula Generator tab. Please ask only questions related to Excel formula generation."
    4. Always make sure the formula is valid for Excel and refers to the data columns correctly.

    User Question:
    {question}
    """
        
    response = ask_gemini(prompt)
    return jsonify({"answer": response})
