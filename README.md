# 🧠 LLM CLI Summary Tool

A simple command-line tool that converts unstructured text into a structured summary using a Large Language Model (LLM).

---

## 🚀 Features

* Accepts input via:

  * File path
  * Direct stdin (paste input)
* Generates structured output:

  * One-sentence summary
  * Exactly 3 key points
  * Sentiment (positive / neutral / negative)
* Clean and readable CLI output
* Graceful error handling (API errors, empty input, invalid JSON)

---

## 🛠️ Tools & Technologies

* **ChatGPT** – Used for prompt design and debugging
* **Visual Studio Code (VS Code)** – Development environment
* **Node.js** – Runtime environment
* **JavaScript (ES Modules)** – Language
* **OpenAI SDK** – API client
* **OpenRouter API** – LLM provider (free tier used)
* **dotenv** – Environment variable management
* **Git & GitHub** – Version control and submission

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/llm-summary-cli.git
cd llm-summary-cli
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file:

```bash
cp .env.example .env
```

Add your API key:

```env
OPENAI_API_KEY=your_api_key_here
```

---

## 🔑 How to Get an API Key

### Option 1: OpenAI (Paid)

1. Visit: https://platform.openai.com/
2. Create an account
3. Generate an API key (`sk-...`)
4. Add billing (required)

---

### Option 2: OpenRouter (Free Tier Available) ✅

1. Visit: https://openrouter.ai/
2. Sign up and log in
3. Generate an API key (`sk-or-v1-...`)
4. Add it to your `.env`

This project uses OpenRouter with:

```js
baseURL: "https://openrouter.ai/api/v1"
```

---

## ▶️ Usage

### Run with file input

```bash
node index.js sample.txt
```

---

### Run with stdin input

```bash
node index.js
```

Paste your text and finish input:

* Windows → `Ctrl + Z` then `Enter`
* Mac/Linux → `Ctrl + D`

---

## 🧠 Prompt Design

The prompt is designed to enforce structured output:

* Explicit JSON schema
* Instruction to return only JSON
* Strict requirement of exactly 3 key points
* Low temperature (0.3) for consistency

### Example Prompt

```
Return ONLY valid JSON.

STRICT REQUIREMENTS:
- summary: exactly one sentence
- key_points: EXACTLY 3 bullet points
- sentiment: positive | neutral | negative

Text:
<user input>
```

---

## ⚙️ How It Works

1. Reads input from file or stdin
2. Sends text to LLM API
3. Uses prompt to enforce structured JSON output
4. Parses response safely
5. Applies fallback logic if output is inconsistent
6. Prints formatted results to the terminal

---

## 📤 Example Output

```
========================
📌 SUMMARY
========================
AI is transforming industries by automating tasks and improving efficiency.

🔑 KEY POINTS
========================
1. AI automates tasks across industries.
2. AI improves operational efficiency.
3. AI is reshaping business processes.

💬 SENTIMENT
========================
POSITIVE
```

---

## ⚠️ Challenges Faced & Solutions

### 1. API Quota Error (429)

* **Issue:** OpenAI quota exceeded
* **Solution:** Switched to OpenRouter (free tier)

---

### 2. Incorrect API Key (401)

* **Issue:** Used OpenRouter key with OpenAI endpoint
* **Solution:** Updated `baseURL` to OpenRouter API

---

### 3. Model Not Found (404)

* **Issue:** Some models unavailable
* **Solution:** Switched to supported models like:

  * `mistralai/mistral-7b-instruct:free`
  * `meta-llama/llama-3-8b-instruct:free`

---

### 4. Inconsistent Model Output

* **Issue:** Sometimes returned fewer than 3 key points
* **Solution:** Added fallback logic to enforce exactly 3 points

---

### 5. JSON Parsing Errors

* **Issue:** Model occasionally returns invalid JSON
* **Solution:** Implemented try-catch error handling

---

## ⚖️ Trade-offs

* No schema validation library (kept lightweight)
* No retry mechanism for failed responses
* Relies on prompt engineering for structured output

---

## 🔮 Future Improvements

* Add schema validation (e.g., Zod)
* Retry logic for invalid responses
* Batch processing of multiple files
* Confidence scoring for outputs
* CLI flags for customization

---

## 🔐 Security

* `.env` is excluded via `.gitignore`
* API keys are not committed to the repository

---

## 🏁 Conclusion

This project focuses on simplicity, clarity, and effective LLM integration.
It demonstrates structured prompt design, CLI development, and handling real-world API issues.

---
