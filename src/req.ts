import * as cheerio from 'cheerio';

export const GetTagData = async (tag: string, index: number): Promise<string> => {
  const res = await fetch(
    `https://www.dell.com/support/product-details/pt-br/servicetag/${tag}/overview`,
    {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'max-age=0',
        dpr: '1.25',
        priority: 'u=0, i',
        'sec-ch-dpr': '1.25',
        'sec-ch-ua':
          '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-viewport-width': '1920',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'viewport-width': '1920',
      },
      body: null,
      method: 'GET',
    },
  );

  if (!res.ok) {
    return 'ERRO';
  }

  const responseText = await res.text();
  const $ = cheerio.load(responseText);
  const model = $('#desktop_system_desc').text().trim();
  if (model === '') {
    console.log(
      `[\x1b[31m✗\x1b[0m] ${index} - not possible extract model from tag: ${tag}`,
    );
    return 'ERRO';
  } else console.log(`[\x1b[32m✓\x1b[0m] ${index} - extract model from tag ${tag}`);
  return model;
};
