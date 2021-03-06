# API для нвостного сайта.

## Описание
Проект расположен на серверах Yandex.Cloud.
Он обладает необходимыми сертификатами и доступен как по [HTTP](http://www.newsproject.students.nomoreparties.xyz/), так и по [HTTPS](https://newsproject.students.nomoreparties.xyz/) запросу.
Данный API создан для обработки запросов новостного сайта дипломного проекта Yandex Praktikum.

### При обращении к API вы можете использовать следующиие заросы:

__Требуется токен авторизации.__

*возвращает информацию о пользователе (email и имя)*
- __GET /users/me__

*возвращает все сохранённые пользователем статьи*
- __GET /articles__

*создаёт статью с переданными в теле*:
 keyword, title, text, date, source, link и image
- __POST /articles__

*удаляет сохранённую статью  по _id*
- __DELETE /articles/articleId__

__Авторизация__

*создаёт пользователя с переданными в теле*
email, password и name
- __POST /signup__

*проверяет переданные в теле почту и пароль и возвращает JWT*
- __POST /signin__

### Backend for Yandex Diploma 2020
