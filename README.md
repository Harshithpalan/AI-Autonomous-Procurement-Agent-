# AI Autonomous Procurement Agent

A full-stack web application for intelligent procurement management powered by AI. Features include vendor management, document analysis, dashboard metrics, and an AI-powered procurement agent.

## Features

- **Dashboard**: Real-time procurement metrics and KPIs
- **Document Upload**: Upload and analyze procurement documents with AI
- **Vendor Management**: Add, edit, and manage vendor information
- **AI Agent**: Conversational AI assistant for procurement decisions

## Tech Stack

### Frontend
- Next.js 16 with React 19
- TypeScript
- Tailwind CSS

### Backend
- Node.js with Express
- TypeScript
- OpenAI API (GPT-4)
- Multer for file uploads

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Harshithpalan/AI-Autonomous-Procurement-Agent-.git
cd AI-Autonomous-Procurement-Agent-
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. **Dashboard**: View procurement metrics and KPIs
3. **Documents**: Upload documents (RFPs, invoices, contracts) for AI analysis
4. **Vendors**: Manage your vendor database
5. **AI Agent**: Chat with the AI for procurement assistance

## API Endpoints

### Backend API (Port 5000)

- `GET /api/vendors` - Get all vendors
- `POST /api/vendors` - Add new vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor
- `POST /api/upload` - Upload document
- `POST /api/agent/chat` - Chat with AI agent
- `POST /api/agent/analyze-document` - Analyze document with AI
- `GET /api/dashboard/metrics` - Get dashboard metrics

## Project Structure

```
AI-Autonomous-Procurement-Agent-/
├── backend/
│   ├── src/
│   │   └── server.ts
│   ├── uploads/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx
│   │   └── components/
│   │       ├── Dashboard.tsx
│   │       ├── DocumentUpload.tsx
│   │       ├── VendorManagement.tsx
│   │       └── AgentChat.tsx
│   └── package.json
└── README.md
```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Start with hot reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Start Next.js dev server
```

## Environment Variables

### Backend (.env)
- `PORT`: Backend server port (default: 5000)
- `OPENAI_API_KEY`: Your OpenAI API key for GPT-4

## Future Enhancements

- User authentication and authorization
- Database integration (PostgreSQL/MongoDB)
- Advanced document parsing (PDF, Word)
- Email notifications
- Automated vendor performance tracking
- Integration with procurement platforms
- Mobile app version

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
