# change-minecraft-world
Смотритель последних донатов на `socket.io`, который при определённой сумме выполняет команду в Minecraft

## Как запустить?
* Для начала требуется скачать архив со скриптом, затем перейдите в папку `watcher` и отредактируйте `config.example.json`
* После сохранения конфигурации, переименуйте файл в `config.json`
* Установите зависимости (должен быть установлен NodeJS)
```bash
$ npm install
$ yarn install # Либо через Yarn
```
* Запустите `index.js` через `tmux` | `nodemon` | `pm2` (если же у Вас Windows, просто оставьте консоль открытой через `node`)
* **[!]** Скрипт должен быть запущен на компьютере, если Вы на нём-же запустили Minecraft-сервер. Если-же Minecraft-сервер запущен вне вашего ПК, можете ставить скрипт на **Heroku** и ему подобные сервисы, либо также на сервер.