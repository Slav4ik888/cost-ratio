import { setStorageData, getStorageData, removeStorageData } from './main';



/** Auth */
export const setAcceptedCookie = () => setStorageData('acceptedCookie', { isAccepted: 'true' });
export const getAcceptedCookie = (): string => getStorageData<{ isAccepted: string }>(
  'acceptedCookie'
)?.isAccepted || 'false';

/** Auth */
export const setServiceDeskData = (data: string[]) => setStorageData('serviceDeskData', data);
export const getServiceDeskData = (): string[] => getStorageData<string[]>('serviceDeskData') || [];
