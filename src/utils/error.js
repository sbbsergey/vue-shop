const ERROR_CODES = {
  INVALID_PASSWORD: 'Неверный пароль!',
  EMAIL_NOT_FOUND: 'Пользователь с таким email не найден!',
  auth: 'Пожалуйста, войдите в систему!',
  LOAD_PRODUCTS_ERROR: 'Ошибка загрузки товаров!'
}

export function error (code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'неизвестная ошибка'
}
