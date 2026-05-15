import { useState, useEffect } from 'react';

const POPUP_COOLDOWN_KEY = 'popup_last_shown';
const POPUP_LOCK_IN_KEY = 'popup_lock_in';
const POPUP_LOCK_IN_TIMESTAMP_KEY = 'popup_lock_in_timestamp';
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
const LOCK_IN_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours

const isLockInValid = (): boolean => {
  const lockIn = localStorage.getItem(POPUP_LOCK_IN_KEY) === 'true';
  if (!lockIn) return false;
  
  const timestamp = localStorage.getItem(POPUP_LOCK_IN_TIMESTAMP_KEY);
  if (!timestamp) return false;
  
  const elapsed = Date.now() - parseInt(timestamp, 10);
  if (elapsed > LOCK_IN_DURATION_MS) {
    // Auto-expire: clear the lock-in
    localStorage.removeItem(POPUP_LOCK_IN_KEY);
    localStorage.removeItem(POPUP_LOCK_IN_TIMESTAMP_KEY);
    return false;
  }
  
  return true;
};

export const usePopupCooldown = (category: string) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if lock-in mode is enabled and valid
    if (isLockInValid()) {
      setShouldShow(false);
      return;
    }

    // Check cooldown for this category
    const storageKey = `${POPUP_COOLDOWN_KEY}_${category}`;
    const lastShown = localStorage.getItem(storageKey);
    const now = Date.now();

    if (!lastShown || (now - parseInt(lastShown, 10)) > COOLDOWN_MS) {
      setShouldShow(true);
      localStorage.setItem(storageKey, now.toString());
    } else {
      setShouldShow(false);
    }
  }, [category]);

  return shouldShow;
};

export const useLockInMode = () => {
  const [isLockIn, setIsLockIn] = useState(() => isLockInValid());

  // Check expiration periodically and sync state
  useEffect(() => {
    const checkExpiration = () => {
      const valid = isLockInValid();
      setIsLockIn(valid);
    };

    // Check every minute for expiration
    const interval = setInterval(checkExpiration, 60 * 1000);

    const handleStorageChange = () => {
      setIsLockIn(isLockInValid());
    };

    window.addEventListener('lockInChanged', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('lockInChanged', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleLockIn = () => {
    const newValue = !isLockIn;
    setIsLockIn(newValue);
    if (newValue) {
      localStorage.setItem(POPUP_LOCK_IN_KEY, 'true');
      localStorage.setItem(POPUP_LOCK_IN_TIMESTAMP_KEY, Date.now().toString());
    } else {
      localStorage.removeItem(POPUP_LOCK_IN_KEY);
      localStorage.removeItem(POPUP_LOCK_IN_TIMESTAMP_KEY);
    }
    window.dispatchEvent(new Event('lockInChanged'));
  };

  const setLockIn = (value: boolean) => {
    setIsLockIn(value);
    if (value) {
      localStorage.setItem(POPUP_LOCK_IN_KEY, 'true');
      localStorage.setItem(POPUP_LOCK_IN_TIMESTAMP_KEY, Date.now().toString());
    } else {
      localStorage.removeItem(POPUP_LOCK_IN_KEY);
      localStorage.removeItem(POPUP_LOCK_IN_TIMESTAMP_KEY);
    }
    window.dispatchEvent(new Event('lockInChanged'));
  };

  return { isLockIn, toggleLockIn, setLockIn };
};
