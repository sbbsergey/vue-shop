const ERROR_CODES = {
  auth: 'Небходимо авторизоваться в системе',
  admin: 'Вы должны быть администратором!',
  INVALID_PASSWORD: 'Неверный пароль!',
  EMAIL_NOT_FOUND: 'Пользователь с таким email не найден!',
  EMAIL_EXISTS: 'Пользователь с такми email уже зарегистрирован!',
  LOAD_PRODUCTS_ERROR: 'Ошибка загрузки товаров из БД!',
  ADD_PRODUCT_ERROR: 'Ошибка создания товара в БД!',
  REMOVE_PRODUCT_ERROR: 'Ошибка удаления товара в БД!',
  LOAD_ORDERS_ERROR: 'Ошибка загрузки заказов!',
  LOAD_ORDERS_BY_USER_ID_ERROR: 'Ошибка загрузки заказов покупателя!'
}

export function error (code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'неизвестная ошибка'
}
