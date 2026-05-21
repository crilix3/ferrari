const getItemFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item) as T;
    } catch (e) {
      console.error(`Ошибка парсинга JSON из localStorage по ключу "${key}":`, e);
      return null;
    }
  }
  return null;
};

export default getItemFromLocalStorage;
