import webpack from 'webpack';
import config from '../webpack.config.prod';
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig';
import cleanDist from './cleanDist';

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

const mode = (process.argv[2] || '').split('--')[1] || 'production';

console.log(chalkProcessing('Cleaning /dist...'));

cleanDist();

console.log(chalkProcessing('Generating files...'));

webpack(config).run((error, stats) => {
  if (error) {
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.errors.length > 0) {
    return jsonStats.errors.map(error => console.log(chalkError(error?.message || error)));
  }

  if (jsonStats.warnings.length > 0) {
    console.log(chalkWarning('Files generated with warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning?.message || warning)));
  }

  console.log(chalkSuccess(`Build files using ${mode} mode are ready at /dist!`));

  return 0;
});
