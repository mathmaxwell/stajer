🛠 Tad-Industry-Workers
Приложение для руководителей компаний, которое помогает отслеживать опоздания сотрудников, вести учёт рабочего времени и управлять информацией о персонале.

📌 Возможности:
Просмотр информации о сотрудниках

Фиксация времени прибытия

Отчёт об опозданиях

Редактирование данных сотрудников

Удобный интерфейс на React

Лёгкий в использовании бэкенд на PocketBase

🚀 Стек технологий
React

PocketBase

Vite

⚙ Установка
Склонируйте проект:

bash
Копировать
Редактировать
git clone git@github.com:mathmaxwell/stajer.git
PocketBase (Бэкенд)

⚠️ В репозитории находится PocketBase только для macOS.
Если у вас другая ОС — скачайте PocketBase вручную:

Распакуйте архив

Создайте папку pocketbase в корне проекта

Поместите туда исполняемый файл pocketbase

Запустите PocketBase:

bash
Копировать
Редактировать
cd pocketbase
./pocketbase serve
Откроется админ-панель на http://127.0.0.1:8090

Создайте коллекцию employees со следующими полями:

Поле	Тип
image	File
fullName	Text
gender	Text
passport	Text
PINFL	Text
birthday	Text
birthPlace	Text
PassportIssued	Text
IssuedBy	Text
IssueDate	Text
ExpirationDate	Text
Nationality	Text
NationalityCode	Text
CountryCode	Text
birthCode	Text
Email	Text
phone	Text
Department	Text
job	Text
mood	Text
where	Text
id	Text
whenlateMap	Text
whenlate	Text

🔧 Настройка среды
Создайте файл .env.local в корне проекта и добавьте:

ini
Копировать
Редактировать
BROWSER=none
VITE_PB_URL=http://127.0.0.1:8090
Установите зависимости и запустите проект:

bash
Копировать
Редактировать
npm install
npm run dev
📷 Скриншоты
Скриншоты интерфейса находятся в папке screenshots.

🧑‍💼 Для кого это?
Для руководителей предприятий, HR-менеджеров и всех, кто хочет эффективно контролировать рабочее время сотрудников.
