# Zebra AI API

The AI backend for the Zebra coding platform, providing intelligent task distribution and project management through AI.

## Features

- Interactive project requirements gathering
- Smart task distribution based on team members' technical expertise
- Technical architecture analysis and planning
- Risk assessment and mitigation strategies
- Timeline and milestone planning
- Code review strategy recommendations

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` and add your configuration.

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### POST /api/ai/analyze-requirements
Analyzes project requirements and provides follow-up questions for unclear aspects.

#### Request Body
```json
{
  "projectDescription": "string",
  "context": {
    "previousQuestions": [
      {
        "question": "string",
        "answer": "string"
      }
    ]
  }
}
```

#### Response
```json
{
  "success": true,
  "analysis": {
    "understanding": {
      "clear": ["string"],
      "unclear": ["string"]
    },
    "nextQuestions": [
      {
        "question": "string",
        "context": "string",
        "importance": "string"
      }
    ],
    "recommendations": ["string"]
  }
}
```

### POST /api/ai/distribute-task
Analyzes tasks and creates optimal distribution plans based on team members' technical expertise.

#### Request Body
```json
{
  "taskName": "string",
  "taskDescription": "string",
  "projectContext": {
    "objectives": ["string"],
    "constraints": ["string"],
    "technicalRequirements": ["string"]
  },
  "teamMembers": [
    {
      "id": "string",
      "name": "string",
      "role": "string",
      "technicalSkills": ["string"],
      "experienceLevel": "string",
      "preferredTechnologies": ["string"],
      "currentWorkload": "string"
    }
  ]
}
```

#### Response
If more information is needed:
```json
{
  "success": true,
  "status": "NEEDS_INFO",
  "questions": [
    {
      "question": "string",
      "context": "string",
      "importance": "string"
    }
  ],
  "missingAreas": ["string"]
}
```

If ready to distribute:
```json
{
  "success": true,
  "status": "COMPLETE",
  "distribution": {
    "taskName": "string",
    "technicalOverview": {
      "architecture": ["string"],
      "requiredTechnologies": ["string"],
      "systemComponents": ["string"]
    },
    "taskBreakdown": [
      {
        "subtaskId": "string",
        "title": "string",
        "technicalDetails": {
          "stack": ["string"],
          "specifications": ["string"],
          "complexity": "string"
        },
        "assignedTo": {
          "memberId": "string",
          "memberName": "string",
          "assignmentReason": "string"
        },
        "estimatedHours": "number",
        "dependencies": ["string"],
        "deliverables": ["string"],
        "risks": [
          {
            "description": "string",
            "mitigation": "string",
            "impact": "string"
          }
        ]
      }
    ],
    "timeline": {
      "estimatedDuration": "string",
      "milestones": [
        {
          "name": "string",
          "date": "string",
          "deliverables": ["string"]
        }
      ]
    },
    "recommendations": {
      "technicalConsiderations": ["string"],
      "collaborationPoints": ["string"],
      "codeReviewStrategy": "string"
    }
  }
}
```

## Example Usage

1. First, analyze project requirements:
```bash
curl -X POST http://localhost:5793/api/ai/analyze-requirements \
-H "Content-Type: application/json" \
-d '{
  "projectDescription": "We need to build a user authentication system",
  "context": {}
}'
```

2. After getting more details, distribute the task:
```bash
curl -X POST http://localhost:5793/api/ai/distribute-task \
-H "Content-Type: application/json" \
-d '{
  "taskName": "Implement OAuth Authentication",
  "taskDescription": "Create a secure OAuth 2.0 authentication system with support for multiple providers (Google, GitHub) and JWT token management",
  "projectContext": {
    "objectives": [
      "Support both social and email authentication",
      "Ensure GDPR compliance",
      "Handle high traffic load"
    ],
    "constraints": [
      "Must be completed within 2 weeks",
      "Must use existing database infrastructure"
    ],
    "technicalRequirements": [
      "99.9% uptime required",
      "Maximum 500ms response time"
    ]
  },
  "teamMembers": [
    {
      "id": "dev1",
      "name": "Alice Chen",
      "role": "Senior Backend Developer",
      "technicalSkills": ["Node.js", "OAuth", "Security", "Database Design"],
      "experienceLevel": "senior",
      "preferredTechnologies": ["Express", "PostgreSQL", "Redis"],
      "currentWorkload": "medium"
    },
    {
      "id": "dev2",
      "name": "Bob Smith",
      "role": "Frontend Developer",
      "technicalSkills": ["React", "TypeScript", "UI/UX"],
      "experienceLevel": "mid",
      "preferredTechnologies": ["Next.js", "Tailwind CSS"],
      "currentWorkload": "low"
    }
  ]
}'
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests
