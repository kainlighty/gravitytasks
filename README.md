### Gravity Tasks

Изначально планировал проект вида Todo'шки, но что-то пошло не так.

#### Как и что
- Два окна: слева основной список с поиском, справа — сайдбар-карточка выбранной задачи.
Сама карточка отображается только при выбранной задаче.
- Название задачи в сайдбаре меняется по двойному клику.
- Для каждой задачи можно задать дедлайн, накидать тегов или написать описание.

    > <details>
    >  <summary>В планах</summary>
    >    Подсвечивать задачи, по которым горит дедлайн.
    > </details>

- Есть комментарии. Но, сейчас это скорее заметки, но в планах прикрутить нормальный [Markdown Editor](https://gravity-ui.com/ru/libraries/markdown-editor).
- За всё _(почти)_ состояние отвечает Zustand. Но, например, одна единственная модалка не стоит того — имхо.

#### UI Kit

Для интерфейса взял компоненты Gravity UI. Использую этот кит много где. Он как минимум не использует Tailwind — спасибо, хоспаде.

#### Зачем `overrides` в `package.json`

Gravity UI пока сидит на 18 реакте, как и некоторые его зависимости имеют чуть ниже версию — не страшно, но и не критично поднять эти версии.

Проверено на нескольких проектах, один среди большой команды.

#### Схренали иногда все странно раскидано

Проект изначально писался в одном файле, чтобы сконцентрироваться на функционале, так что тут нужен лучший рефакторинг.

Хотел в ИИ-шку сунуть, но лучше сам потом сделаю.

#### // Комментарии в файлах

- Где может быть что-то непонятное по моему мнению, оставил комментарии.
- Где есть `// GPT | // GPT Start/End` – сделано с помощью ИИ полностью.

    Проект ИИ трогал процентов на 30, в основном помогал просто с мемоизацией. Вот так мне лень было юзануть Profiler в этом проекте, доверился ИИ)

#### Немного о переменных в стилях

Так как используется UI Kit, использовал переменные из него в основном.

Посмотреть конкретное значение можно, перейдя к основе (Command+Click) или в DevTools. Не мы такие, кит такой \*_*

#### И наконец, что использовалось конкретно (скип, если не интересно)

**Форма добавления задачи:**
- [Документация](https://gravity-ui.com/ru/libraries/dialog-fields)
- [Потыкаться](https://preview.yandexcloud.dev/dialog-fields/?path=/story/demo-00-base-controls)

**Тултипы:**
- https://gravity-ui.com/ru/components/uikit/action-tooltip
- https://gravity-ui.com/ru/components/uikit/tooltip

**Кнопки:**
- https://gravity-ui.com/ru/components/uikit/button
- https://gravity-ui.com/ru/components/uikit/dropdown-menu

**Иконки:**
- [Компонент](https://gravity-ui.com/ru/components/uikit/icon)
- [Найти иконку](https://gravity-ui.com/ru/icons)

**Список задач:** https://preview.gravity-ui.com/uikit/?path=/story/components-data-display-list--showcase
**Добавление задачи:** https://preview.gravity-ui.com/uikit/?path=/story/components-overlays-modal--default
**Изменение заголовка задачи:** https://preview.gravity-ui.com/components/?path=/story/components-delayedtextinput--default

**Теги:**
- Добавление: https://preview.gravity-ui.com/uikit/?path=/story/components-overlays-popup--default
- Отображение: https://preview.gravity-ui.com/uikit/?path=/story/components-data-display-label--showcase-story

**Изменение дедлайна:** https://gravity-ui.com/ru/components/date-components/date-picker

**Табы:** https://preview.gravity-ui.com/uikit/?path=/story/components-navigation-tablist--panels
