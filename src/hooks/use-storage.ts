"use client";

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

/**
 * A custom hook for reactive storage.
 * Synchronizes state with localStorage or sessionStorage.
 */
export function useStorage<T>(
    key: string,
    initialValue: T,
    type: 'local' | 'session' = 'local'
) {
    // Initialize state with value from storage or initialValue
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // We use useEffect to hydrate from storage on mount to avoid hydration mismatch in Next.js
    useEffect(() => {
        const item = storage.get<T>(key, type);
        if (item !== null) {
            setStoredValue(item);
        }
    }, [key, type]);

    // Return a wrapped version of useState's setter function that
    // persists the new value to storage.
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // Save state
            setStoredValue(valueToStore);

            // Save to storage
            if (typeof window !== "undefined") {
                storage.set(key, valueToStore, type);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue] as const;
}
