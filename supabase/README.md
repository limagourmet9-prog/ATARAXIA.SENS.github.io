# ATARAXIA Vero — seguridad

Esta carpeta contiene la configuración SQL versionada de forma segura.

## Credenciales

- La URL y la clave publicable de Supabase pueden ser usadas por el frontend.
- La contraseña del administrador y cualquier clave secreta nunca se guardan aquí.
- La service-role key debe permanecer exclusivamente en un entorno de servidor/secret manager.

## Configuración del administrador

El único usuario administrativo debe tener `app_metadata.role = admin` en Supabase Auth. No se debe usar `user_metadata` para autorizar privilegios.

Ejemplo para ejecutar en SQL Editor, sustituyendo el UUID por el del usuario administrador:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'admin')
where id = 'UUID_DEL_ADMINISTRADOR';
```

Después de cambiar `app_metadata`, el administrador debe cerrar sesión y volver a iniciar sesión para recibir un JWT con los nuevos claims.
