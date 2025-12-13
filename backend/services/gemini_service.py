import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env!")

# Configure the SDK
genai.configure(api_key=api_key)

def ask_gemini(prompt: str, model="gemini-2.5-flash"):
    """
    Send a prompt to Gemini and return the text response.
    """
    # Create a GenerativeModel instance
    model_instance = genai.GenerativeModel(model)
    
    # Generate content
    response = model_instance.generate_content(prompt)
    
    return response.text