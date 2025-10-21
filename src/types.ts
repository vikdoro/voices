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
    date?: string;
    eventType?: string;
    image?: string;
    altText?: string;
    location_general?: string;
    authors?: string;
    location_detail?: string;
    teaserText?: string;
}

export interface PeopleCategory {
    title: string;
    slug: string;
    people: (PeopleItem | string)[];
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
    teaserText?: string;
    eventType?: string;
    location_general?: string;
    label?: string;
    authors?: string;
    location_detail?: string;
    fixedImageHeight?: boolean;
}
