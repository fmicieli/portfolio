# Florencia Micieli — Portfolio

Landing de portfolio personal (Next.js 16, App Router, Tailwind v4, Framer Motion). Página única con secciones ancladas (`#proyectos`, `#sobre-mi`, `#contacto`) y case studies nativos por proyecto en `/proyectos/[slug]`.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción + type-check
npm run lint    # eslint
```

## Estructura de contenido

- [`data/projects.ts`](data/projects.ts): array único que alimenta tanto el grid de la home como cada case study page. Cada proyecto tiene `contentReady: boolean` — mientras sea `false`, la página muestra un aviso "TODO: contenido pendiente" y un link temporal a Behance en vez de inventar contenido.
- Para sumar contenido real (texto e imágenes de mayor resolución) a un proyecto existente: editar sus `sections` en `data/projects.ts`, poner `contentReady: true`, y pasar `coverImage` / `imageSrc` con la ruta real (colocar los archivos en `public/proyectos/<slug>/...`).
- Para sumar un proyecto nuevo: agregar una entrada al array — el grid y la ruta dinámica `/proyectos/[slug]` lo levantan automáticamente vía `generateStaticParams`.

## Deploy en Vercel

1. Subir este repo a GitHub (o el remoto que prefieras).
2. En [vercel.com/new](https://vercel.com/new), importar el repo. Vercel detecta Next.js automáticamente — no hace falta configurar build command ni output directory.
3. Deploy. Cada push a `main` genera un deploy de producción; cada PR genera un preview.

## Conectar el dominio florenciamicieli.com.ar

1. En el dashboard del proyecto en Vercel → **Settings → Domains** → agregar `florenciamicieli.com.ar` (y opcionalmente `www.florenciamicieli.com.ar` con redirect al apex).
2. Vercel muestra los registros DNS a configurar. Como `.com.ar` se gestiona vía NIC Argentina, entrar al panel de NIC (o del proveedor donde esté delegado el DNS) y cargar:
   - Registro **A** del apex (`@`) apuntando a `76.76.21.21` (la IP que Vercel indique en ese momento — puede variar, usar siempre el valor mostrado en el dashboard).
   - Registro **CNAME** de `www` apuntando a `cname.vercel-dns.com`.
3. Propagación DNS: puede tardar desde minutos hasta 24-48hs. Vercel emite el certificado SSL automáticamente apenas detecta el DNS correcto.
4. Verificar en Settings → Domains que el estado pase a "Valid Configuration".

## Pendiente de contenido real

Buscar `TODO: contenido pendiente` en el código — marca cada lugar donde falta texto o imagen definitiva:

- Imágenes de mayor resolución de los 4 proyectos (`data/projects.ts`, `coverImage`).
- Case studies completos de Tribu Music, OUT y Medifé Research (actualmente solo BBVA Francés tiene contenido real).
- URL del perfil de Behance (`components/Contact.tsx`).
