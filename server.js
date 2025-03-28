import express from 'express';
import { InferenceClient } from '@huggingface/inference';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const HF_API_KEY = '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'; // Replace with your actual API key
const client = new InferenceClient(HF_API_KEY);

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const chatCompletion = await client.chatCompletion({
            provider: "novita",
            model: "deepseek-ai/DeepSeek-V3-0324",
            messages: [
                {
                    role: "user",
                    content: userMessage,
                },
            ],
            max_tokens: 500,
        });

        const botMessage = chatCompletion.choices[0].message.content;
        res.json({ reply: botMessage });
    } catch (error) {
        console.error('[SERVER] Error generating response:', error);
        res.status(500).json({ reply: "Error: Unable to generate response" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[SERVER] Running on http://localhost:${PORT}`);
});
