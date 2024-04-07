import { HuggingFaceInference } from "@langchain/community/llms/hf"

export const mistralModel = new HuggingFaceInference({
    // model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    temperature: 0.8,
    maxTokens: 500
})
