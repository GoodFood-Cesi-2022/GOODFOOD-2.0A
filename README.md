# GoodFood - web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.1.

## Development server

Run `ng serve` (or `ng serve --open` or `ng serve -o` or `npm start`) for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component <component-name>` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Exit

Run `ctrl c` to exit a dev server.

# Versions

- Nodejs : 16.13.0
- Angular : 13.2.0
- PrimeNG : 13.1.0

# Installation

### [PrimeNG](https://primefaces.org/primeng/showcase/#setup)

### [primeicons](https://www.npmjs.com/package/primeicons)

```sh
npm install primeng --save
npm install primeicons --save
```

in `angular.json > Styles` we will add also

```sh
node_modules/primeicons/primeicons.css
node_modules/primeng/resources/themes/lara-light-indigo/theme.css
node_modules/primeng/resources/primeng.min.css
```

> There is more than 33 themes and we can choose between them.

# Getting for first time

### git clone [GOODFOOD-2.0A](https://github.com/ZDubeau/GOODFOOD-2.0A.git)

### npm install

### Dockerfile

- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/#run)

- [Exemple de Dockerize](https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/)

> Create image in Docker
> Run in terminal :
>
> ```sh
> docker build -t goodfood-web .
> ```
>
> Check : docker images
>
> Après build on va créer le conteneur docker :
>
> ```sh
> docker run -d -p 8181:80 --name GoodFood-web goodfood-web
> ```
>
> Voir les détails de ce conteneur :
>
> ```sh
> docker ps
> ```
>
> réponse :
>
> ```sh
> CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                  NAMES
> f10f652d3da9   goodfood-web   "nginx -g 'daemon of…"   16 minutes ago   Up 16 minutes   0.0.0.0:8181->80/tcp   GoodFood-web
> ```
> Ce conteneur :  http://localhost:8181/