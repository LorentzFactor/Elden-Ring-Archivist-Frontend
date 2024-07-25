import { Pinecone } from '@pinecone-database/pinecone';
import { Resource } from 'sst';

const pinecone = new Pinecone({
  apiKey: Resource.PineConeKey.value,
});

const default_index = pinecone.index('elden-ring-default-index')

export default default_index;
