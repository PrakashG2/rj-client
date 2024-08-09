// Copyright © 2022 G2 Tech, All Rights Reserved
import { getSecureData, removeSecureData, setSecureData } from "./secureStorage";
import { CONFIG_DATA, SESSION, USER_DATA } from "../constants/index";

let userDataCache = null;
let configDataCache = null;

export const user = {

    // setSession: async (appSessionExpiryTime) => {
    //     await setSecureData(SESSION, JSON.stringify({ appSessionExpiryTime }));
    // },

    // getSession: async () => {
    //     const data = await getSecureData(SESSION);
    //     if (data) {
    //         return data.appSessionExpiryTime;
    //     }
    // },

    // Login, Logout
    login: async (userData) => {
        console.log(' login x-x-x-x-x-x-x-x-xx--> user.js', userData)
        const data = JSON.stringify(userData);
        await setSecureData(USER_DATA, data);
        userDataCache = userData;
        const secureData = await getSecureData(USER_DATA);
    console.log('Secure Data:', secureData);
        console.log("+=+================>", secureData)
    },
    selectServer: async (userData) => {
        console.log(' login x-x-x-x-x-x-x-x-xx--> user.js', userData)
        const data = JSON.stringify(userData);
        await setSecureData(USER_DATA, data);
        userDataCache = userData;
        const secureData = await getSecureData(USER_DATA);
    console.log('Secure Data:', secureData);
        console.log("+=+================>", secureData)
    },
    logout: async () => {
        await removeSecureData(USER_DATA);
        userDataCache = null;
    },
    isLoggedIn : async () => {
        if (userDataCache && Object.keys(userDataCache).length > 0) {
            return Boolean(userDataCache);
        }
        const userData = await getSecureData(USER_DATA);
        if (userData) {
            userDataCache = userData;
            return true;
        } else {
            return false;
        }
    },

    // For getting all data
    getAllUserData: async () => {
        if (userDataCache && Object.keys(userDataCache).length > 0) {
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%% |||| %%%%%%%%%%%%%%%%%%%%%%%%%%%%% =", userDataCache.Password)

            return userDataCache;

        }
        const userData = await getSecureData(USER_DATA);
        let userDataObject = {};

        // when no data is available getSecureData returns `false`, then return empty data.
        if (userData) {
            userDataObject = userData;
            userDataCache = userDataObject;
        }
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% + ", userDataObject.Password)

        return userDataObject;
    },


    getLoggedInUserName: async () => {
        // Check userDataCache first for efficiency
        if (userDataCache && userDataCache.firstName) {
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", userDataCache.first_name)

          return userDataCache.first_name;

        }
      
        // If not in cache, fetch from secure storage
        const userData = await getSecureData(USER_DATA);
      
        // Handle cases where secureData might be null or undefined
        if (!userData || !userData.first_name) {
          return null; // Or provide a default value if needed
        }
      
        // Update cache and return firstName
        userDataCache = userData;
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", userDataCache.first_name)

        return userData.first_name;
      },
      
    // Refresh Token Related

    refreshToken: async () => {
        try {
            // Check if userDataCache has email and password properties
            if (userDataCache && userDataCache.email && userDataCache.password) {
                return {
                    email: userDataCache.email,
                    password: userDataCache.password
                };
            }
    
            // Fetch user data from secure storage
            const userData = await getSecureData(USER_DATA);
    
            // Check if userData exists and has email and password properties
            if (userData && userData.email && userData.password) {
                // Update userDataCache
                userDataCache = userData;
                return {
                    email: userData.email,
                    password: userData.password
                };
            } else {
                // Handle case where userData is missing or incomplete
                console.error("User data is missing or incomplete.");
                return null;
            }
        } catch (error) {
            // Handle errors if any occur during fetching user data
            console.error("Error fetching user data for refresh token:", error);
            return null;
        }
    },
    

    // setRefreshToken: async (refresh_token) => {
    //     const userData = await getSecureData(USER_DATA);
    //     userData.refresh_token = refresh_token;
    //     await setSecureData(USER_DATA, JSON.stringify(userData));
    //     userDataCache = userData;
    // },

    // getRefreshToken: async () => {
    //     if (userDataCache && Object.keys(userDataCache).length > 0) {
    //         return userDataCache.refresh_token;
    //     }
    //     const userData = await getSecureData(USER_DATA);

    //     if (userData) {
    //         userDataCache = userData;

    //         return userData.refresh_token;
    //     }
    // },

    // Access Token Related
    getAccessToken: async () => {

        if (userDataCache && Object.keys(userDataCache).length > 0) {

            return userDataCache.access_token;

        }
        const userData = await getSecureData(USER_DATA);


        if (userData) {
            userDataCache = userData;

            return userData.access_token;
        }
    },

    setServerUrl: async (serverUrl) => {
        let configData = await getSecureData("CONFIG_DATA");
        if (!configData) {
            configData = {};
        }
        configData.serverUrl = serverUrl;
        await setSecureData("CONFIG_DATA", JSON.stringify(configData));
        configDataCache = configData;
        console.log('Server URL set successfully:', serverUrl);
    },


     // Access Token Related
   getServerUrl: async () => {
    if (userDataCache && Object.keys(userDataCache).length > 0) {
        console.log('Config data Server URL from cache ---------------->. |||A--------', userDataCache.serverUrl);

        return userDataCache.serverUrl;
    }
    const userData = await getSecureData(USER_DATA);

    if (userData) {
        userDataCache = userData;

        console.log('Config data Server URL from cache ---------------->. |||A--------', userData.serverUrl);


        return userData.serverUrl;
    }
},

    // geturl: async () => {

    //     console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
        
    //     const userData = await getSecureData(CONFIG_DATA);


    //     if (userData) {
    //         userDataCache = userData;

    //         return userData.serverUrl;
    //     }
    // },


    
    // setAccessToken: async (access_token) => {
    //     const userData = await getSecureData(USER_DATA);
    //     userData.access_token = access_token;
    //     await setSecureData(USER_DATA, JSON.stringify(userData));
    //     userDataCache = userData;

    // }
};

//
export const configuration = {

    configuration: async (configurationData) => {
        console.log(' login x-x-x-x-x-x-x-x-xx--> user.js', configurationData)
        const data = JSON.stringify(configurationData);
        await setSecureData(CONFIG_DATA, data);
        configDataCache = configurationData;
        const secureData = await getSecureData(CONFIG_DATA);
    console.log('Secure Data:', secureData);
        console.log("+=+================>", secureData)
    },
    
    setConfigData: async (configData) => {
        console.log('Setting config data:', configData);
        const data = JSON.stringify(configData);
        await setSecureData(CONFIG_DATA, data);
        configDataCache = configData;
        console.log('Config data stored successfully.');
    },

   
    getConfigData: async () => {
        console.log('Config data Server URL from cache ---------------->. |||A--------', configData);

        if (configDataCache) {
            console.log('Config data Server URL from cache ---------------->. |||aa--------', configData);

            return configDataCache;
        }
        const configData = await getSecureData(CONFIG_DATA);
        if (configData) {
            configDataCache = configData;
            console.log('Config data Server URL from cache ---------------->. |||a--------', configData);

            return configData;

        }
        console.log('Config data Server URL from cache ---------------->. |||v--------', configData);

        return null;
    },

   
    removeConfigData: async () => {
        console.log('Removing config data');
        await removeSecureData(CONFIG_DATA);
        configDataCache = null;
        console.log('Config data removed successfully.');
    },

    getServerUrl: async () => {
        if (configDataCache && Object.keys(configDataCache).length > 0) {
            console.log('Config data Server URL from cache ---------------->. |||A--------', configDataCache.serverUrl);
    
            return configDataCache.serverUrl;
        }
        console.log('Config data Server URL from cache ---------------->. |||AAA--------',)

        const configData = await getSecureData(CONFIG_DATA);
        console.log('Config data Server URL from cache ---------------->. |||AAAA--------',)

    
        if (configData) {
            configDataCache = configData;
    
            console.log('Config data Server URL from cache ---------------->. |||A--------', configData.serverUrl);
    
    
            return configData.serverUrl;
        }
    },

    // getServerUrl: async () => {
    //     console.log('Fetching server URL from cache.............................................................................................');
    
    //     try {
    //         if (configDataCache && configDataCache.serverUrl) {
    //             console.log('Server URL found in cache: .............................................................................................', configDataCache.serverUrl);
    //             return configDataCache.serverUrl;
    //         }
    
    //         console.log('Server URL not found in cache. Fetching from secure storage................................................................................................');
    
    //         const configData = await getSecureData(CONFIG_DATA);
    
    //         if (configData && configData.serverUrl) {
    //             console.log('Server URL fetched from secure storage:.............................................................................................', configData.serverUrl);
    
    //             // Update cache with fetched data
    //             configDataCache = configData;
    
    //             return configData.serverUrl;
    //         }
    
    //         console.log('Server URL not found in secure storage..............................................................................................');
    //         return null;
    //     } catch (error) {
    //         console.error('Error fetching server URL:', error);
    //         return null;
    //     }
    // },
    
    

   
    setServerUrl: async (serverUrl) => {
        let configData = await getSecureData(CONFIG_DATA);
        if (!configData) {
            configData = {};
        }
        configData.serverUrl = serverUrl;
        await setSecureData(CONFIG_DATA, JSON.stringify(configData));
        configDataCache = configData;
        console.log('Server URL set successfully:', serverUrl);
    }
};