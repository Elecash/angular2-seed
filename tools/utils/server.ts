import * as connectLivereload from 'connect-livereload';
import * as express from 'express';
import * as tinylrFn from 'tiny-lr';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import {join, resolve} from 'path';
import {
  APP_BASE,
  APP_DEST,
  APP_ROOT,
  DOCS_DEST,
  ENV,
  LIVE_RELOAD_PORT,
  DOCS_PORT,
  PORT
} from '../config';

let tinylr = tinylrFn();


export function serveSPA() {
  let server = express();
  tinylr.listen(LIVE_RELOAD_PORT);

  server.use(
    APP_BASE,
    connectLivereload({ port: LIVE_RELOAD_PORT }),
    express.static(join(process.cwd(), (ENV === 'prod' ? APP_DEST : '')))
  );

  server.listen(PORT, () =>
    openResource('http://localhost:' + PORT + APP_ROOT)
  );
}

export function notifyLiveReload(e) {
  let fileName = e.path;
  tinylr.changed({
    body: { files: [fileName] }
  });
}

export function serveDocs() {
  let server = express();

   server.use(
    APP_BASE,
    serveStatic(resolve(process.cwd(), DOCS_DEST))
  );

   server.listen(DOCS_PORT, () =>
    openResource('http://localhost:' + DOCS_PORT + APP_BASE)
  );
}
