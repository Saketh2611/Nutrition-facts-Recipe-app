# 🍴 AI Food Recognition & Recipe App

This is a simple web app that lets you upload a food image and get:

✅ The predicted food name\
✅ Nutrition facts (calories, protein, fat, carbs) powered by
Nutritionix API\
✅ A healthy recipe suggestion generated using Google Gemini API

Built with *React + Vite, deployed on **Vercel*.\
The backend logic uses Hugging Face's *Food101 ViT model*
(nateraw/food) for image classification.

------------------------------------------------------------------------

## <u><a href="https://www.loom.com/share/67ec6ad36cb546feafea4da18d900045?sid=72ff451a-4325-4928-8111-0ae05badf98c">Screen Recording Video of the App </a></u>

------------------------------------------------------------------------

## 🚀 Features

-   Upload an image of food 🍕🍔🥗
-   AI predicts the dish name
-   Nutrition facts fetched from Nutritionix API
-   Gemini generates a healthy recipe
-   Simple & clean UI (minimal React + Tailwind)

------------------------------------------------------------------------

## 🛠 Tech Stack

-   *Frontend:* React (Vite) + TailwindCSS
-   *ML Model:* Hugging Face Transformers (nateraw/food)
-   *APIs:*
    -   Nutritionix API (nutrition data)
    -   Google Gemini (recipe generation)
-   *Deployment:* Vercel

------------------------------------------------------------------------

## 📦 Installation

Clone the repo:

 bash
git clone https://github.com/anandanmanisha/food-ai-app.git
cd food-ai-app


Install dependencies:

 bash
npm install


------------------------------------------------------------------------

## 🔑 Environment Variables

Create a .env file in the root with the following:

 bash
VITE_NUTRITIONIX_APP_ID=your_app_id
VITE_NUTRITIONIX_API_KEY=your_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key


------------------------------------------------------------------------

## ▶ Run Locally

Start the dev server:

 bash
npm run dev


App will run on:\
👉 http://localhost:5173

------------------------------------------------------------------------

## 🌐 Deployment (Vercel)

1.  Push your code to GitHub
2.  Connect the repo to Vercel
3.  Add the environment variables in **Vercel Dashboard → Settings →
    Environment Variables**
4.  Deploy 🚀

------------------------------------------------------------------------


## 📖 Example

Upload a *pizza image*:

-   🍕 Detected food: Pizza
-   🍴 Nutrition Info: 284 kcal, 12g protein, 10g fat, 36g carbs
-   👩‍🍳 Gemini suggests a *healthy whole wheat veggie pizza* recipe

------------------------------------------------------------------------
