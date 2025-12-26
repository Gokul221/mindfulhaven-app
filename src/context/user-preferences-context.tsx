// this file is used to provide user preferences to the app

"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useStorage } from '@/hooks/use-storage';

interface UserPreferences {
    language: string;
    notificationsEnabled: boolean;
    compactMode: boolean;
}

interface UserPreferencesContextType {
    preferences: UserPreferences;
    updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

const DEFAULT_PREFERENCES: UserPreferences = {
    language: 'en',
    notificationsEnabled: true,
    compactMode: false,
};

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferences] = useStorage<UserPreferences>(
        'mh_user_preferences',
        DEFAULT_PREFERENCES
    );

    const updatePreference = <K extends keyof UserPreferences>(
        key: K,
        value: UserPreferences[K]
    ) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <UserPreferencesContext.Provider value={{ preferences, updatePreference }}>
            {children}
        </UserPreferencesContext.Provider>
    );
}

export function useUserPreferences() {
    const context = useContext(UserPreferencesContext);
    if (context === undefined) {
        throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
    }
    return context;
}
