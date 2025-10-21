import { ref, onMounted, type Ref } from 'vue';
import { isDemoMode } from '../utils/utils';

/**
 * Maps public file paths to Google Drive URLs for demo mode
 */
const getGoogleDriveUrl = (publicPath: string): string | null => {
    const pathMap: Record<string, string> = {
        'output': '/api/data/output',
        'people': '/api/data/people',
        'home-contact-institutions': '/api/data/home-contact-institutions'
    };
    
    return pathMap[publicPath] || null;
};

/**
 * Global cache to store fetched data and prevent duplicate requests
 */
const globalCache = new Map<string, {
    data: any;
    promise: Promise<any> | null;
    isLoading: boolean;
}>();

/**
 * Fetch data with global caching to prevent duplicate requests
 */
async function fetchWithCache<T>(publicPath: string, assetData: T): Promise<T> {
    // If not in demo mode, return asset data immediately
    if (!isDemoMode()) {
        return assetData;
    }

    // Check if we already have this data in cache
    const cached = globalCache.get(publicPath);
    if (cached) {
        if (cached.data !== undefined) {
            return cached.data;
        }
        if (cached.promise) {
            return await cached.promise;
        }
    }

    // Start fetching
    const fetchUrl = getGoogleDriveUrl(publicPath);
    if (!fetchUrl) {
        console.warn(`No Google Drive URL mapped for path: ${publicPath}`);
        return assetData;
    }

    // Create a promise for this fetch and cache it
    const fetchPromise = (async () => {
        try {
            const response = await fetch(fetchUrl);
            
            if (response.ok) {
                const dataFromPublic = await response.json();
                // Cache the successful result
                globalCache.set(publicPath, {
                    data: dataFromPublic,
                    promise: null,
                    isLoading: false
                });
                return dataFromPublic;
            } else {
                console.warn(`Failed to load data from Google Drive (${response.status}): ${fetchUrl}`);
                return assetData;
            }
        } catch (err) {
            console.warn(`Failed to load data from Google Drive: ${err instanceof Error ? err.message : 'Unknown error'}`);
            return assetData;
        }
    })();

    // Cache the promise to prevent duplicate requests
    globalCache.set(publicPath, {
        data: undefined,
        promise: fetchPromise,
        isLoading: true
    });

    return await fetchPromise;
}

/**
 * Get cached data or fetch it if not available (for non-Vue contexts)
 * This function can be used in other parts of the app to access the same cached data
 */
export async function getCachedData<T>(publicPath: string, assetData: T): Promise<T> {
    return await fetchWithCache(publicPath, assetData);
}

/**
 * Composable for dynamically loading data from either Google Drive (demo mode) or assets
 * @param assetData - The fallback data from assets
 * @param publicPath - The path to the public data file (e.g., '/data/output/output.json') - will be mapped to Google Drive URL in demo mode
 * @param config - Optional configuration object with error callback
 * @returns Reactive ref containing the loaded data
 */
export function useDynamicData<T>(assetData: T, publicPath: string, config?: { error?: (message: string) => void }) {
    const data = ref<T>(assetData);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const loadData = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const fetchedData = await fetchWithCache(publicPath, assetData);
            data.value = fetchedData;
        } catch (err) {
            const errorMsg = `Failed to load data: ${err instanceof Error ? err.message : 'Unknown error'}`;
            config?.error?.(errorMsg);
            console.warn(errorMsg);
            error.value = errorMsg;
            // Fallback to asset data if there's an error
            data.value = assetData;
        } finally {
            isLoading.value = false;
        }
    };

    // Auto-load data when composable is used
    onMounted(() => {
        loadData();
    });

    return {
        data,
        isLoading,
        error,
        loadData
    };
}

/**
 * Composable for loading multiple data files simultaneously from Google Drive (demo mode) or assets
 * @param dataConfig - Array of { assetData, publicPath } configurations - publicPath will be mapped to Google Drive URL in demo mode
 * @param config - Optional configuration object with error callback
 * @returns Object with individual data refs and loading states
 */
export function useMultipleDynamicData<T extends Record<string, any>>(dataConfig: {
    [K in keyof T]: { assetData: T[K], publicPath: string }
}, config?: { error?: (message: string) => void }) {
    const results = {} as { [K in keyof T]: Ref<T[K]> };
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // Initialize data refs
    Object.keys(dataConfig).forEach(key => {
        const typedKey = key as keyof T;
        results[typedKey] = ref(dataConfig[typedKey].assetData);
    });

    const loadData = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const promises = Object.entries(dataConfig).map(async ([key, dataItemConfig]) => {
                const typedKey = key as keyof T;
                
                try {
                    const fetchedData = await fetchWithCache(dataItemConfig.publicPath, dataItemConfig.assetData);
                    results[typedKey].value = fetchedData;
                } catch (err) {
                    const errorMsg = `Failed to load data from ${dataItemConfig.publicPath}: ${err instanceof Error ? err.message : 'Unknown error'}`;
                    config?.error?.(errorMsg);
                    console.warn(errorMsg);
                    results[typedKey].value = dataItemConfig.assetData;
                }
            });

            await Promise.all(promises);
        } catch (err) {
            const errorMsg = `Failed to load some data: ${err instanceof Error ? err.message : 'Unknown error'}`;
            config?.error?.(errorMsg);
            console.warn(errorMsg);
            error.value = errorMsg;
            
            // Fallback all to asset data
            Object.keys(dataConfig).forEach(key => {
                const typedKey = key as keyof T;
                results[typedKey].value = dataConfig[typedKey].assetData;
            });
        } finally {
            isLoading.value = false;
        }
    };

    // Auto-load data when composable is used
    onMounted(() => {
        loadData();
    });

    return {
        ...results,
        isLoading,
        error,
        loadData
    };
}
