import OpenAI from 'openai';
import { Resource } from 'sst';

const openai = new OpenAI({
  apiKey: Resource.OpenAIKey.value,
});

export default openai
