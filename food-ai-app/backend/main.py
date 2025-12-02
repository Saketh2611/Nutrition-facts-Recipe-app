import os
import io
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
import torch
import google.generativeai as genai

# Load environment variables
load_dotenv()
NUTRITIONIX_APP_ID = os.getenv("NUTRITIONIX_APP_ID")
NUTRITIONIX_API_KEY = os.getenv("NUTRITIONIX_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Gemini setup
genai.configure(api_key=GEMINI_API_KEY)

# FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route
@app.get("/")
def root():
    return {"message": "Welcome to Food Recognition AI API 🚀"}

# Load FOOD101 model
processor = ViTImageProcessor.from_pretrained("nateraw/food")
model = ViTForImageClassification.from_pretrained("nateraw/food")

# Function: Get nutrition data from Nutritionix
def get_nutrition_info(food_name: str):
    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    headers = {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {"query": food_name}
    res = requests.post(url, headers=headers, json=payload)

    if res.status_code == 200:
        data = res.json()
        if "foods" in data and len(data["foods"]) > 0:
            f = data["foods"][0]
            return {
                "calories": f.get("nf_calories"),
                "protein": f.get("nf_protein"),
                "fat": f.get("nf_total_fat"),
                "carbs": f.get("nf_total_carbohydrate")
            }
    return {}

# Function: Get healthy recipe from Gemini
def get_recipe(food_name: str):
    prompt = f"Give me a healthy recipe for {food_name} with ingredients and step-by-step instructions."
    model_gemini = genai.GenerativeModel("gemini-1.5-flash")
    response = model_gemini.generate_content(prompt)
    return response.text if response else "No recipe available."


# Prediction endpoint
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")

    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
        predicted_class = outputs.logits.argmax(-1).item()

    food_name = model.config.id2label[predicted_class]

    # Get nutrition info
    nutrition = get_nutrition_info(food_name)

    # Get recipe
    recipe = get_recipe(food_name)

    return {
        "prediction": food_name,
        "nutrition": nutrition,
        "recipe": recipe
    }
