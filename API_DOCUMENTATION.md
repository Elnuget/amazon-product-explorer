# API Documentation - Amazon Product Explorer

## Autenticación

Todos los endpoints requieren los siguientes headers:

```typescript
{
  'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
  'x-rapidapi-key': '426867ccdbmshe9e343995572f8cp186f8bjsn1b5a9ecd9b76'
}
```

## Base URL

```
https://real-time-amazon-data.p.rapidapi.com
```

## Endpoints Disponibles

### 1. Product Search

Endpoint: `GET /search`

Busca productos en Amazon por término de búsqueda.

URL Completa:
```
https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US
```

Query Parameters:
| Parámetro | Tipo | Requerido | Descripción | Ejemplo |
|-----------|------|-----------|-------------|---------|
| `query` | string | Sí | Término de búsqueda | `Phone` |
| `page` | number | Sí | Número de página | `1` |
| `country` | string | Sí | Código de país | `US` |

Ejemplo de uso:
```typescript
const response = await fetch(
  'https://real-time-amazon-data.p.rapidapi.com/search?query=iPhone&page=1&country=US',
  {
    headers: {
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
      'x-rapidapi-key': '426867ccdbmshe9e343995572f8cp186f8bjsn1b5a9ecd9b76'
    }
  }
);
```

---

### 2. Products by Category

Endpoint: `GET /products-by-category`

Obtiene productos de una categoría específica.

URL Completa:
```
https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=281407&page=1&country=US
```

Query Parameters:
| Parámetro | Tipo | Requerido | Descripción | Ejemplo |
|-----------|------|-----------|-------------|---------|
| `category_id` | string | Sí | ID de la categoría | `281407` |
| `page` | number | Sí | Número de página | `1` |
| `country` | string | Sí | Código de país | `US` |

---

### 3. Product Details

Endpoint: `GET /product-details`

Obtiene detalles completos de un producto específico.

URL Completa:
```
https://real-time-amazon-data.p.rapidapi.com/product-details?asin=B07ZPKBL9V&country=US
```

Query Parameters:
| Parámetro | Tipo | Requerido | Descripción | Ejemplo |
|-----------|------|-----------|-------------|---------|
| `asin` | string | Sí | Amazon Standard Identification Number | `B07ZPKBL9V` |
| `country` | string | Sí | Código de país | `US` |

Ejemplo de uso:
```typescript
const response = await fetch(
  'https://real-time-amazon-data.p.rapidapi.com/product-details?asin=B07ZPKBL9V&country=US',
  {
    headers: {
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
      'x-rapidapi-key': '426867ccdbmshe9e343995572f8cp186f8bjsn1b5a9ecd9b76'
    }
  }
);
```

---

### 4. Product Reviews

Endpoint: `GET /product-reviews`

Obtiene las reseñas de un producto.

URL Completa:
```
https://real-time-amazon-data.p.rapidapi.com/product-reviews?asin=B07ZPKN6YR&country=US&page=1
```

Query Parameters:
| Parámetro | Tipo | Requerido | Descripción | Ejemplo |
|-----------|------|-----------|-------------|---------|
| `asin` | string | Sí | Amazon Standard Identification Number | `B07ZPKN6YR` |
| `country` | string | Sí | Código de país | `US` |
| `page` | number | Sí | Número de página | `1` |

---

### 5. Product Offers

Endpoint: `GET /product-offers`

Obtiene las ofertas disponibles de un producto.

URL Completa:
```
https://real-time-amazon-data.p.rapidapi.com/product-offers?asin=B09SM24S8C&country=US&limit=100&page=1
```

Query Parameters:
| Parámetro | Tipo | Requerido | Descripción | Ejemplo |
|-----------|------|-----------|-------------|---------|
| `asin` | string | Sí | Amazon Standard Identification Number | `B09SM24S8C` |
| `country` | string | Sí | Código de país | `US` |
| `limit` | number | Sí | Límite de resultados (máx 100) | `100` |
| `page` | number | Sí | Número de página | `1` |

---

## Códigos de País Soportados

- `US` - Estados Unidos
- (Verificar otros países disponibles en la documentación de RapidAPI)

## Notas Importantes

1. Rate Limiting: Verificar límites de la API en tu plan de RapidAPI
2. API Key: La key proporcionada es para desarrollo, considerar usar variables de entorno en producción
3. Error Handling: Implementar manejo de errores para respuestas 4xx y 5xx
4. Caching: Considerar implementar caché para reducir llamadas a la API

## Implementación Recomendada

Ver el archivo `src/services/amazonApi.ts` para la implementación del cliente de API con TypeScript.
