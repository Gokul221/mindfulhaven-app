/**
 * Utility for interacting with localStorage and sessionStorage with type safety and error handling.
 */

type StorageType = 'local' | 'session';

export const storage = {
    /**
     * Set item in storage
     */
    set: (key: string, value: any, type: StorageType = 'local') => {
        try {
            const storageInstance = type === 'local' ? window.localStorage : window.sessionStorage;
            const serializedValue = JSON.stringify(value);
            storageInstance.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error setting item in ${type} storage:`, error);
        }
    },

    /**
     * Get item from storage
     */
    get: <T>(key: string, type: StorageType = 'local'): T | null => {
        try {
            const storageInstance = type === 'local' ? window.localStorage : window.sessionStorage;
            const item = storageInstance.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error getting item from ${type} storage:`, error);
            return null;
        }
    },

    /**
     * Remove item from storage
     */
    remove: (key: string, type: StorageType = 'local') => {
        try {
            const storageInstance = type === 'local' ? window.localStorage : window.sessionStorage;
            storageInstance.removeItem(key);
        } catch (error) {
            console.error(`Error removing item from ${type} storage:`, error);
        }
    },

    /**
     * Clear all items from a storage type
     */
    clear: (type: StorageType = 'local') => {
        try {
            const storageInstance = type === 'local' ? window.localStorage : window.sessionStorage;
            storageInstance.clear();
        } catch (error) {
            console.error(`Error clearing ${type} storage:`, error);
        }
    },

    /**
     * Check if an item exists in storage
     */
    has: (key: string, type: StorageType = 'local'): boolean => {
        const storageInstance = type === 'local' ? window.localStorage : window.sessionStorage;
        return storageInstance.getItem(key) !== null;
    }
};
