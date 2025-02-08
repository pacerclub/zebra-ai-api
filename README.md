# Zebra AI API

The AI backend for the Zebra coding platform, providing intelligent task distribution and project management through AI.

## Features

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

### POST /api/ai/distribute-task
Analyzes tasks and creates optimal distribution plans based on team members' technical expertise.

#### Request Body
```json
{
  "taskName": "string",
  "taskDescription": "string",
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
```json
{
  "success": true,
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

### POST /api/ai/analyze-task
Analyzes and breaks down coding tasks into manageable subtasks.

### POST /api/ai/review-code
Reviews code and provides suggestions for improvements.

## Example Usage

Here's an example of how to use the task distribution API:

```bash
curl -X POST http://localhost:5793/api/ai/distribute-task \
-H "Content-Type: application/json" \
-d '{
  "taskName": "Implement OAuth Authentication",
  "taskDescription": "Create a secure OAuth 2.0 authentication system with support for multiple providers (Google, GitHub) and JWT token management",
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
    },
    {
      "id": "dev3",
      "name": "Charlie Wong",
      "role": "DevOps Engineer",
      "technicalSkills": ["Docker", "CI/CD", "Cloud Infrastructure"],
      "experienceLevel": "senior",
      "preferredTechnologies": ["AWS", "GitHub Actions"],
      "currentWorkload": "low"
    }
  ]
}'
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests
