module.exports = async (elements) => {
  return await Promise.all(elements.map(el => parseMedico(el)));
}

async function parseMedico(element) {
  const values = (await Promise.all([
    element.$eval('.titMedico', node => node.textContent.trim()), // nome
    element.$eval('.caixaEnderBusca', node => node.value.trim()), // endereco
    element.$eval('.caixaEndereco', node => node.textContent.match(/CEP: [0-9]{5}-[0-9]{3}/)[0].split('CEP:')[1].trim()), // cep
    element.$eval('.caixaEndereco', node => {
      const telefones = node.textContent.match(/([(]{0,1}[0-9]{1,4}[)][\s]*[-\.0-9]*)/g);

      return [...new Set(telefones)]; // remove duplicates
    }), // telefones

  ]));

  return new Medico({
    nome: values[0],
    endereco: values[1],
    cep: values[2],
    telefones: values[3]
  });
}

class Medico {
  constructor({ nome, endereco, cep, telefones }) {
    this.nome = nome;
    this.endereco = endereco;
    this.cep = cep;
    this.telefones = telefones;
  }
}
