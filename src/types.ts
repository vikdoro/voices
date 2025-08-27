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
    deliveryMode?: string;
    dateTag?: string;
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
    title: string;
    description?: string;
    link?: string;
    imageFolder?: string;
    image?: string;
    dateTag?: string;
    location?: string;
    label?: string;
    authors?: string;
    organisations?: string;
}
