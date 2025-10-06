import { ref } from 'vue';
import peopleData from '../assets/data/people/people.json';
import outputData from '../assets/data/output/output.json';
import type { PeopleCategory, OutputCategory } from '../types';
import { homeScrollPosition } from '../homeScrollPosition';
import { useMultipleDynamicData } from './useDynamicData';

export function useNavigationData(config?: { error?: (message: string) => void }) {
    const dataResult = useMultipleDynamicData({
        peopleCategories: { 
            assetData: peopleData, 
            publicPath: 'people' 
        },
        outputCategories: { 
            assetData: outputData, 
            publicPath: 'output' 
        }
    }, config);

    const { peopleCategories, outputCategories } = dataResult;

    const clearHomeScrollPosition = () => {
        homeScrollPosition.value = null;
    };

    return {
        peopleCategories,
        outputCategories,
        clearHomeScrollPosition
    };
}
