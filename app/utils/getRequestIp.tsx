let getIP = (request: Request) => {
    let IPAddress: string | null = request.headers.get("X-Real-Ip") || request.headers.get("X-Forwarded-For");
    return IPAddress
  };

  export default getIP;
