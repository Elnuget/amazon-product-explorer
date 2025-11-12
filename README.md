# Amazon Product Explorer

Aplicación React Native Expo para buscar y explorar productos de Amazon utilizando la API de RapidAPI.

## Estructura del Proyecto

```
amazon-product-explorer/
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── screens/          # Pantallas de la aplicación
│   ├── navigation/       # Configuración de navegación
│   ├── services/         # Servicios API y almacenamiento
│   ├── hooks/            # Hooks personalizados
│   ├── types/            # Definiciones TypeScript
│   ├── constants/        # Constantes y configuración
│   └── utils/            # Utilidades
├── assets/               # Recursos estáticos
├── App.tsx              # Componente principal
├── index.ts             # Punto de entrada
├── app.json             # Configuración Expo
├── package.json         # Dependencias
└── tsconfig.json        # Configuración TypeScript
```

## Tecnologías

- React Native 0.81.5
- Expo 54.0
- TypeScript 5.9
- React 19.1
- Async Storage 2.2
- RapidAPI (Amazon Real-Time API)

## Requisitos

- Node.js 22.19+
- npm 10.9+
- Expo CLI

## Instalación

```bash
npm install
```

## Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm start
```

Ejecutar en plataformas específicas:

```bash
npm run android
npm run ios
npm run web
```

## Funcionalidades

- Navegación por categorías de productos
- Búsqueda de productos
- Detalles de productos con ofertas y reseñas
- Historial de búsquedas
- Gestión de favoritos
- Persistencia de datos local
