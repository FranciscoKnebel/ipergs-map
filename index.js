const rq = require('request-promise-native');
const puppeteer = require('puppeteer');

const params = require('./params');
const parse = require('./parse');

(async ()=> {
  let html;
  try {
    html = await rq({
      method: 'POST',
      uri: 'http://webgen.procergs.com.br/cgi-bin/webgen2.cgi',
      form: params({
        local: '00696',
        recurso: '01',
        especialidade: '197'
      })
    });
  } catch (e) {
    console.error(e);
    process.exit();
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setContent(html);

  // Parsing Loop
  let index = 0;
  let done = false;
  let results = [];

  console.log('starting parsing loop');
  while (!done) {    
    // Parse elements
    const elements = await page.$$('.medico')
    const parsed = await parse(elements);
    results.push(...parsed);

    console.log(`
    Página ${++index}
    Médicos carregados: ${results.length}
    `);
    
    const nextButton = await page.$('.botContinua');
    if (nextButton) {
      await nextButton.click();
      await page.waitForNavigation();
    } else {
      done = true;
    }
  }

  console.log('FINALIZADO!');
  console.log('Total de médicos obtidos:', results.length);
  console.log(results);

  await browser.close();
})();
