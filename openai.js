const { Configuration, OpenAIApi } = require('openai');
const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const api = new OpenAIApi(config);

async function getAIReply(text) {
  const resp = await api.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: text }],
    temperature: 0.7,
  });
  return resp.data.choices[0].message.content.trim();
}

module.exports = { getAIReply };
