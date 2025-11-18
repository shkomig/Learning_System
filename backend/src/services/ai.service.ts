import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

interface Exercise {
  type: string;
  num1: number;
  num2: number;
  answer: number;
  topic: string;
}

/**
 * Generate a hint for an exercise using AI
 * Falls back to predefined hints if AI is not available
 */
export async function generateHint(exercise: Exercise, attemptNumber: number): Promise<string> {
  // Fallback hints if AI is not configured
  if (!openai) {
    return getFallbackHint(exercise, attemptNumber);
  }

  try {
    const prompt = buildHintPrompt(exercise, attemptNumber);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'אתה מורה מתמטיקה לכיתות א-ב. תן רמזים מעודדים ומתאימים לגיל בעברית.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || getFallbackHint(exercise, attemptNumber);
  } catch (error) {
    console.error('AI hint generation failed:', error);
    return getFallbackHint(exercise, attemptNumber);
  }
}

/**
 * Build prompt for hint generation
 */
function buildHintPrompt(exercise: Exercise, attemptNumber: number): string {
  const operation = exercise.type === 'addition' ? '+' : '-';
  
  return `
התלמיד פותר: ${exercise.num1} ${operation} ${exercise.num2} = ?
זהו ניסיון מספר ${attemptNumber + 1}.
תן רמז קצר (1-2 משפטים) שיעזור אבל לא יגלה את התשובה.
הרמז צריך להיות מעודד ומתאים לילד בכיתה א-ב.
  `.trim();
}

/**
 * Get fallback hint when AI is not available
 */
function getFallbackHint(exercise: Exercise, attemptNumber: number): string {
  const hints = generateFallbackHints(exercise);
  return hints[Math.min(attemptNumber, hints.length - 1)];
}

/**
 * Generate predefined fallback hints
 */
function generateFallbackHints(exercise: Exercise): string[] {
  if (exercise.type === 'addition') {
    return [
      `נסה לספור ${exercise.num1} פריטים ועוד ${exercise.num2} פריטים. כמה יש בסך הכל?`,
      `התחל מהמספר ${exercise.num1} והוסף ${exercise.num2}. תעזר בעצמך עם האצבעות!`,
      `התשובה היא ${exercise.answer}. עכשיו נסה לפתור תרגיל דומה!`,
    ];
  } else {
    return [
      `יש לך ${exercise.num1} פריטים. אם תסיר ${exercise.num2}, כמה ישאר?`,
      `התחל מ-${exercise.num1} וספור אחורה ${exercise.num2} צעדים.`,
      `התשובה היא ${exercise.answer}. עכשיו נסה לפתור תרגיל דומה!`,
    ];
  }
}

/**
 * Analyze student performance and provide feedback
 */
export async function generateFeedback(
  correctAnswers: number,
  totalAttempts: number,
  strugglingTopics: string[]
): Promise<string> {
  if (!openai) {
    return generateFallbackFeedback(correctAnswers, totalAttempts, strugglingTopics);
  }

  try {
    const prompt = `
תלמיד ענה נכון על ${correctAnswers} מתוך ${totalAttempts} תרגילים.
${strugglingTopics.length > 0 ? `נושאים שבהם הוא מתקשה: ${strugglingTopics.join(', ')}` : 'הוא מצליח טוב בכל הנושאים!'}

תן משוב מעודד וקצר (2-3 משפטים) בעברית, מתאים לילד בכיתה א-ב.
    `.trim();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'אתה מורה מתמטיקה מעודד לכיתות א-ב. תן משוב חיובי ומעודד.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.8,
    });

    return completion.choices[0]?.message?.content || generateFallbackFeedback(correctAnswers, totalAttempts, strugglingTopics);
  } catch (error) {
    console.error('AI feedback generation failed:', error);
    return generateFallbackFeedback(correctAnswers, totalAttempts, strugglingTopics);
  }
}

function generateFallbackFeedback(
  correctAnswers: number,
  totalAttempts: number,
  strugglingTopics: string[]
): string {
  const successRate = totalAttempts > 0 ? correctAnswers / totalAttempts : 0;
  
  if (successRate >= 0.8) {
    return 'עבודה מצוינת! אתה מתקדם נהדר! המשך כך! 🌟';
  } else if (successRate >= 0.6) {
    return 'יפה מאוד! עוד קצת תרגול ותהיה מושלם! 💪';
  } else {
    return 'אל תתייאש! כל תרגול עוזר לך להשתפר. המשך לנסות! 🎯';
  }
}


