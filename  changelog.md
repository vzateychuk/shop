#Angular 9 course
https://videoportal.epam.com/video/nJL4PLJ9

#Сделано:

Task 7. @ngrx/store, @ngrx/effects
--
    1. states функциональной области и app state
    2. @ngrx/router-store 
    ( навигация с помощью действия GO сделана для функциональной области Users )

Вопросы (нужна помощь):
--
1) Роутинг. При переходе на компонент user-list происходит попытка получения editedUser из this.route.paramMap, при этом возникает ошибка в логах если мы пришли на форму этого компонента в первый раз, соответственно у нас нет значения editedUserID, а следовательно params.get вернет пустую строку. Вопрос: можно ли нам сделать получение пользователя при условии что параметр editedUserId НЕ ПУСТОЙ, учитывая что params.get(editedUserId) возвращает Observable.

2) Роутинг: При проверке CanDeactivateGuard в форме редактирования (например в user-form.component), мы проверяем не изменился ли объект путем сравнения его с "Оригинальной" копией. Что заставляет нас все время хранить "оригинальную" копию объекта. Есть ли более элегантные решения или это решение считается шаблонным?
 
3) NgRx: как правильно, в парадигме NgRx сделать добавление "Продукта" в "Корзину". Сложность которой я столкнулся связана с тем что при выполнении этого действия, должно произойти изменение state сразу для обоих областей: в productsState количество соответсвующего товара должно быть уменьшено, в cartState наоборот: увеличено ( либо если товар еще не добавлялся в корзину, то должен создаться соответсвующий элемент в корзине ).
В подходе NgRx для изменения состояния предметной области productState, компонент области "product": ProductListComponent выполняет dispatch( ProductAddToCartAction(product) ) где AddToCartAction - это action предметной области Products, который обрабатывается productReducer (или productEffect), предназначенный для изменения состояния productsState.
Аналогично для для изменения состояния предметной области cartState, нужно чтобы был dispatch( AddItemCartAction(cartItem) ) где AddItemCartAction - это action предметной области Cart, который обрабатывается cartReducer (или cartEffect), предназначенный для изменения состояния cartState.
Т.е. действие "добавление товара в корзину", выполняемое пользователем из компонента ProductListComponent должно dispach-ить сразу два actions:
ProductAddToCartAction;
AddItemCartAction;
(При этом еще делать это по условию: если ProductAddToCartAction был успешен, то делать dispach AddItemCartAction). 
Сейчас делаю dispatch этих actions из ProductListComponent, но, мне кажется, это довольно "неправильным" решением, поскольку по сути добавление товара в корзину является одной атомарной операцией. (В случае бэкэнд программирования, я бы делал это в одной транзакцией). Было бы логично если бы мы могли из productEffect, (уже после отправки/ответа запроса на бэкэнд), выполнить dispatch одновременно и ProductAddToCartActionSuccess и AddItemCartActionSuccess, что приводило бы к изменению сразу и  productsState и cartState. Но (!) Effect возвращает Observable<Action> только от одной Action, а не от двух, я правильно же понимаю? Или можно как то создать Observable от двух Action? 
Или как то это совсем по другому делается (типа в одном reducer меняется оба : productsState и cartState ?

4) NgRx: Как "срастить" ResolveGuard с получением данных через Store и NgRx? (см https://github.com/vzateychuk/shop , коммит 0005cb91 "Redux pattern and NgRx")
В виде демонстрации моего вопроса: я решил добавить в форму редактирования продукта ProductEditComponent, который ранее при открытии формы, получал данные через подписку из Store вида:
...
  ngOnInit(): void {
    this.productState$ = this.store.pipe( select(productsStateSelector) );
    ... // объявляем productObserver для получения данных из ParamMap в котором делаем dispatch( LoadProductAction(id) )
    this.route.paramMap.subscribe(productObserver); // подписываемся на изменения в Route.paramMap чтобы получить продукт
    }
...
Когда происходила навигация на страницу, срабатывала подписка и выполнялся dispatch( LoadProductAction(id) ), который вызывал product.effect, тот вызывал product.service, тот получал product и все заканчивалось передачей нового action LoadProductSuccess с новым стейтом (см скриншот load-product-redux-version.png).
Решение работало, но не было идеальным, поскольку при задержке срабатывания HTTP сервиса, форма редактирования открывалась пустая и "ждала" когда загрузятся данные. Выход который мы обсуждали - получать данные при помощи ProductResolveGuard, тогда данные о product можно будет получить в компоненте ProductEditComponent уже через подписку на  через route.data (см ниже):
...
 ngOnInit(): void {
    this.selectedProduct$ = this.route.data.pipe( pluck('product') );

    const observer = {
      next: product => {
        if (product) {
          this.editMode = true;
          this.product = {...product};
        } else {
          this.product = new ProductModel();
        }
        this.original = {...this.product};
      },
      error(err) {  console.log(err);    },
      complete() {        console.log('ProductEdit Stream is completed');   }
    };
    this.sub = this.selectedProduct$.subscribe(observer);
....
Теперь форма редактирования открывается как должно быть, только после того как ProductResolveGuard вызовет "медленный" метод сервиса, получит данные, "сложит" их в route.data и позволит форме открываться. НО! теперь пропадает информация о загрузке и данных в Redux/NgRx, поскольку при получении данных мы никаких Action не "диспатчили" и соответственно не задействовали механизмы NgRx. (см скриншот  load-product-resolve-guard.png ). 
Вопрос: можно ли сделать (и как?) чтобы был задействован ProductResolveGuard, но данные формы были получены "стандартным" для Redux pattern, т.е. с помощью dispatch Action и reducers. В ином случае получается что концепция "single source of truth" разрушается и мы получаем и оперируем с данными "в обход" State.

5) NgRx RoutingStore. Action loadUsersSuccess (в учебных материалах он назван getUsers) возвращает в props значение users: UserModel[] (Class), хотя в остальных Action все данные возвращаются в виде User (Interface). С чем это связано?
