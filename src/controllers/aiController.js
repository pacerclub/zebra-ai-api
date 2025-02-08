const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

exports.analyzeProjectRequirements = async (req, res, next) => {
  try {
    const { projectDescription, context = {} } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert technical project manager and business analyst who helps gather detailed project requirements. 
Your goal is to ask essential questions about unclear aspects of the project to ensure proper planning.
Focus on:
1. Technical requirements and constraints
2. Business objectives and success metrics
3. User experience expectations
4. Integration requirements
5. Security and compliance needs
6. Performance requirements
7. Timeline and budget constraints

Please provide your response in JSON format with the following structure:
{
  "understanding": {
    "clear": ["list of clear aspects"],
    "unclear": ["list of unclear aspects"]
  },
  "nextQuestions": [
    {
      "question": "specific question",
      "context": "why this is important",
      "importance": "high/medium/low"
    }
  ],
  "recommendations": ["list of recommendations"]
}`
        },
        {
          role: "user",
          content: `Initial Project Description: ${projectDescription}
${context.previousQuestions ? `\nPrevious Q&A:\n${JSON.stringify(context.previousQuestions, null, 2)}` : ''}

Please analyze this project description and provide your response in JSON format.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    res.json({
      success: true,
      analysis: {
        ...analysis,
        nextQuestions: analysis.nextQuestions || []
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.distributeTask = async (req, res, next) => {
  try {
    const { 
      taskName, 
      taskDescription, 
      teamMembers,
      projectContext = {} 
    } = req.body;

    // First, analyze if we have enough information
    const requirementsCheck = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a technical requirements analyst. Your job is to identify missing or unclear information in project tasks that could impact successful implementation.

Please provide your response in JSON format with the following structure:
{
  "needsMoreInfo": boolean,
  "questions": [
    {
      "question": "string",
      "context": "string",
      "importance": "string"
    }
  ],
  "missingAreas": ["string"]
}`
        },
        {
          role: "user",
          content: `Task Name: ${taskName}
Task Description: ${taskDescription}
Project Context: ${JSON.stringify(projectContext, null, 2)}

Please analyze if there's enough information to proceed with task distribution and provide your response in JSON format.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const checkResult = JSON.parse(requirementsCheck.choices[0].message.content);
    
    // If missing critical information, return questions
    if (checkResult.needsMoreInfo) {
      return res.json({
        success: true,
        status: "NEEDS_INFO",
        questions: checkResult.questions,
        missingAreas: checkResult.missingAreas
      });
    }

    // If we have enough information, proceed with task distribution
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
5. Balancing workload across team members based on their expertise level

Please provide your response in JSON format with the following structure:
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
        },
        {
          role: "user",
          content: `Please analyze this task and create an optimal distribution plan based on team members' skills:

Task Name: ${taskName}
Task Description: ${taskDescription}
Project Context: ${JSON.stringify(projectContext, null, 2)}

Team Members:
${JSON.stringify(teamMembers, null, 2)}

Please provide your task distribution plan in JSON format.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const taskDistribution = JSON.parse(completion.choices[0].message.content);
    res.json({
      success: true,
      status: "COMPLETE",
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
