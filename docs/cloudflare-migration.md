# Migración de Netlify a Cloudflare Pages

Estado a 8 de septiembre de 2026.

## Dónde estamos

| | Estado |
|---|---|
| Proyecto de Pages | ✅ Creado: `aerovision` → **https://aerovision-f0w.pages.dev** |
| Primer deploy | ✅ Subido y verificado (todas las rutas responden 200) |
| `_redirects` (SPA) | ✅ Funciona igual que en Netlify |
| `_headers` (caché + seguridad) | ✅ Aplicándose en producción |
| SEO estático por ruta | ✅ Cada URL sirve su propio `<title>` y canonical |
| DNS | ⏳ Sigue en **AWS Route 53**, apuntando a Netlify |
| Dominio `aerovision.gt` | ⏳ Todavía lo sirve Netlify |

El sitio nuevo ya se puede revisar en la URL de Pages sin tocar el dominio.
Netlify sigue sirviendo `aerovision.gt` hasta que cambiemos los nameservers.

## DNS actual (inventario antes de mover nada)

Nameservers en Route 53:

```
ns-501.awsdns-62.com
ns-749.awsdns-29.net
ns-1133.awsdns-13.org
ns-1830.awsdns-36.co.uk
```

Registros públicos visibles hoy:

| Nombre | Tipo | Valor | Para qué |
|---|---|---|---|
| `aerovision.gt` | A | `75.2.60.5` | Netlify (se reemplaza) |
| `www.aerovision.gt` | CNAME | `aerovisiongt.netlify.app` | Netlify (se reemplaza) |
| `aerovision.gt` | **MX** | `10 inbound-smtp.us-east-1.amazonaws.com` | **Correo entrante (AWS SES) — NO PERDER** |

No hay TXT, CAA ni subdominios adicionales visibles desde fuera. Aun así, **antes
de mover nada hay que exportar la zona completa desde Route 53**: los registros
TXT de verificación (SES, Google, etc.) a veces no aparecen en consultas
genéricas y son los que rompen el correo si se pierden.

## Lo que falta, paso a paso

### 1. Exportar la zona de Route 53 (tú)

En la consola de AWS → Route 53 → Hosted zones → `aerovision.gt` → **Export to
CSV**. Guardá ese archivo. Es la red de seguridad de toda la migración.

### 2. Bajar los TTL (tú)

En Route 53, poné TTL de **300 segundos** en el registro A del apex y en el CNAME
de `www`. Esperá a que expire el TTL viejo (normalmente 1 hora) antes del paso 4.
Esto hace que el cambio se propague rápido y que un rollback también sea rápido.

### 3. Agregar el dominio en Cloudflare (tú)

Cloudflare Dashboard → **Add a site** → `aerovision.gt` → plan Free. Cloudflare
escanea y copia los registros de Route 53.

**Antes de continuar, revisá registro por registro contra el CSV del paso 1.**
Especialmente:

- [ ] El **MX** a `inbound-smtp.us-east-1.amazonaws.com` está presente, con
      prioridad 10 y en modo **DNS only** (nube gris). Si esto falta o queda
      proxied, deja de llegar el correo del dominio.
- [ ] Todos los TXT del CSV están copiados tal cual.
- [ ] No hay registros de más que no reconozcas.

### 4. Cambiar los nameservers en el registrador (tú)

Cloudflare te da dos nameservers. Hay que ponerlos en el registrador donde está
comprado `aerovision.gt` (no en AWS — Route 53 sólo aloja la zona).

⚠️ Este es el único paso que puede tumbar el sitio **y el correo** a la vez.
Hacelo con el CSV del paso 1 a la mano.

La propagación suele tardar entre 30 minutos y algunas horas.

### 5. Conectar el dominio a Pages (yo, o tú desde el panel)

Con el dominio ya en Cloudflare:

Dashboard → Workers & Pages → `aerovision` → **Custom domains** → Add:

- `aerovision.gt`
- `www.aerovision.gt`

Cloudflare crea los registros (con CNAME flattening en el apex, que es justo lo
que Route 53 no podía hacer) y emite el certificado TLS solo.

### 6. Elegir dominio canónico (yo)

Definir si manda `aerovision.gt` o `www.aerovision.gt` y crear una Redirect Rule
para el otro. Hoy el sitio se anuncia como `aerovision.gt` (así está en el
sitemap, el canonical y GA4), así que lo lógico es que `www` redirija al apex.

### 7. Limpieza, una semana después (yo)

Cuando el dominio lleve unos días estable en Cloudflare:

- [ ] Borrar `netlify.toml`
- [ ] Bajar el sitio de Netlify (o dejarlo sin dominio como respaldo)
- [ ] Borrar la zona en Route 53 sólo cuando el correo lleve días funcionando

## Cómo desplegar de ahora en adelante

```sh
npm run deploy
```

Eso corre el build y sube `dist/` a Pages (`wrangler pages deploy`). El proyecto
es de subida directa, igual que los demás sitios de la cuenta — no está conectado
a GitHub, así que **un push a `main` no despliega solo**.

Si en algún momento se quiere deploy automático por Git: Dashboard → el proyecto
→ Settings → Builds & deployments → Connect to Git, con build `npm run build`,
output `dist` y `NODE_VERSION=20` (ya está en `.nvmrc`).

## Rollback

Mientras el sitio de Netlify siga existiendo, volver es cambiar los nameservers
de vuelta a los de Route 53 en el registrador. Con TTL en 300s, cuestión de
minutos.

## Notas

- Pages tiene un límite de **25 MiB por archivo**. El showreel de Acton pesaba
  23 MB en HEVC `.mov`; se recodificó a H.264 MP4 de 7.6 MB, lo que además
  arregla que no reprodujera en Chrome ni Firefox.
- Quedan cuatro videos entre 9 y 17 MB en `src/assets/work/`. Están dentro del
  límite, pero pesan en la carga de la página de drones si algún día se quieren
  recomprimir.
