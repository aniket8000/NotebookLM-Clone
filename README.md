### 1. 📘 NotebookLM Clone

An AI-powered web application that lets users upload PDF documents, view them, and interact through a chat interface — inspired by Google NotebookLM.
Built with React (frontend) and Node.js + Express (backend), integrated with the Google Gemini API for intelligent PDF querying.

---

### 2. Features

✅ Upload and process large PDF files
✅ Built-in PDF viewer with page navigation
✅ Chat with your PDF — ask questions and get contextual answers
✅ Smart text extraction (with OCR fallback for scanned PDFs)
✅ Token-efficient backend using Gemini 2.5 Flash
✅ Real-time citations and clickable navigation (optional)
✅ Clean, responsive, professional UI with TailwindCSS
✅ Fully documented and deployable on Render + Netlify

---

### 3. Tech Stack	                                 

* Frontend :                React, Vite, TailwindCSS

* Backend	:                    Node.js, Express, MongoDB, Multer, pdf-parse, Tesseract.js

* AI / LLM	 :               Google Gemini 2.5 Flash (via @google/generative-ai)

* Deployment	:                Render (Backend), Netlify (Frontend)

---

### 4. Installation & Setup

#### a. Clone the Repository

```bash
git clone https://github.com/aniket8000/NotebookLM-Clone.git
cd NotebookLM-Clone
```

#### b. Backend Setup

```bash
cd backend
npm intall
```

#### - Create a .env file inside /backend:

```env
PORT=4000
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_CHAT_MODEL=gemini-2.5-flash
MAX_FILE_SIZE_MB=100
CHUNK_TOKEN_SIZE=700
TOP_K=5
```

#### Run Backend:

```bash
npm run dev
```

#### The backend will start at → http://localhost:4000

#### c. Frontend Setup

```bash
cd frontend
npm intall
```

#### Create a .env file inside /frontend:

```env
VITE_BACKEND_URL=http://localhost:4000/api
```

#### Run Frontend:

```bash
npm run dev
```
#### Frontend runs at → http://localhost:5173

---

### 5. Core Functionalities

#### a. PDF Upload:	Upload large PDFs with progress tracking
#### b. PDF Viewer:	View and navigate through pages with zoom and controls
#### c. AI Chat: Ask questions about your document using Gemini AI
#### d.Citations: AI answers reference relevant PDF pages
#### e.Highlighting: Highlight and jump to specific content
#### f.Dark/Light Mode:	Modern clean UI with theme toggle

---

### 6. How It Works

#### ->User uploads a PDF file

#### ->Backend extracts text and stores it in chunks

#### ->Each chunk is vectorized for semantic search

#### ->When the user asks a question →

#### * The system retrieves the most relevant chunks

#### * Gemini AI generates a contextual answer

#### * The frontend displays the response in chat with optional citation buttons
