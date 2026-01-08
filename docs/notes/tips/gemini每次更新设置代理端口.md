```json
import { setGlobalDispatcher, ProxyAgent } from "undici";

const dispatcher = new ProxyAgent({ uri: new URL('http://127.0.0.1:22307').toString() });

setGlobalDispatcher(dispatcher);
```

