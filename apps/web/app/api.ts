import axios from "@/axios";


export interface Searchor {
    id: number;
    name: string;
    value: string;
    icon: string;
    sort: number;
}
export interface SearchorType {
    id: number;
    name: string;
    sort: number;
    searchors?: Searchor[];
}
export interface NoteContent {
    id: number;
    category_id: number;
    title: string;
    content: string;
    sort: number;
}
export interface NoteCategory {
    id: number;
    parent_id: number;
    name: string;
    sort: number;
    children?: NoteCategory[];
    contents?: NoteContent[];
}
export default {
    searchor: () => axios.get<SearchorType[]>('/searchor'),
    note: () => axios.get<NoteCategory[]>('/note'),
    noteContent: (id: number) => axios.get<NoteContent>(`/note/content/${id}`),
    noteContentCreate: (data: Partial<NoteContent>) => axios.post<NoteContent[]>(`/note/content`, data),
    noteContentUpdate: (id: number, data: Partial<NoteContent>) => axios.post<NoteContent[]>(`/note/content/${id}`, data),
}