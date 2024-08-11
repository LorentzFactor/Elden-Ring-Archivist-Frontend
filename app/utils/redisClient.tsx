import { createClient } from 'redis';
import { Resource } from 'sst';

const redisClient = createClient({
    password: Resource.RedisKey.value,
    username: Resource.RedisUser.value,
    socket: {
        host: Resource.RedisUrl.value,
        port: parseInt(Resource.RedisPort.value)
    }
});

export default redisClient;
