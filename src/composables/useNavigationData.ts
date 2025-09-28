import { ref, onMounted } from 'vue';
import peopleData from '../assets/data/people/people.json';
import outputData from '../assets/data/output/output.json';
import type { PeopleCategory, OutputCategory } from '../types';
import { homeScrollPosition } from '../homeScrollPosition';

export function useNavigationData() {
    const peopleCategories = ref<PeopleCategory[]>([]);
    const outputCategories = ref<OutputCategory[]>([]);

    onMounted(() => {
        peopleCategories.value = peopleData;
        outputCategories.value = outputData;
    });

    const clearHomeScrollPosition = () => {
        homeScrollPosition.value = null;
    };

    return {
        peopleCategories,
        outputCategories,
        clearHomeScrollPosition
    };
}
