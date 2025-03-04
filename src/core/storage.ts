import { MMKV } from 'react-native-mmkv'

class Storage {
  static Keys = {
    NOTIFICATION_OPENED: 'notification_opened',
    LOGIN_INFO: 'login_info',
  }

  static Storage = new MMKV({
    id: 'satavan-dms',
  })

  static setItem<T = any>(key: string, value: T) {
    try {
      this.Storage.set(key, JSON.stringify(value))
    } catch (error) {}
  }

  static getItem<T = any>(key: string) {
    try {
      const data = this.Storage.getString(key)
      return JSON.parse(data as string) as T
    } catch (error) {
      return null as T
    }
  }

  static deleteItem(key: string) {
    return this.Storage.delete(key)
  }
}

export default Storage
