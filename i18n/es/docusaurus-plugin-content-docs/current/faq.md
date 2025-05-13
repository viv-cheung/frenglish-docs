---
id: FAQ
sidebar_position: 4
description: Preguntas frecuentes
slug: /FAQ
---

# Preguntas Frecuentes

## ¿Cómo sé que la calidad es buena?
El bot de Frenglish sigue los siguientes pasos de validación:
- Múltiples ciclos de reflexión y revisión para asegurar que la traducción siga tus reglas y suene natural
- Tiene una función de aprendizaje implícito para aprender reglas basadas en archivos de traducción modificados manualmente
- Las traducciones se envían a traductores humanos para validación de calidad cada trimestre
- Se realizan pruebas METEOR (prueba estandarizada de calidad de traducción) regularmente; esta prueba traduce el contenido al idioma objetivo y luego de regreso al idioma original. Se otorga una puntuación comparando los valores originales con los valores de la retraducción
- ¡Toda nuestra documentación y sitio web han sido traducidos completamente por el bot de Frenglish! Por lo tanto, la calidad de la traducción es transparente y sirve como referencia de lo que puedes esperar

## ¿Cuánto tiempo debo esperar para que se completen mis archivos de traducción?
Esto depende de cuántos caracteres estés traduciendo. Normalmente, puedes esperar que cada archivo se traduzca en 1 minuto. Esto se debe a que el bot de Frenglish realiza varios pasos de validación para asegurar una alta calidad antes de entregar el resultado.

## No todo en mi archivo requiere traducción, ¿cómo deciden qué traducir?
El bot de Frenglish solo traducirá el contenido relevante según el tipo de archivo. Por ejemplo:

**Archivos Markdown**
- El código no se traducirá

**Archivos PO**
- Los comentarios, msgid y otros metadatos po no se traducen ni cuentan como contenido traducido

**Archivos JSON**
- Las claves no se traducen, solo los valores serán traducidos

## ¿Solo soportan traducciones al francés?
No, el nombre "Frenglish" fue elegido para representar el origen quebequense de la empresa. Muchos quebequenses usan el término "Frenglish" para referirse a cómo conversan (mezclando francés e inglés en el diálogo natural).

Ofrecemos soporte para los siguientes idiomas:

Afrikáans, árabe, armenio, azerbaiyano, bielorruso, bosnio, búlgaro, catalán, chino, croata, checo, danés, neerlandés, inglés, estonio, finés, francés, gallego, alemán, griego, hebreo, hindi, húngaro, islandés, indonesio, italiano, japonés, canarés, kazajo, coreano, letón, lituano, macedonio, malayo, maratí, maorí, nepalí, noruego, persa, polaco, portugués, rumano, ruso, serbio, eslovaco, esloveno, español, suajili, sueco, tagalo, tamil, tailandés, turco, ucraniano, urdu, vietnamita y galés.

## ¿Qué sucede si cierro un PR de Frenglish?
El contenido de ese PR NO se traducirá en futuros PR de Frenglish. Solo cierra un PR de Frenglish si no quieres que ese contenido sea traducido por Frenglish. Siempre puedes editar el texto en el PR de Frenglish y fusionarlo

## ¿Se traducen los fragmentos de código?
No, los fragmentos de código no se traducen y NO cuentan para tu uso de palabras traducidas

## ¿Cómo funciona el exceso de uso?
Se te cobrará cada vez que acumules $100 en exceso de uso durante un periodo, o por el exceso que tengas cuando comience un nuevo periodo

## ¿Qué pasa si actualizo mi plan DESPUÉS de haber excedido el límite?
Cualquier exceso de uso que hayas tenido en tu plan anterior se acreditará para este mes. Esto significa que si gastas $50 en exceso en PRO, los primeros $50 de exceso en tu plan actualizado no se cobrarán