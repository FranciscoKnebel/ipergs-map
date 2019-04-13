const params = ({
  local,
  distancia = 0,
  recurso,
  especialidade,
  atuacao = 000,
  nome = '',
  cep = '',
  bairro = ''
}) => ({
  "TR": 'smh-rede-lista_medicos',
  "n01_etapa": 0,
  "n05_codlocalid": local,
  "N1_P_grava": 0,
  "n4_P_distancia": distancia,
  "n02_tipoProf": recurso,
  "n03-codespec": especialidade,
  "n03_areaatu": atuacao,
  "a45-nome-medico": nome,
  "n08-cep": cep,
  "a45-bairr": bairro
});

module.exports = params;