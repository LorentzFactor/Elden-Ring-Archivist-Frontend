let getIP = async (request ) => {
    // Try to get the IP from the x-forwarded-for header
    const xForwardedFor = request.headers.get('x-forwarded-for');
    let ip = xForwardedFor ? xForwardedFor.split(',')[0] : null;
  
    // Fallback to the remote address if x-forwarded-for is not present
    if (!ip) {
      const connection = request.connection || request.socket || request.info;
      ip = connection.remoteAddress;
    }
  
    return ip;
  };

  export default getIP;
