export interface  ITodos {
    title: string;
    body: string | null;
    completed: boolean;
    id?: string;
    createdAt?: Date;
}