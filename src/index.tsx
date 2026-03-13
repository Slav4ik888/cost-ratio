import * as ReactDOM from 'react-dom/client';
import 'regenerator-runtime/runtime';
import { cfg } from 'app/config';
import { App } from './app';

import './index.css';
// import 'antd/dist/antd.css';

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);


// git add . && git commit -m "fixed some 2" && git push -u origin master
// git add . && git commit -m "some fixed" && git push -u origin migrate-to-ts

// создать и сразу переключиться:
// git checkout -b название-ветки

// Убедитесь, что вы находитесь в новой ветке:
// git branch            # показывает текущую ветку (*)
// git status            # показывает статус файлов

// Работайте с кодом, делайте коммиты:
// git add .
// git commit -m "Добавил новую функцию"
// git push -u origin название-ветки    # первый пуш новой ветки
// -->> git add . && git commit -m "start" && git push -u origin migrate-to-ts

// Переключитесь на основную ветку
// git checkout master
// Если работаете в команде, обновите основную ветку git pull origin master
// Слейте изменения из вашей ветки
// git merge название-ветки
// git push origin master // Запушьте изменения в основную ветку

// Если возникли конфликты при merge
// Если Git сообщает о конфликтах:
// Откройте файлы с конфликтами (они помечены <<<<<<<, =======, >>>>>>>)
// Вручную исправьте конфликты
// Сохраните файлы
// Добавьте их в индекс: git add .
// Завершите merge: git commit -m "Merge ветки feature/new-function"

// После успешного merge (опционально)
// Удалите ненужную ветку:
// git branch -d название-ветки           # локально
// git push origin --delete название-ветки # удалить на GitHub

// Полезные команды для проверки:
// git branch          # список локальных веток
// git branch -a       # список всех веток (включая удаленные)
// git log --oneline   # история коммитов
// git status          # текущее состояние
