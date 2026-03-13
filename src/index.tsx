import * as ReactDOM from 'react-dom/client';
import 'regenerator-runtime/runtime';
import cfg from 'app/config';
import { App } from './App';

import './index.css';
// import 'antd/dist/antd.css';

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);


// git add . && git commit -m "fixed some 2" && git push -u origin master

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
