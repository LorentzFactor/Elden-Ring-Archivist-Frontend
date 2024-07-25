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
    const pineconeKey = new sst.Secret("PineConeKey");
    const openaiKey = new sst.Secret("OpenAIKey");
    new sst.aws.Remix("MyWeb", {
      domain: "the-silver-tear.com",
      link: [pineconeKey, openaiKey],
    });
  },
});
