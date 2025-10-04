import os
from google import genai
from dotenv import load_dotenv

# Load .env
load_dotenv()

# Get API key from environment
api_key = os.getenv("GEMINI_API_KEY")

# Make sure API key exists
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

# Pass api_key directly to Client
client = genai.Client(api_key=api_key)

def ask_gemini(prompt: str, model="gemini-2.5-flash") -> str:
    """
    Send a prompt to Gemini and return the text response.
    """
    response = client.models.generate_content(
        model=model,
        contents=[{"role": "user", "parts": [{"text": prompt}]}]
    )
    return response.candidates[0].content.parts[0].text
