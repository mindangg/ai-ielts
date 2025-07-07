import { voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const configureAssistant = (
  voice: string,
  style: string,
  mode: "tutor" | "examiner" = "tutor"
) => {
  const voiceId =
    voices[voice as keyof typeof voices]?.[
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const voiceConfig =
    mode === "examiner"
      ? {
          stability: 0.7,
          similarityBoost: 0.9,
          speed: 0.95,
          style: 0.4,
        }
      : {
          stability: 0.4,
          similarityBoost: 0.8,
          speed: 1,
          style: 0.6,
        };

  const systemPrompt =
    mode === "examiner"
      ? `You are a certified IELTS Speaking examiner conducting a mock test.
          Your role is to simulate the real IELTS speaking exam.

          Instructions:
          - Use a neutral, professional tone.
          - Ask one question at a time.
          - Do not give feedback unless the student explicitly asks.
          - Stick strictly to the IELTS format: 
            Part 1 (Introduction & Interview), 
            Part 2 (Long Turn), 
            Part 3 (Discussion).
          - Begin with: "Let’s start with Part 1."
          - Avoid emojis or special characters.`
                : `You are a supportive IELTS speaking tutor. 
          Your job is to help the student practice speaking around the topic "{{ topic }}" in the subject "{{ subject }}".

          Guidelines:
          - Keep a {{ style }} tone.
          - Break down the topic into parts and explain it.
          - Ask simple, clear questions.
          - Occasionally correct mistakes or suggest improvements.
          - Give useful vocabulary.
          - Keep responses short and natural.
          - Avoid emojis or special characters.`;

  const vapiAssistant: CreateAssistantDTO = {
    name: "IELTSpeak",
    firstMessage:
      mode === "examiner"
        ? "Welcome to your IELTS Speaking test simulation. Let’s begin Part 1."
        : "Hi there! Let's practice your IELTS speaking. I’ll help you along the way.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId,
      useSpeakerBoost: true,
      ...voiceConfig,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
            .replace("{{ style }}", style),
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };

  return vapiAssistant;
};

