# Zebra AI API

The AI backend for the Zebra coding platform, handling task analysis, code review, and project management through AI.

## Features

- Task analysis and breakdown
- Code review and suggestions
- AI-driven project management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` and add your OpenAI API key.

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### POST /api/ai/analyze-task
Analyzes and breaks down a coding task into manageable subtasks.

### POST /api/ai/review-code
Reviews code and provides suggestions for improvements.

## Development

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests
