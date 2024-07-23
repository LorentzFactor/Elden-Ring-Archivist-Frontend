import { Pinecone } from '@pinecone-database/pinecone';

console.log(process.env)
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!
});

const default_index = pinecone.index('elden-ring-default-index')

export default default_index;
