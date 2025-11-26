import {LocalUser, LocalUsers} from "@/modules/auth/models/local-user";
import {StorageService} from "@/core/stores/storage-service";
import {LOCAL_USERS} from "@/modules/auth/constants/local-storage";

export class LocalUsersStorage {
    static saveUser(user: LocalUser, replace: boolean = false): boolean {
        const canBeSaved = !this.hasUser(user.username) || replace

        if (canBeSaved) {
            const localUsers = this.getUsers() ?? {}
            const newLocalUsers = {...localUsers, [user.username]: user }
            StorageService.set<LocalUsers>(LOCAL_USERS, newLocalUsers);
        }

        return canBeSaved;
    }

    static getUser(username: string): LocalUser | null {
        const localUsers = this.getUsers() ?? {}
        return localUsers[username] ?? null;
    }

    static getUsers(): LocalUsers | null {
        return StorageService.get<LocalUsers>(LOCAL_USERS)
    }

    static hasUser(username: string): boolean {
        return this.getUser(username) !== null
    }
}