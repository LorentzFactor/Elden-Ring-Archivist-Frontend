/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "elden-ring-archivist-frontend",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // initialize secrets for connecting to external services
    const pineconeKey = new sst.Secret("PineConeKey");
    const openaiKey = new sst.Secret("OpenAIKey");
    const redisKey = new sst.Secret("RedisKey");
    const redisUser = new sst.Secret("RedisUser");
    const redisUrl = new sst.Secret("RedisUrl");
    const redisPort = new sst.Secret("RedisPort");

    new sst.aws.Remix("MyWeb", {
      domain: "the-silver-tear.com",
      link: [pineconeKey, openaiKey, redisKey, redisUser, redisUrl, redisPort],
    });
  },
});
