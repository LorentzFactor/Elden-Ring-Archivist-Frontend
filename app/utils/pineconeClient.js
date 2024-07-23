import { PineconeClient } from '@pinecone-database/pinecone';

const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY
});

export default pinecone;
