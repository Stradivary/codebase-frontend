import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync} from 'fs';

export default function cleanDist(path = 'dist') {
  if (!existsSync(path)) return;

  readdirSync(path).forEach(file => {
    const curPath = path + '/' + file;
    lstatSync(curPath).isDirectory() ? cleanDist(curPath) : unlinkSync(curPath);
  });

  rmdirSync(path);
};
