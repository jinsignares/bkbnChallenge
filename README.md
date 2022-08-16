This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## BKBN Challenge Initial Approach

En este repositiorio abordé la mayoría de los requerimientos como también algunos de los mencionados en la sección Plus.

Para empezar el projecto está desarrollado utilizando NextJS, aproveché su organicación en carpetas para proporcionar las rutas requeridas en el reto. Así mismo, las cuatro operaciones del CRUD se pueden realizar a través de esta aplicación. Se utilizó React Redux para el manejo de estado en el app. Para los fetch de información utilicé Axios

La ruta "/contacts" la cual está configurada como el índice de la aplicación por defecto sería el Read de las operaciones. En ella se muestra una tabla con todos los registros retornados por el API en una componente tipo Enhanced Table de MaterialUI. En este componente, se resumen todas las entradas y le da al usuario la opción de ver la información de manera paginada. De la misma manera, el usuario tiene a opción de escoger el número de registros que se muestran en la tabla.

En segunda instancia, la ruta "/contacts/create" es accesible a través del botón en el header de la tabla con titulo de "New Contact". En esta página, el usuario tiene la opción de crear un nuevo contacto en un formulario de material UI. Este formulario utiliza el paquete React Hook Form en conjunto con el paquete yup para el manejo y validación de la data introducida en los inputs. Nótese que las validaciones implementadas son para evitar envío de campos vacíos o data incompatible (texto en campo de número y validación de email).

Suguiendo con las operaciones del CRUD, continuamos con el Update y Delete. Estas son accesibles a través de la tabla en sí. Existen dos IconButton de Material UI que brindan acceso a las rutas "/[id]/update" y "/[id]/delete" y son realizadas en diferentes páginas como es solicitado en la prueba técnica. En el update se hace uso del método setValue de React Hook Form para poblar los inputs con la información original del contacto antes de la edición. Nuevamente, se realizan las validaciones como en el Create y si la información es válida, al enviar la información, esta será agregada al récord de la tabla. En el link de delete, simplemente se redirecciona al usuario a una página donde se muestra la información del contacto en cuestión y al dar click en el botón de Delete este será borrado del récord.

Finalmente a manera de plus, incluí las alertas al usuario utilizando un componente SnackBar de MaterialUI.