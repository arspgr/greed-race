import { hapticFeedback } from '@telegram-apps/sdk-react';

export function simpleHaptic() {
    hapticFeedback
    if (!hapticFeedback.isSupported()) {
        return;
    }
    hapticFeedback.impactOccurred("light");
}

export function notificationHaptic() {
    if (!hapticFeedback.isSupported()) {
        return;
    }
    hapticFeedback.notificationOccurred("success");
}