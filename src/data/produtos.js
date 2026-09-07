// Catálogo mockado do GoTênis.
// Não existe uma API pública unificada das lojas (Centauro, Netshoes, Nike),
// então os dados aqui são estáticos — o de praxe para um protótipo de UI.
//
// As fotos vêm do LoremFlickr (serviço público que retorna fotos reais do
// Flickr por palavra-chave). Não são fotos oficiais de cada loja, mas
// servem bem pra representar visualmente o catálogo no protótipo.
//
// Os links de loja apontam pra busca de cada loja já com o nome do tênis,
// ou seja, ao clicar o usuário cai numa página real com aquele modelo.

function fotoTenis(seed, tags) {
  return `https://loremflickr.com/480/360/${tags}?lock=${seed}`;
}

function linkLoja(loja, nomeProduto) {
  const termo = encodeURIComponent(nomeProduto);
  const bases = {
    Centauro: `https://www.centauro.com.br/busca?q=${termo}`,
    Netshoes: `https://www.netshoes.com.br/busca?q=${termo}`,
    'Nike.com': `https://www.nike.com.br/search?q=${termo}`,
    'Adidas.com': `https://www.adidas.com.br/busca?q=${termo}`,
  };
  return bases[loja] ?? `https://www.google.com/search?q=comprar+${termo}`;
}

function montarLojas(nomeProduto, precoBase, lojasComVariacao) {
  return lojasComVariacao.map(({ loja, variacao }) => ({
    loja,
    preco: `R$ ${(precoBase + variacao).toFixed(2).replace('.', ',')}`,
    url: linkLoja(loja, nomeProduto),
  }));
}

const CATALOGO_BASE = [
  {
    id: '1',
    nome: 'Nike Air Max SC',
    marca: 'Nike',
    precoBase: 399.9,
    tags: 'nike,sneaker,white',
    lojas: [{ loja: 'Centauro', variacao: 0 }, { loja: 'Nike.com', variacao: 30 }, { loja: 'Netshoes', variacao: 19.1 }],
  },
  {
    id: '2',
    nome: 'Adidas Runfalcon 3',
    marca: 'Adidas',
    precoBase: 259.9,
    tags: 'adidas,sneaker,running',
    lojas: [{ loja: 'Netshoes', variacao: 0 }, { loja: 'Adidas.com', variacao: 20 }, { loja: 'Centauro', variacao: 10 }],
  },
  {
    id: '3',
    nome: 'Nike Revolution 6',
    marca: 'Nike',
    precoBase: 289.9,
    tags: 'nike,running,shoe',
    lojas: [{ loja: 'Centauro', variacao: 0 }, { loja: 'Nike.com', variacao: 25 }, { loja: 'Netshoes', variacao: 12 }],
  },
  {
    id: '4',
    nome: "Nike Air Force 1 '07",
    marca: 'Nike',
    precoBase: 749.9,
    tags: 'nike,airforce,white,sneaker',
    lojas: [{ loja: 'Nike.com', variacao: 0 }, { loja: 'Centauro', variacao: 15 }, { loja: 'Netshoes', variacao: 40 }],
  },
  {
    id: '5',
    nome: 'Adidas Superstar',
    marca: 'Adidas',
    precoBase: 599.9,
    tags: 'adidas,superstar,shelltoe',
    lojas: [{ loja: 'Adidas.com', variacao: 0 }, { loja: 'Centauro', variacao: 20 }, { loja: 'Netshoes', variacao: 35 }],
  },
  {
    id: '6',
    nome: 'Adidas Stan Smith',
    marca: 'Adidas',
    precoBase: 549.9,
    tags: 'adidas,stansmith,white,sneaker',
    lojas: [{ loja: 'Adidas.com', variacao: 0 }, { loja: 'Netshoes', variacao: 18 }],
  },
  {
    id: '7',
    nome: 'Converse Chuck Taylor All Star',
    marca: 'Converse',
    precoBase: 279.9,
    tags: 'converse,chucktaylor,canvas',
    lojas: [{ loja: 'Centauro', variacao: 0 }, { loja: 'Netshoes', variacao: 10 }],
  },
  {
    id: '8',
    nome: 'Vans Old Skool',
    marca: 'Vans',
    precoBase: 349.9,
    tags: 'vans,oldskool,skate,sneaker',
    lojas: [{ loja: 'Centauro', variacao: 0 }, { loja: 'Netshoes', variacao: 22 }],
  },
  {
    id: '9',
    nome: 'New Balance 574',
    marca: 'New Balance',
    precoBase: 499.9,
    tags: 'newbalance,574,sneaker',
    lojas: [{ loja: 'Netshoes', variacao: 0 }, { loja: 'Centauro', variacao: 28 }],
  },
  {
    id: '10',
    nome: 'Puma Suede Classic',
    marca: 'Puma',
    precoBase: 329.9,
    tags: 'puma,suede,sneaker',
    lojas: [{ loja: 'Netshoes', variacao: 0 }, { loja: 'Centauro', variacao: 15 }],
  },
  {
    id: '11',
    nome: 'Nike Air Max 90',
    marca: 'Nike',
    precoBase: 799.9,
    tags: 'nike,airmax90,sneaker',
    lojas: [{ loja: 'Nike.com', variacao: 0 }, { loja: 'Centauro', variacao: 30 }, { loja: 'Netshoes', variacao: 45 }],
  },
  {
    id: '12',
    nome: 'Reebok Classic Leather',
    marca: 'Reebok',
    precoBase: 379.9,
    tags: 'reebok,classic,leather,sneaker',
    lojas: [{ loja: 'Centauro', variacao: 0 }, { loja: 'Netshoes', variacao: 12 }],
  },
  {
    id: '13',
    nome: 'Adidas Gazelle',
    marca: 'Adidas',
    precoBase: 459.9,
    tags: 'adidas,gazelle,suede,sneaker',
    lojas: [{ loja: 'Adidas.com', variacao: 0 }, { loja: 'Centauro', variacao: 20 }],
  },
];

export const PRODUTOS = CATALOGO_BASE.map((item, index) => {
  const lojas = montarLojas(item.nome, item.precoBase, item.lojas);
  return {
    id: item.id,
    nome: item.nome,
    marca: item.marca,
    preco: lojas[0].preco,
    imagem: fotoTenis(index + 1, item.tags),
    lojas,
    lojaPrincipal: lojas[0],
  };
});
