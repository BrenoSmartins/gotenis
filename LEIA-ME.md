# GoTênis — código inicial

## Como usar

1. Crie o projeto Expo (se ainda não criou):
   ```
   npx create-expo-app@latest GoTenis
   cd GoTenis
   ```

2. Instale as dependências usadas neste código:
   ```
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
   npx expo install react-native-screens react-native-safe-area-context
   npm install react-hook-form zod @hookform/resolvers
   npx expo install @expo/vector-icons
   ```

3. Copie as pastas `src/` e `assets/`, e o arquivo `App.js` deste pacote
   para dentro do seu projeto Expo, substituindo o `App.js` padrão.

4. Rode o projeto:
   ```
   npx expo start
   ```

## Identidade visual (atualizado)

- **Paleta oficial** aplicada em `src/constants/colors.js`: roxo `#502F70`
  (primary), creme `#FFF1E7` (surface/cards), preto e branco.
- **Logo oficial** (`assets/gotenis-logo.png`, fundo transparente) extraída
  do brandbook e usada na `LoginScreen`. Se quiser usá-la em outra tela,
  importe do mesmo jeito:
  ```js
  <Image source={require('../../assets/gotenis-logo.png')} style={{ width: 200, height: 100 }} resizeMode="contain" />
  ```

## Catálogo, fotos e links de loja (atualizado)

- **13 tênis no catálogo** (`src/data/produtos.js`), cada um com nome, marca,
  preço, foto e 2–3 lojas comparadas.
- **Fotos reais**: vêm do LoremFlickr (fotos do Flickr por palavra-chave).
  Não são fotos oficiais das lojas, mas servem bem pro protótipo. Se depois
  vocês quiserem trocar por fotos oficiais, é só trocar o campo `imagem` de
  cada item por uma URL própria ou um `require('../../assets/...')` local.
- **"Ver na loja" funciona de verdade**: cada linha de loja no `ProdutoScreen`
  e o botão "Ver na loja" abrem (via `Linking.openURL`) a busca daquele tênis
  específico no site da respectiva loja (Centauro, Netshoes, Nike.com,
  Adidas.com). Como não existe uma API pública unificada dessas lojas, o link
  aponta pra página de busca de cada uma já com o nome do produto — ao clicar,
  cai numa página real com aquele modelo.
- **Navegação até "Produto"**: reorganizei em `src/navigation/AppStack.js`,
  uma Stack que envolve as bottom tabs inteiras. Assim, tanto a Home quanto
  a Busca conseguem abrir a mesma tela de Produto (antes só a Home tinha
  acesso a ela).

## O que já está pronto

- **Navegação (Stack + Tabs)**: `src/navigation/RootNavigator.js` decide entre
  o fluxo de autenticação (`AuthStack`) e o app principal (`AppTabs`).
- **Autenticação**: `LoginScreen` e `CadastroScreen`, ambas com formulário
  validado via `react-hook-form` + `zod`.
- **4 telas principais do app**: Home, Busca, Produto, Favoritos e Perfil
  (mais que o mínimo de 4 exigido).
- **Componente reutilizável**: `InputField` evita repetir o mesmo código de
  input em cada tela de formulário.
- **Tema centralizado**: `src/constants/colors.js` e `theme.js`.

## O que falta você personalizar

- Trocar os placeholders visuais (`View` cinza) por imagens reais dos tênis.
- Ajustar as cores/tipografia pro layout que vocês tiraram do Pinterest.
- Se quiser persistir os favoritos de verdade, usar `useState`/Context
  compartilhado entre `HomeScreen`, `ProdutoScreen` e `FavoritosScreen`.
- Revisar e testar cada tela — e principalmente, entender cada trecho pra
  conseguir explicar na apresentação.

## Bônus ainda não incluído aqui

- **EAS Update**: siga o tutorial que o professor passou; basicamente é
  `npx eas update` depois de configurar o projeto com `eas init`.
