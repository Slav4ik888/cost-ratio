// v.2026-03-17
import * as h from './helpers';
import { __devLog } from '../../tests/__dev-log';

export const PREFIX = 'CSS-';

/** Вывод ошибки в консоль */
const showError = (text: string, fieldName: string) => __devLog('LS showError', `${text}: ${fieldName}`);


/**
 * Проверка на ошибку
 * Вывод ошибки
 * Ответ есть ли ошибка - true при наличии
 */
const checkError = (data: any, fieldName: string) => {
  if (!data) {
    showError('Не указано значение', fieldName);
    return true;
  }
  return false;
};



/** Сохраняем в LocalStorage */
export const setStorageData = (
  storageName    : string,
  data           : any,
  // withoutPrefix? : boolean // Если нужно без префикса, чтобы при очистки LS эти данные остались
) => {
  try {
    if (checkError(storageName, '"Имя хранилища"')) return;
    if (checkError(data, '"Данные для сохранения"')) return;

    // const name = withoutPrefix ? storageName : PREFIX + storageName;
    localStorage.setItem(PREFIX + storageName, JSON.stringify(data));
  }
  catch (e: any) {
    if (e.name === 'QuotaExceededError') {
      console.error('LS заполнен, очистили старые данные и сохранили новые');

      const companyId = storageName.split('-')[1];

      // Сохраняем важное
      const cookie = h.getAcceptedCookie();
      // const hintsDontShowAgain = h.getHintsDontShowAgain();

      if (! companyId) {
        localStorage.clear();

        // Восстанавливаем важное
        if (cookie) h.setAcceptedCookie();
        // h.setHintsDontShowAgain(hintsDontShowAgain);

        // eslint-disable-next-line no-alert
        if (confirm('Необходимо обновить страницу')) {
          location.reload();
        }
      }

      localStorage.clear();
      if (cookie) h.setAcceptedCookie();
    }
    else {
      console.error('Ошибка LocalStorage:', e);
    }
    return false;
  }
};


/**
 * v.2025-06-05
 * Достаём из LocalStorage
 */
export function getStorageData<A>(storageName: string): A | undefined {
  if (checkError(storageName, '"Имя хранилища"')) return;

  const data = localStorage.getItem(PREFIX + storageName);
  if (data) return JSON.parse(data);
}

/** Clear item by storageName */
export const removeStorageData = (storageName: string) => {
  if (checkError(storageName, '"Имя хранилища"')) return;

  localStorage.removeItem(PREFIX + storageName);
};
