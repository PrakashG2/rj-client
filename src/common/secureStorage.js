import * as Keychain from 'react-native-keychain';
import { logger } from './logger';

let isOperationInProgress = false;

export const setSecureData = async (key, value) => {
    if (isOperationInProgress) {
        throw new Error('Operation in progress');
    }
    isOperationInProgress = true;
    try {
        await Keychain.setGenericPassword(key, value, key);
        logger.info('setSecureData done', key);
        if (__DEV__) {
            logger.info(value);
        }
    } catch (error) {
        logger.error('Error in setSecureData():', error);
        throw new Error(error.message);
    } finally {
        isOperationInProgress = false;
    }
};

export const getSecureData = async (key) => {
    if (isOperationInProgress) {
        throw new Error('Operation in progress');
    }
    isOperationInProgress = true;
    try {
        const value = await Keychain.getGenericPassword(key);
        logger.info('in getSecureData', key);
        if (__DEV__) {
            logger.info(value);
        }
        return value ? JSON.parse(value.password) : undefined;
    } catch (error) {
        logger.error('Error in getSecureData():', error);
        throw new Error(error.message);
    } finally {
        isOperationInProgress = false;
    }
};

export const removeSecureData = async (key) => {
    if (isOperationInProgress) {
        throw new Error('Operation in progress');
    }
    isOperationInProgress = true;
    try {
        await Keychain.resetGenericPassword(key);
    } catch (error) {
        logger.error('Error in removeSecureData():', error);
        throw new Error(error.message);
    } finally {
        isOperationInProgress = false;
    }
};
