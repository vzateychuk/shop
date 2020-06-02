#Angular 9 course
https://videoportal.epam.com/video/nJL4PLJ9

#Сделано:

Task 3. Services and DI
--
- ProductService - работает с Promise
- UserService - работает с Observable

Task 5. Routing
--
- функциональные области products, cart, users
- Область Admin подгружается динамически, доступ через canActivatedGuard
- Дополнительно CanDeactivateGuard для формы редактирования пользователя и продукта

Task 6. HttpClient
--
- Сделан бэкэнд используя json-server

Вопросы (нужна помощь):
--
1) Роутинг. При переходе на компонент user-list происходит попытка получения editedUser из this.route.paramMap, при этом возникает ошибка в логах если мы пришли на форму этого компонента в первый раз, соответственно у нас нет значения editedUserID, а следовательно params.get вернет пустую строку. Вопрос: можно ли нам сделать получение пользователя при условии что параметр editedUserId НЕ ПУСТОЙ, учитывая что params.get(editedUserId) возвращает Observable.

2) Роутинг: При проверке CanDeactivateGuard в форме редактирования (например в user-form.component), мы проверяем не изменился ли объект путем сравнения его с "Оригинальной" копией. Что заставляет нас все время хранить "оригинальную" копию объекта. Есть ли более элегантные решения или это решение считается шаблонным?
