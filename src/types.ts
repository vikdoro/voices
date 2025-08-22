export interface OutputCategory {
    slug: string;
    title: string;
    coverImage: string;
    description: string;
    items: OutputItem[];
}

export interface OutputItem {
    title: string;
    link?: string;
    type?: string;
    image?: string;
    location?: string;
    authors?: string;
    organisations?: string;
}

export interface PeopleCategory {
    title: string;
    slug: string;
    people: PeopleItem[];
}

export interface PeopleItem {
    name: string;
    role: string;
    link?: string;
    description?: string;
    image?: string;
}

export interface OutputCardContent {
    imageFolder?: string;
    link?: string;
    image?: string;
    label?: string;
    title: string;
    description?: string;
    authors?: string;
    organisations?: string;
}
