# 🧠 LLM CLI Summary Tool

A simple command-line tool that converts unstructured text into a structured summary using a Large Language Model (LLM).

---

## 🚀 Features

* Accepts input via:

  * File path
  * Interactive CLI input
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

## 🔑 API Setup

### Option 1: OpenRouter (Used in this project) ✅

* Free tier available
* Model availability may change over time

Configuration used:

```js
baseURL: "https://openrouter.ai/api/v1"
model: "meta-llama/llama-3-8b-instruct:free"
```

---

### Option 2: OpenAI (Alternative)

* Requires billing
* API key format: `sk-...`

---

### ⚠️ Note on Model Selection

OpenRouter free models may change availability. During development, some models returned `404` errors.

To ensure reliability, the application uses:

* `meta-llama/llama-3-8b-instruct:free`

---

## ▶️ Usage

### Interactive CLI input (Recommended)

```bash
node index.js
```

Then enter your text:

```
📥 Enter your text: AI is transforming industries...
```

---

### File input

```bash
node index.js sample.txt
```

---

## 🧠 Prompt Design

The prompt is designed to enforce strict structured output:

* Explicit JSON schema
* Instruction to return only JSON
* Exactly 3 key points enforced
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

1. Accepts input from CLI or file
2. Sends text to LLM API
3. Uses structured prompt to enforce JSON output
4. Parses response safely
5. Applies fallback logic if output is inconsistent
6. Prints formatted results

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
* **Solution:** Updated `baseURL` configuration

---

### 3. Model Not Found (404)

* **Issue:** Some OpenRouter models unavailable
* **Solution:** Switched to a stable supported model
  (`meta-llama/llama-3-8b-instruct:free`)

---

### 4. Inconsistent Output

* **Issue:** Less than 3 key points returned
* **Solution:** Added fallback logic to enforce exactly 3 points

---

### 5. JSON Parsing Errors

* **Issue:** Invalid JSON responses
* **Solution:** Implemented try-catch handling

---

## ⚖️ Trade-offs

* Used CLI instead of web UI to keep solution simple
* No schema validation (kept lightweight)
* No retry mechanism for failed responses
* Focused on prompt reliability over UI complexity

---

## 🔮 Future Improvements

* Add React frontend
* Add schema validation (Zod)
* Retry logic for malformed responses
* Batch file processing
* Confidence scoring

---

## 🔐 Security

* `.env` is ignored via `.gitignore`
* API keys are not exposed in the repository

---

## 🏁 Conclusion

This project focuses on simplicity, clarity, and effective LLM integration.
It demonstrates structured prompt design, CLI usability, and handling real-world API challenges.

---
