# Shopping List

Aplicativo simples feito com **React Native**, **Expo** e **TypeScript** para gerenciar uma lista de compras. Meu primeiro prjeto toalmente voltado a mobile :)

## Funcionalidades

* Adicionar itens
* Marcar itens como pendentes ou comprados
* Filtrar por status
* Remover itens
* Limpar toda a lista
* Salvamento usando Async Storage

## Como executar

```bash
npm install
npx expo start
```

Abra no **Expo Go** ou em um emulador.

## Sobre o projeto

Toda a lógica fica no `App.tsx`, incluindo:

* controle dos itens
* alternância de status
* filtros
* remoção e limpeza

A lista usa `FlatList` e o armazenamento é feito pelo módulo `itemsStorage`.

---

Se quiser uma versão ainda mais curta, me diga!
