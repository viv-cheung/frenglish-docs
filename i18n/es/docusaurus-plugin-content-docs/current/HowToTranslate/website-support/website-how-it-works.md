---
id: website-how-it-works
sidebar_position: 2
description: Cómo funciona nuestro servicio de traducción instantánea de sitios web
slug: /website-how-it-works
---

# Cómo funciona
Nuestro sistema de traducción instantánea está diseñado para ser lo más fluido posible. Esta guía explica los detalles técnicos detrás de escena para que sepas exactamente qué ocurre cuando alguien visita tu sitio a través de nuestro proxy de traducción.

## Configuración de DNS
Para usar nuestro servicio, solo necesitas apuntar tu DNS a nuestro worker de Cloudflare. Esto significa actualizar tus registros A o CNAME para enrutar tu tráfico a través de nuestra capa proxy.

Por ejemplo, si tu sitio estaba alojado originalmente en Vercel o Netlify, simplemente reemplazas el registro DNS que apuntaba a sus servidores edge por uno que apunte al nuestro. No necesitas cambiar tu código ni desplegar nada más.

Si en algún momento quieres dejar de usar nuestro servicio, solo revierte el cambio de DNS y apunta tus registros de vuelta a tu proveedor original—es así de simple.

## Cómo funciona el proxy inverso
Cuando un usuario visita tu sitio, todas las solicitudes pasan por el Cloudflare Worker de Frenglish actuando como proxy inverso.

Así es el flujo de la solicitud:

<div style={{ textAlign: 'center' }}>
  <div style={{ display: 'inline-block', textAlign: 'left' }}>
    <img src="/assets/cloudflare_worker_diag.png" alt="Arquitectura del Worker de Cloudflare" width="800" />

    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1px' }}>
      Arquitectura del Worker de Cloudflare
    </div>
  </div>
</div>

1.  **Verificación de idioma**\
    El proxy inspecciona la URL para ver si hay un código de idioma presente (por ejemplo, `/fr/about`).

2.  **Detección de idioma original**\
    Si la solicitud ya está en tu idioma de origen (normalmente inglés), pasamos la solicitud a tu servidor original y devolvemos el contenido tal cual.

3.  **Flujo de traducción**\
    Si el idioma solicitado es diferente al original, comprobamos si ya existe una traducción en nuestra caché edge.
    - Si **está en caché**, la versión traducida se devuelve al instante.
    - Si **no está en caché**, obtenemos el contenido original, lo ponemos en cola para traducción y servimos la versión sin traducir (normalmente en inglés) mientras tanto. Una vez completada la traducción, los futuros usuarios recibirán la versión traducida y almacenada en caché.
    - Si **no está en caché** pero ya está traducido, lo recuperamos de Amazon S3, donde todas las traducciones se almacenan con doble cifrado.

4.  **Caché**\
    Utilizamos la caché global edge de Cloudflare para asegurar que las traducciones se sirvan rápidamente, sin importar dónde estén tus usuarios. Nuestra caché es “servir mientras se revalida”, así que incluso si una traducción se actualiza, el contenido antiguo se muestra de inmediato mientras se prepara el nuevo en segundo plano.

## URLs traducidas
Puedes tener **URLs traducidas por idioma** para que las rutas estén localizadas, no solo el contenido. Por ejemplo:
- **Original (por ejemplo, inglés):** `example.com/about-us`
- **Francés:** `example.com/fr/a-propos`
- **Español:** `example.com/es/sobre-nosotros`

Cuando esta opción está habilitada en la configuración de tu proyecto, Frenglish mantiene un mapeo entre tus rutas de URL originales y sus equivalentes traducidos para cada idioma. Los enlaces, redirecciones y mapas del sitio usan la ruta localizada correcta para cada localización. Eso mejora tanto el **SEO** (los motores de búsqueda ven URLs específicas por idioma) como la **experiencia del usuario** (los visitantes ven URLs en su idioma). Puedes habilitar y gestionar URLs traducidas en la sección **Sitio web** (o configuración) del panel de Frenglish de tu proyecto.

## Enrutamiento geográfico
El **enrutamiento geográfico** envía a los visitantes a una versión de idioma según su **país o región**. Por ejemplo:
- Visitantes de Francia → versión en francés (`/fr/`)
- Visitantes de Quebec → versión en francés canadiense (`/fr-ca/`) si usas reglas a nivel de región
- Visitantes de España → versión en español (`/es/`)

Configuras las asignaciones de país → idioma (y opcionalmente región → idioma, por ejemplo Quebec) en la configuración de tu proyecto. Cuando un usuario accede a tu sitio sin un idioma en la ruta (por ejemplo, `example.com/`), nuestro proxy puede detectar su ubicación y redirigirlo al idioma correspondiente. Así, muchos usuarios llegan directamente a la versión regional correcta sin usar el selector de idioma. **Si un usuario ya eligió un idioma** (por ejemplo, mediante el selector de idioma), esa elección se guarda en cookies y **tiene prioridad** sobre el enrutamiento geográfico, por lo que los visitantes recurrentes ven su idioma preferido en vez de ser redirigidos por ubicación. El enrutamiento geográfico es opcional y se puede configurar en la sección **Sitio web** o configuración del panel de Frenglish de tu proyecto.

## ¿Qué pasa si nuestra API está caída?
Si por alguna razón nuestra API de traducción no está disponible temporalmente, tus usuarios seguirán viendo tu contenido original en su idioma predeterminado. Diseñamos nuestro sistema proxy para que haga una transición suave, así tu sitio siempre funciona aunque los servicios de traducción se interrumpan.

## Frenglish Bundle
También inyectamos un pequeño paquete de JavaScript en tu sitio, llamado **Frenglish bundle**. Este script habilita varias funciones:
- **Traducción del lado del cliente**: Detecta cualquier contenido nuevo que aparezca después de la carga inicial de la página (por ejemplo, inyectado por JavaScript o cargado vía AJAX) y lo traduce automáticamente usando traducciones en caché.
- **UI de selector de idioma**: El bundle inyecta automáticamente un widget de cambio de idioma por defecto en tu sitio.\
  Puedes personalizar la apariencia y ubicación de este selector usando nuestro **language toggle builder**.

<div style={{ textAlign: 'center' }}>
  <div style={{ display: 'inline-block', textAlign: 'left' }}>
    <img src="/assets/language-selector-config.png" alt="constructor de selector de idioma" width="500" />

    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1px' }}>
      Configuración del selector de idioma
    </div>
  </div>
</div>

## Alojar el Worker tú mismo
Si prefieres alojar el Cloudflare Worker en tu propia cuenta de Cloudflare para tener control total, podemos orientarte y apoyarte. [Contáctanos aquí](https://www.frenglish.ai/en/contact) para saber más.

## ¿Funciona con frameworks que usan mucho JavaScript como React, Vue o Next.js?
Sí. El paquete de Frenglish detecta cambios en el DOM y traduce el contenido a medida que se renderiza en el cliente. Esto incluye contenido cargado mediante navegación del lado del cliente en frameworks SPA. También ofrecemos traducción del lado del servidor para páginas pre-renderizadas.

## ¿Esto hará que mi sitio sea más lento?
No. Frenglish está optimizado para la velocidad. Como todo se sirve en el edge a través de Cloudflare y se almacena en caché de forma agresiva, los usuarios experimentarán una latencia mínima. El paquete JavaScript es muy pequeño y no bloquea la carga.

## ¿Cuánto tiempo se almacenan las traducciones en caché?
El contenido traducido se almacena en caché durante una hora por defecto. Puedes limpiar la caché agregando `?frenglish_cache_bust` a cualquier URL. Esto limpiará la caché de traducción de todo tu sitio y forzará la obtención de contenido nuevo.
Por ejemplo: `https://example.com?frenglish_cache_bust`.