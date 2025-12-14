import parseFile from './src/parser.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  console.log(data1);
  console.log(data2);
};

export default genDiff;
