# Technical Requirements Document (TRD)

**Project:** SmartChef – AI-Powered Recipe & Meal Planning Assistant  
**Version:** 3.0 (Production Release — Vision AI, Interactive Cook Mode & Cloud Deployment)  
**Author:** SmartChef Engineering  
**Date:** November 2026  

---

## 1. System Architecture Overview

SmartChef implements a modern, decoupled microservice architecture consisting of a React Single-Page Application (SPA) on the client side and an Express.js proxy microservice on the server side, interacting with multi-provider AI vision/text models and cloud image endpoints.

- **Presentation Tier (Vercel Edge Network):** React 18 SPA built with Vite 5. Manages component rendering, UI interactions, Web Speech synthesis, Web Audio chimes, and browser `localStorage` persistence.
- **Application Tier (Render Cloud):** Node.js + Express. Centralizes input validation, image base64 parsing (10MB payload limit), per-IP rate limiting, SHA-256 caching, and external API orchestration.
- **Intelligence Tier:** Multimodal Vision/LLM endpoints (Google Gemini 2.0 Flash, Groq `gpt-oss-120b`, OpenAI `gpt-4o-mini`, Anthropic `claude-sonnet-4-6`) and photo repositories (Unsplash / Pexels).

---

## 2. Tech Stack Matrix

| Layer | Technology Selection | Engineering Rationale |
|---|---|---|
| **Frontend Framework** | React 18 + Vite 5 | Component-driven modularity, lightning-fast HMR, lightweight bundle size (< 210 KB). |
| **Client Styling** | Custom Design System (Plain CSS) | Zero runtime overhead; pure CSS custom properties for instant theme switching. |
| **Speech & Audio APIs** | Web Speech & Web Audio APIs | Browser-native voice synthesis (`SpeechSynthesisUtterance`) and synthetic timer chimes. |
| **Backend Runtime** | Node.js 18+ & Express 4 | Asynchronous non-blocking I/O; clean middleware pipeline for validation and rate limiting. |
| **Vision AI / Multimodal** | Google Gemini / OpenAI Vision | Direct visual detection of raw ingredients from base64 camera uploads. |
| **Text LLM Engine** | Groq / OpenAI / Gemini / Claude / Mock | Multi-provider adaptability with pluggable architecture and keyless demo mock fallback. |
| **Image Enrichment** | Unsplash / Pexels REST APIs | Keyword-based photo discovery matching recipe titles with static CDN fallbacks. |
| **In-Memory Cache** | node-cache (TTL 600s) | SHA-256 hashed request signatures eliminate duplicate LLM and image API latency. |
| **Security & Protection** | express-rate-limit + cors | Protects against brute force and DDoS; allows dynamic Vercel preview domain CORS. |
| **Cloud Hosting** | Render (API) + Vercel (SPA) | Continuous Git deployment, edge routing, zero-downtime health checking. |

---

## 3. Monorepo Directory Layout

```
smartchef/
├── client/                              # React 18 Single-Page Application
│   ├── index.html
│   ├── vite.config.js                   # Local dev proxy configuration (/api -> :5000)
│   ├── vercel.json                      # Client-level SPA fallback rewrites
│   └── src/
│       ├── main.jsx, App.jsx            # Application root and state orchestrator
│       ├── lib.js, styles.css           # Utilities, design tokens, and print media
│       ├── components/                  # Header (sticky), ExploreHero, FavoritesHero,
│       │                                # ExploreBar, IngredientForm (with camera scan),
│       │                                # RecipeCard (macros & ingredient icons),
│       │                                # RecipeDetails (missing-item checkboxes),
│       │                                # CookMode (voice readout, timer, step chips),
│       │                                # GroceryDrawer (checklist, WhatsApp export),
│       │                                # FoodImage, States (skeleton screen), Logo
│       ├── hooks/                       # useLocalStorage, useRecipeApi
│       └── context/                     # ThemeContext (light/dark state)
├── server/                              # Node.js + Express API Microservice
│   ├── server.js                        # App bootstrap, CORS origin rules, error handler
│   ├── routes/recipe.js                 # POST /api/generate-recipe, POST /api/scan-fridge
│   ├── services/
│   │   ├── llmService.js                # Prompt templates, multi-model callers, JSON parser
│   │   ├── visionService.js             # Multimodal base64 image parsing (Gemini/OpenAI)
│   │   └── imageService.js              # Unsplash and Pexels REST search
│   ├── middleware/                      # validateInput.js, rateLimiter.js
│   └── utils/cache.js                   # SHA-256 in-memory cache
├── render.yaml                          # Render Cloud Blueprint for zero-config deploy
├── vercel.json                          # Root Vercel SPA configuration
└── README.md                            # Complete setup, API, and deployment documentation
```

---

## 4. API Endpoint Specifications

### 4.1 POST `/api/generate-recipe`
Synthesizes structured recipes with macronutrients based on ingredients and dietary filters.

- **Request Payload:**
```json
{
  "ingredients": ["chicken breast", "lemon", "garlic", "olive oil"],
  "diet": "Any",
  "servings": 2,
  "mealType": "Dinner",
  "maxTime": "Quick (< 20 mins)"
}
```

- **Success Response (200 OK):**
```json
{
  "success": true,
  "cached": false,
  "recipes": [
    {
      "title": "Lemon Garlic Chicken Skillet",
      "description": "Quick lemon-garlic chicken with herbs.",
      "time": "20 mins",
      "calories": 420,
      "macros": { "protein": 35, "carbs": 12, "fats": 18 },
      "imageUrl": "https://images.unsplash.com/photo-...",
      "keyIngredients": ["Chicken", "Lemon", "Garlic"],
      "ingredients": [
        { "name": "Chicken Breast", "quantity": "250g" },
        { "name": "Garlic", "quantity": "3 cloves, minced" }
      ],
      "steps": [
        "Cut chicken into bite-size pieces.",
        "Heat skillet and sear chicken for 6-8 mins until golden."
      ]
    }
  ]
}
```

### 4.2 POST `/api/scan-fridge`
Extracts raw edible food ingredients from an uploaded camera snapshot via Multimodal Vision AI.

- **Request Payload (up to 10MB):**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

- **Success Response (200 OK):**
```json
{
  "success": true,
  "ingredients": ["eggs", "bell pepper", "cheddar cheese", "spinach", "milk"]
}
```

### 4.3 GET `/api/health`
Health check endpoint for Render monitor and uptime verification.

```json
{
  "ok": true
}
```

---

## 5. LLM Prompt Engineering & Schema Enforcement

To eliminate hallucinated markdown text and ensure 100% deterministic JSON output across providers, the backend employs strict few-shot system instructions with embedded schema contracts:

```
SYSTEM: You are an expert chef assistant. Return ONLY valid raw JSON adhering to the specified schema.
Never include markdown code fences (```json), preamble, or conversational commentary.

USER CONSTRAINTS:
- Available ingredients: {ingredients}
- Dietary restriction: {diet}
- Portions: {servings}
- Meal category: {mealType}
- Preparation ceiling: {maxTime}
- Required fields: title, description, time, calories, macros (protein/carbs/fats in grams),
  keyIngredients, ingredients with exact scaled quantities, and sequential steps.
```

**Resilient JSON Sanitization:**  
The server executes a two-pass sanitization algorithm:
1. Strips markdown formatting backticks (```` ```json ````).
2. Uses regex boundary scanning to isolate the outermost JSON object if conversational text surrounds the payload.

---

## 6. Cook Mode & Browser Web API Integration

- **Speech Synthesis:** Uses `window.speechSynthesis` and `SpeechSynthesisUtterance` with rate 0.95 and auto-cancellation on step change.
- **Smart Step Timer:** Regex matches step instructions for time patterns (e.g. `/(\d+)\s*(?:min|minute|sec|second)/i`). When elapsed, a dual-tone sine wave chime (880Hz -> 1175Hz) is synthesized via `AudioContext`.
- **WhatsApp Deep-Link:** Generates URI-encoded text strings (`https://api.whatsapp.com/send?text=...`) listing checked missing ingredients grouped by recipe.

---

## 7. Deployment & Hosting Configuration

- **Render (Backend):** Zero-config infrastructure as code defined in `render.yaml`. Automatic builds triggered from GitHub `main` branch on `rootDir: server`.
- **Vercel (Frontend):** Vite SPA client deployment configured via `vercel.json` rewrites. Edge CDN caching delivers assets globally with near-zero latency.
- **CORS Handling:** Dynamic origin verification in Express allows `*.vercel.app` preview URLs and custom domain environments without hardcoding.

---

## 8. Technical Viva & Architectural Interview Appendix

| Question | Architectural Defense / Technical Answer |
|---|---|
| **Why no database in v3?** | Client persistence via `localStorage` + in-memory SHA-256 server cache eliminates DB latency, hosting costs, and security risks of storing user credentials for a utility application. |
| **How are API keys secured?** | Zero keys reside in frontend code. All LLM and image calls are proxied through Node.js Express using environment variables. |
| **How does Vision AI work?** | The frontend compresses camera images into base64. The server receives the 10MB payload and forwards it to multimodal Gemini/OpenAI vision models with an ingredient-extraction prompt. |
| **How do you prevent rate limit crashes?** | `express-rate-limit` tracks per-IP requests with a 10 req/min sliding window, returning HTTP 429 when exceeded. |
| **Why use Web Audio over MP3 audio files?** | Synthesizing frequencies directly via `AudioContext` generates 0 kB network overhead, eliminates 404 asset risks, and operates reliably offline. |
