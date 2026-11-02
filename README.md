# InostraTech · Landing de servicios

Landing en Angular 21 (standalone, zoneless, sin librerías de UI) para los servicios de InostraTech.
Se conecta a `tienda-backend` para cotizaciones y métricas.

## Desarrollo

```powershell
$env:NODE_OPTIONS="--use-system-ca"   # solo en equipos con problemas de certificados SSL
npm install
npx ng serve --port 4200              # http://localhost:4200
```

Backend esperado en `http://localhost:8080` (ver `src/environments/environment.ts`).
El backend debe permitir el origen en `CORS_ALLOWED_ORIGIN` (por defecto ya incluye `http://localhost:4200`).

## Build

```powershell
npx ng build    # producción -> dist/inostratech-landing/browser, usa environment.prod.ts (Render)
```

## Integración con el backend

| Acción                       | Endpoint                         |
|------------------------------|----------------------------------|
| Formulario "Pide tu cotización" | `POST /api/cotizaciones`      |
| Métricas (VISITA, CLICK_WHATSAPP, CLICK_PRECIOS) | `POST /api/metricas/evento` |
| Despertar Render al cargar   | `GET /api/config`                |

## Despliegue (Vercel)

`vercel.json` define el build y la salida. En el backend (Render), agregar la URL de Vercel de esta landing a
`CORS_ALLOWED_ORIGIN` (separada por coma).
