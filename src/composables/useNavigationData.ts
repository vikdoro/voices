import { ref, onMounted } from 'vue';
import peopleData from '../assets/data/people/people.json';
import outputData from '../assets/data/output/output.json';
import type { PeopleCategory, OutputCategory } from '../types';

export function useNavigationData() {
    const peopleCategories = ref<PeopleCategory[]>([]);
    const outputCategories = ref<OutputCategory[]>([]);

    onMounted(() => {
        peopleCategories.value = peopleData;
        outputCategories.value = outputData;
    });

    return {
        peopleCategories,
        outputCategories
    };
}
