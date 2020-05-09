#NGRX-STORE и все что с ним связано
https://videoportal.epam.com/video/nJL4PLJ9


Вопросы по Store:
1) Мне хотелось реализовать Cart(Корзина) так чтобы данные хранились только в локальном Store. Правильно ли я понимаю что для добавления продукта в Корзину нужно из effect относящемуся к production запускать не только action ProductAddToCart, но и action AddToCart который относится с предметной области Cart (products.effect.ts , функция addToCartProduct) ?

2) Не работает функция уменьшающая количество доступного продукта amountAvailable (см products.reducer.ts, on(AddToCartSuccess...), 
Я пробовал сделать копию продукта, который имеет тип ProductModel. Я это делаю так:
const productAdded = {...product} as ProductModel;
Но когда я смотрю тип объекта productAdded, оказывается его тип Object а не ProductModel. Что я упускаю, почему тип не ProductModel? Как мне сделать чтобы был именно продукт а не какойто Object?
