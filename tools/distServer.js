import gzipStatic from 'connect-gzip-static';
import historyApiFallback from 'connect-history-api-fallback';
import express from 'express';
import path from 'path';
import { chalkProcessing } from './chalkConfig';

const app = express();
const port = process.env.PORT || 4000;

app.use(gzipStatic('dist'));
app.use(historyApiFallback());
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(port);

console.log(chalkProcessing(`App is running on port ${port}`));
