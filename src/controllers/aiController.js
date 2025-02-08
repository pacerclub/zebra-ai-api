const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

exports.distributeTask = async (req, res, next) => {
  try {
    const { taskName, taskDescription, numberOfPeople } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert project manager who helps distribute tasks among team members effectively. You should provide a detailed breakdown of tasks and responsibilities in JSON format."
        },
        {
          role: "user",
          content: `Please analyze this task and distribute it among ${numberOfPeople} people:\nTask Name: ${taskName}\nTask Description: ${taskDescription}\n\nProvide the distribution in JSON format with the following structure:\n{
            "taskName": "string",
            "totalPeople": number,
            "distribution": [
              {
                "roleNumber": number,
                "responsibilities": ["string"],
                "estimatedWorkload": "string",
                "skillsRequired": ["string"],
                "dependencies": ["string"]
              }
            ]
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
