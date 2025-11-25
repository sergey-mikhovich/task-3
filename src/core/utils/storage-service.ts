export class StorageService {
    static set<T>(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get<T>(key: string): T | null {
        const item = localStorage.getItem(key)
        if (item === null) return null
        try {
            return JSON.parse(item) as T
        } catch {
            return null
        }
    }

    static remove(key: string) {
        localStorage.removeItem(key)
    }
}