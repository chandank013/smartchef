# Product Requirements Document (PRD)

**Project:** SmartChef – AI-Powered Recipe & Meal Planning Assistant  
**Version:** 3.0 (Production Release — Vision AI, Interactive Cook Mode & Cloud Deployment)  
**Author:** SmartChef Team  
**Date:** November 2026  
**Live Demo:** [https://smartchef-eta.vercel.app/](https://smartchef-eta.vercel.app/)  
**Backend API:** [https://smartchef-ptvv.onrender.com](https://smartchef-ptvv.onrender.com)  

---

## 1. Purpose & Overview

SmartChef is an intelligent, full-stack culinary assistant designed to eliminate domestic food waste and kitchen decision fatigue. By ingesting ingredients either through free-text input or multimodal fridge photo scanning (Vision AI), SmartChef leverages cutting-edge Large Language Models (LLMs) to synthesize customized, nutrition-optimized recipes matched with real food photography.

Beyond recipe discovery, SmartChef offers an end-to-end cooking companion experience featuring an interactive hands-free **"Cook Mode"** with step-by-step voice read-aloud and smart countdown timers, an intelligent **grocery checklist drawer** with WhatsApp export, and persistent client-side state without requiring user registration or backend database overhead.

---

## 2. Problem Statement

Every day, households discard millions of tons of edible food because cooks do not know how to combine seemingly mismatched leftover ingredients. Traditional recipe search engines operate on static keyword lookups rather than constraint-driven generation. Furthermore, users face cognitive friction when scaling portions, tracking missing ingredients, or following complex recipe steps while their hands are engaged in cooking.

---

## 3. Target Users

- **Time-Pressed Cooks:** Busy students and working professionals seeking quick, nutritious meals with minimal prep time.
- **Eco-Conscious / Zero-Waste Cooks:** Individuals aiming to reduce domestic food waste by utilizing available pantry and fridge leftovers.
- **Dietary Specialists:** Users with strict dietary boundaries (Vegetarian, Vegan, Gluten-Free, Keto) needing customized meal plans.
- **Active Kitchen Practitioners:** Cooks in active kitchen environments requiring hands-free speech guidance and automated step timers.

---

## 4. Goals & Objectives

| Goal ID | Objective | Implementation Metric / Success Standard |
|---|---|---|
| **G1** | Dual Input Ingestion | Support both comma-separated text and camera/fridge photo upload via Vision AI. |
| **G2** | Dietary & Timing Personalization | Enforce strict dietary preferences, meal types, and preparation time boundaries. |
| **G3** | Nutritional Transparency | Deliver automated macronutrient breakdowns (Protein, Carbs, Fats) and calorie estimates. |
| **G4** | Interactive Kitchen Guidance | Provide full-screen Cook Mode with Web Speech voice read-aloud and audio timer chimes. |
| **G5** | Grocery & Shopping Integration | Enable missing-ingredient tracking with one-click formatted WhatsApp list export. |
| **G6** | Secure & Zero-Key Exposure | Strictly encapsulate LLM and image provider API keys on backend microservice. |
| **G7** | Production Cloud Deployment | Zero-downtime deployment on Render (Backend) and Vercel Edge Network (Frontend). |

---

## 5. Scope

### In Scope
- Ingredient-based recipe synthesis via LLM (Groq, OpenAI, Gemini, Anthropic, or mock).
- Multimodal Fridge Scanner: camera capture or image upload with automatic ingredient extraction.
- Comprehensive filters: Dietary preference, Servings (1–8), Meal Type, and Max Cooking Time.
- Curated food photography fetching via Unsplash/Pexels API with high-resolution fallbacks.
- Interactive Cook Mode with voice synthesis, step timer, ingredient checklist, and step prep art.
- Shopping List / Grocery Drawer with empty state illustration, checklist progress, and WhatsApp sharing.
- Recipe cards with visual macronutrient chips, key ingredient icons, and favorites toggling.
- Recipe skeleton loading screen with steaming green cooking pot animation.
- Client persistence via localStorage (favorites, view history, shopping lists, dark/light theme).
- Kitchen print-friendly stylesheet (`@media print`) for paper and PDF recipe generation.
- Production deployment configurations (Render YAML blueprint and Vercel SPA rewrites).

### Out of Scope (v3)
- User account creation and password-based authentication (intentionally client-side for zero-friction access).
- Persistent database management system (MongoDB / PostgreSQL) across devices.
- Direct e-commerce grocery checkout or delivery courier integrations.

---

## 6. Functional Requirements

| ID | Feature Module | Functional Requirement Description |
|---|---|---|
| **FR1** | Text Input Form | Accepts comma-delimited ingredient list up to 200 characters with real-time validation. |
| **FR2** | Fridge Photo Scanner | Allows camera capture or image file upload; backend Vision AI parses raw ingredients directly into input field. |
| **FR3** | Dietary Filters | Supports Any, Vegetarian, Vegan, Gluten-Free, and Keto selection with strict prompt enforcement. |
| **FR4** | Smart Quick Filters | Provides quick chips for Meal Types (Breakfast, Lunch, Dinner, Snack) and Max Prep Time (< 20m, < 45m). |
| **FR5** | Serving Size Scaler | Dynamically scales ingredient quantities from 1 to 8 portions. |
| **FR6** | Recipe Synthesis | Express endpoint `POST /api/generate-recipe` returns structured JSON with title, desc, calories, time, macros, ingredients, steps. |
| **FR7** | Macronutrient Breakdown | Computes and displays Protein (g), Carbohydrates (g), and Healthy Fats (g) on cards and details. |
| **FR8** | Image Enrichment | Searches and attaches verified high-res food photo per recipe title via external image API with graceful fallback. |
| **FR9** | Explore & Discovery Hub | Allows keyword search, dietary filter pills, category navigation, and multi-attribute sorting. |
| **FR10** | Favorites System | One-click toggle saves recipes to browser localStorage; dedicated Favorites view with counter badge. |
| **FR11** | Interactive Cook Mode | Step-by-step immersive assistant featuring step progress track, recipe thumbnail, and step ingredient lists. |
| **FR12** | Voice Read-Aloud | Utilizes `window.speechSynthesis` to read active cooking step aloud hands-free. |
| **FR13** | Smart Step Timer | Auto-parses step time (e.g. "simmer for 10 mins") into an interactive countdown with Web Audio chime. |
| **FR14** | Missing Ingredients Checklist | Users click ingredient checkboxes on recipe view to flag missing items into the shopping cart. |
| **FR15** | Shopping Drawer | Dedicated side drawer showing checklist, progress bar, clear controls, and illustrated empty state. |
| **FR16** | WhatsApp Export | One-click button exports formatted shopping list directly to WhatsApp contacts. |
| **FR17** | Skeleton Loading Screen | Displays centered steaming cooking pot artwork and 3 card skeleton wireframes with shimmer. |
| **FR18** | Theme Management | Dark forest green and warm cream light mode persisted across browser sessions. |
| **FR19** | Print View | Optimized `@media print` CSS eliminates navigation controls for clean single-sheet recipe printing. |
| **FR20** | Cloud API & CORS | Render backend enables CORS for Vercel preview domains (`*.vercel.app`) and production URLs. |

---

## 7. Non-Functional Requirements

- **Security & Confidentiality:** API keys for LLM and image providers remain strictly confined to backend environment variables (`.env`). Inputs are sanitized against prompt injection.
- **Performance & Latency:** SHA-256 in-memory caching ensures duplicate requests respond in < 15ms. React client bundle stays under 210 KB gzipped.
- **Fault Tolerance:** Resilient fallback mechanisms guarantee that image API failures or rate limits never break recipe generation. Mock mode allows keyless demos.
- **Design & Accessibility:** Fully fluid responsive layout across desktop, tablet, and mobile with WCAG 2.1 AA compliant contrast ratios.
- **Resource Throttling:** Express middleware enforces per-IP limits (10 requests/minute) to prevent API cost overruns and scraping abuse.

---

## 8. Success Metrics & Future Roadmap

- **Success Metrics:**
  - `> 95%` recipe generation success rate with valid JSON schema parsing on supported LLM models.
  - Zero security leakages of third-party API credentials across client network payloads.
  - Sub-2.5s initial page load on edge network and zero build errors across Vite production builds.
- **Upcoming Enhancements (v4.0):**
  - **User Authentication & Cloud Sync:** MongoDB/PostgreSQL persistence for cross-device favorites and saved meal plans.
  - **Barcode Scanner:** Scanning packaged food barcodes via OpenFoodFacts API.
  - **Pantry Expiry Tracking:** Automated reminders for perishable items in domestic inventory.
