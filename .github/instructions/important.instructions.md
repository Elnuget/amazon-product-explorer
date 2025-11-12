---
applyTo: '**'
---

Amazon Product Explorer - Prueba Técnica

API Configuration

Headers (todos los endpoints):
```
x-rapidapi-host: real-time-amazon-data.p.rapidapi.com
x-rapidapi-key: 426867ccdbmshe9e343995572f8cp186f8bjsn1b5a9ecd9b76
```

Endpoints:

1. Search: GET /search?query=Phone&page=1&country=US
2. Category: GET /products-by-category?category_id=281407&page=1&country=US
3. Details: GET /product-details?asin=B07ZPKBL9V&country=US
4. Reviews: GET /product-reviews?asin=B07ZPKN6YR&country=US&page=1
5. Offers: GET /product-offers?asin=B09SM24S8C&country=US&limit=100&page=1

Base URL: https://real-time-amazon-data.p.rapidapi.com

Directrices:

- TypeScript con tipado fuerte
- Clean Architecture (separación de responsabilidades)
- Error handling apropiado
- Loading states
- Responsive design
- Code reusability
- Código minimalista y claro
- Evitar emojis en código y documentación

Estructura:

src/
  components/      - Componentes reutilizables
  screens/         - Pantallas principales
  services/        - Servicios API
  types/           - Tipos TypeScript
  hooks/           - Custom hooks
  utils/           - Funciones auxiliares
  constants/       - Constantes
  navigation/      - Navegación

Arquitectura:

- Clean Architecture
- Separación de responsabilidades
- Tipado fuerte
- Custom hooks para lógica de negocio
- Servicios API como capa de abstracción

Comandos:

npm start        - Desarrollo
npm run android  - Android
npm run ios      - iOS
npm run web      - Web

Requisitos:
- Node.js v22.19.0
- npm v10.9.3
- Expo CLI v54.0.16
