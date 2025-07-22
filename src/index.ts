import { csv2json, json2csv } from 'json-2-csv';
import { GetTagData } from './req';
import type { csvInterface } from './schema';

const csvFileInput = Bun.file('input.csv');
const csvStrInput = await csvFileInput.text();
const data = csv2json(csvStrInput, {
  delimiter: { field: ';' },
}) as csvInterface[];

const dataTags: csvInterface[] = [];
for (const [i, line] of data.entries()) {
  const index = i + 1
    
  if (line.tag.length !== 7) {
    line.model = 'ERRO';
    console.log(
      `[\x1b[31m✗\x1b[0m] ${index} - length tag: ${line.tag} invalid`,
    );
  } else {
    line.model = await GetTagData(line.tag.trim(), index);
  }
  dataTags.push({ tag: line.tag, model: line.model });
  await Bun.sleep(3000);
}

const csvStrOutput = json2csv(dataTags, { delimiter: { field: ';' } });
await Bun.write('output.csv', csvStrOutput);
