import { createClient } from 'redis';
import { Resource } from 'sst';

const createRedisClient = async () => {
    const client = createClient({
        password: Resource.RedisKey.value,
        username: Resource.RedisUser.value,
        socket: {
            host: Resource.RedisUrl.value,
            port: parseInt(Resource.RedisPort.value)
        }
    })
    await client.connect();
    return client;
};

export default createRedisClient;
