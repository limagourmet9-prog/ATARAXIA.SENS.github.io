# Seguridad de ATARAXIA Vero

## Principios

- Nunca almacenar API keys, contraseñas, tokens o credenciales en el frontend, APK, repositorio o archivos `public/`.
- La guía inteligente del sitio funciona localmente para el diagnóstico inicial y guarda únicamente preferencias técnicas en `localStorage` del dispositivo.
- Los datos escritos por el visitante se escapan antes de insertarse en el DOM para reducir riesgos de XSS.
- Las solicitudes de cotización se abren hacia WhatsApp mediante una URL generada en el dispositivo; no se almacenan credenciales del usuario.
- Las estimaciones son orientativas y no constituyen una cotización contractual.

## Evolución segura de la IA

Si se incorpora un modelo de lenguaje remoto, la clave debe permanecer exclusivamente en un backend seguro. El navegador y la APK nunca deben recibir la clave del proveedor.

El backend deberá aplicar como mínimo: validación de entrada, límite de tamaño, rate limiting, control de origen, registro de errores sin datos sensibles, timeout, límites de tokens/costo y filtrado de información personal innecesaria.

## Actualizaciones

Las actualizaciones web se publican mediante GitHub Actions después de una revisión del código. La APK se genera desde el mismo código fuente para mantener paridad funcional.

## Reporte responsable

Para reportar una vulnerabilidad, no publiques credenciales, tokens ni información personal en issues públicos. Contacta al responsable del proyecto por un canal privado antes de divulgar el problema.