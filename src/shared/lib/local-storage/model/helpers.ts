import { ServiceDeskType } from 'entities/service-desk';
import { setStorageData, getStorageData, removeStorageData } from './main';



/** Auth */
export const setAcceptedCookie = () => setStorageData('acceptedCookie', { isAccepted: 'true' });
export const getAcceptedCookie = (): string => getStorageData<{ isAccepted: string }>(
  'acceptedCookie'
)?.isAccepted || 'false';

/** ServiceDesk */
export const setServiceDeskData = (data: ServiceDeskType[]) => setStorageData('serviceDeskData', data);
export const getServiceDeskData = (): ServiceDeskType[] => getStorageData<ServiceDeskType[]>('serviceDeskData') || [];
