# Amazon Product Explorer

Aplicación móvil React Native Expo con TypeScript para buscar y explorar productos de Amazon.

## Tecnologías

- React Native - Framework de desarrollo móvil
- Expo - Plataforma de desarrollo
- TypeScript - Tipado estático
- React Navigation - Navegación (próximamente)
- Axios - Cliente HTTP (próximamente)

## Requisitos Previos
- Node.js v22.19.0
- npm v10.9.3
- Git instalado
- Expo CLI v54.0.16

## Estructura del Proyecto

```
amazon-product-explorer/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── screens/         # Pantallas de la aplicación
│   ├── services/        # Servicios API y lógica de negocio
│   ├── types/           # Definiciones de tipos TypeScript
│   ├── hooks/           # Custom hooks de React
│   ├── utils/           # Funciones auxiliares
│   ├── constants/       # Constantes de la aplicación
│   └── navigation/      # Configuración de navegación
├── assets/              # Imágenes, fuentes, etc.
├── App.tsx              # Componente principal
└── package.json         # Dependencias del proyecto
```

## Arquitectura

El proyecto sigue principios de Clean Architecture:

- Separación de responsabilidades: Cada capa tiene una responsabilidad única
- Componentes reutilizables: Componentes pequeños y enfocados
- Tipado fuerte: TypeScript para seguridad de tipos
- Custom hooks: Lógica de negocio separada de la UI
- Servicios API: Capa de abstracción para llamadas HTTP

## Instalación

```bash
# Navegar al directorio del proyecto
cd amazon-product-explorer

# Las dependencias ya están instaladas
# Si necesitas reinstalar:
npm install
```

## Ejecutar el Proyecto

```bash
# Iniciar el servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS (requiere macOS)
npm run ios

# Ejecutar en Web
npm run web
```

## Desarrollo

### Próximos Pasos
1. Instalar dependencias adicionales (React Navigation, Axios)
2. Configurar tipos de datos para productos de Amazon
3. Crear servicios de API
4. Implementar pantallas de búsqueda y detalle
5. Crear componentes reutilizables

## Objetivos de la Prueba Técnica

- Configurar proyecto con TypeScript (completado)
- Consumir APIs REST de Amazon
- Organizar código con buenas prácticas
- Implementar navegación entre pantallas
- Crear interfaz de usuario responsiva
- Aplicar arquitectura limpia

## Notas

- Proyecto creado con `create-expo-app` usando template `blank-typescript`
- Se siguen las mejores prácticas de React Native y TypeScript
- Estructura modular y escalable
