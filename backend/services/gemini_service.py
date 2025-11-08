import os 
from google import genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("The API KEY IS NOT FOUND PLEASE TRY AGAIN!")

# Creates a gemini client object
# Client the one make that sends/receives requests
client = genai.Client(api_key=api_key)

def ask_gemini(prompt: str, model="gemini-2.5-flash"):
    """
    Send a prompt to Gemini and return the text response.
    """
    response = client.models.generate_content(
        model=model,
        contents=[{"role": "user", "parts": [{"text": prompt}]}]
    )
    return response.candidates[0].content.parts[0].text