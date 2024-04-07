import { HuggingFaceInference } from "@langchain/community/llms/hf"

export const mistralModel = new HuggingFaceInference({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    maxTokens: 2000
})
