const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

exports.distributeTask = async (req, res, next) => {
  try {
    const { 
      taskName, 
      taskDescription, 
      teamMembers 
    } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert technical project manager who specializes in:
1. Analyzing technical requirements and breaking them down into specific tasks
2. Understanding team members' technical strengths and matching them with appropriate tasks
3. Identifying technical dependencies and creating efficient workflows
4. Estimating task complexity and time requirements
5. Balancing workload across team members based on their expertise level`
        },
        {
          role: "user",
          content: `Please analyze this task and create an optimal distribution plan based on team members' skills:

Task Name: ${taskName}
Task Description: ${taskDescription}

Team Members:
${JSON.stringify(teamMembers, null, 2)}

Provide a detailed distribution plan in JSON format that includes:
1. Overall technical architecture and stack requirements
2. Task breakdown with technical specifications
3. Team member assignments based on their expertise
4. Dependencies and workflow
5. Risk assessment and mitigation strategies

Use this JSON structure:
{
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
      "estimatedHours": number,
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
}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const taskDistribution = JSON.parse(completion.choices[0].message.content);
    res.json({
      success: true,
      distribution: taskDistribution
    });
  } catch (error) {
    next(error);
  }
};

exports.analyzeTask = async (req, res, next) => {
  try {
    const { projectDescription, task } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert software developer helping to break down coding tasks and provide technical guidance."
        },
        {
          role: "user",
          content: `Project Context: ${projectDescription}\nTask to analyze: ${task}\n\nPlease break down this task into smaller, manageable subtasks and provide technical requirements and suggestions.`
        }
      ]
    });

    res.json({
      success: true,
      analysis: completion.choices[0].message.content
    });
  } catch (error) {
    next(error);
  }
};

exports.reviewCode = async (req, res, next) => {
  try {
    const { code, language, context } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert code reviewer. Analyze the code for best practices, potential bugs, and suggest improvements."
        },
        {
          role: "user",
          content: `Please review this ${language} code:\n\nContext: ${context}\n\nCode:\n${code}`
        }
      ]
    });

    res.json({
      success: true,
      review: completion.choices[0].message.content
    });
  } catch (error) {
    next(error);
  }
};
