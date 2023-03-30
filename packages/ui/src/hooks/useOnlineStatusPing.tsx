import React, { createContext, useContext, useSyncExternalStore } from 'react';

// TODO: write and use ping service to detect online status, VPN connection causes false positives

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

// function subscribeFetch(call) {
//   const interval = setInterval(() => {
//     checkOnlineStatus().then((online) => {
//       if (online !== call()) {
//         call(online);
//       }
//     });
//   }, 1000);
//   return () => clearInterval(interval);
// }

const getSnapshot = () => {
  if (!navigator.onLine) {
    return navigator.onLine;
  }

  return true;
};

// keep internal
export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}

// exported for testing
export const OnlineStatusContext = createContext<boolean | undefined>(undefined);

export const useOnlineContext = () => useContext(OnlineStatusContext);

//only need to use this provider
export const OnlineStatusProvider = ({ children }: React.PropsWithChildren) => {
  const online = useOnlineStatus();
  return <OnlineStatusContext.Provider value={online}>{children}</OnlineStatusContext.Provider>;
};

export const checkOnlineStatus = async () => {
  try {
    const online = await fetch('/online-status-fetch.png');
    return online.status >= 200 && online.status < 300; // either true or false
  } catch (err) {
    return false; // definitely offline
  }
};
