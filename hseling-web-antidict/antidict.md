# Antidict frontend

Для проекта мы используем Create React App, потому что он предлагает
готовую настройку проекта, что существенно ускоряет время для создания
и запуска проекта

## Зависимости

* `react-router-dom` для создания ссылок
* `antd` элементы на странице
* `react-highlight-words` подсвечивание слов

## Запуск проекта

```shell script
npm start
```

## Материалы

* [useHistory](https://reactrouter.com/web/api/Hooks/usehistory) – для 
получения объекта, с помощью которого можно переходить между страницами
* [useState](https://ru.reactjs.org/docs/hooks-state.html) – доступ к состоянию React (хук).
* [Деструктуризация](https://learn.javascript.ru/destructuring)
* [Видео про React](https://learn.javascript.ru/screencast/react)
* [Proxying API Requests in Development](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually)
* [Спецификация JSONRPC](https://www.jsonrpc.org/specification)
* Настройка Docker под Create React App:
    * [Docker: React, Express & Reverse Proxy](https://medium.com/@frontendfoo/docker-react-express-reverse-proxy-15d7b37f8dc2)
    * [How to deploy create-react-app in Docker with docker-compose with NGINX as reverse-proxy](https://medium.com/@askeralim/how-to-deploy-create-react-app-in-docker-with-docker-compose-with-nginx-reverse-proxy-f26c98623f5)
    * [Dockerizing ReactJS, NodeJS, NGINX using Docker](https://dev.to/subhransu/nevertheless-subhransu-maharana-coded-5eam)
    * [Dockerizing a React App](https://mherman.org/blog/dockerizing-a-react-app/)
    * [Примеры образов и compose](https://gist.github.com/yossisp/b63ab99613ada9ca3cbadb8a4dbfca33)

## Решение проблем
> Access to fetch at 'http://localhost:5001/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin

Решение через настройку [прокси](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually)

## Docker

### Build

```
sudo docker build -t antidictfront .
```

### Run
```
sudo docker run -p 3000:3000 antidictfront
```

