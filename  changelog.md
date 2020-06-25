# Angular 9 course
https://videoportal.epam.com/video/nJL4PLJ9

# Run the application
> npm run start

Task 9. UnitTests
--

# Сделано:
1. Создайте 2-3 интеграционных юнит тестов для тестирования ваших компонентов.
    - product-view.component.spec.ts
    - cart-view.component.spec.ts

2. Изолированный юнит тест для тестирования одного из ваших сервисов:
    - product.service.spec.ts

3. Создайте изолированный юнит тест для тестирования OrderByPipe.

4. Создайте поверхностный юнит тест для тестирования вашего AppComponent.

5. Создайте отчет о покрытии кода тестами. 
    - npm run test => при запуске тестов автоматически создается папка coverage/shop, где показано тестовое покрытие


# Вопросы (нужна помощь):
1. cart-view.component.spec.ts при указании {provide: ComponentFixtureAutoDetect}, в тесте 'Should display a SKU in title'. Как видно из скриншота, значение явно попадает в шаблон и даже в дебаггере это видно (см https://prntscr.com/t4t3nd ), тем не менее результат выполнения теста - отрицательный (см https://prntscr.com/t4t4jk), как будто шаблон не может прочитать результатов теста. DetectChanges вызывался и не раз, В чем проблема: ошибка? (без ComponentFixtureAutoDetect все работает)

2. 
