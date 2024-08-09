/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    MyWeb: {
      type: "sst.aws.Remix"
      url: string
    }
    OpenAIKey: {
      type: "sst.sst.Secret"
      value: string
    }
    PineConeKey: {
      type: "sst.sst.Secret"
      value: string
    }
    RedisKey: {
      type: "sst.sst.Secret"
      value: string
    }
    RedisUser: {
      type: "sst.sst.Secret"
      value: string
    }
  }
}
export {}
