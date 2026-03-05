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
export interface YouNongPaiToken {
    id: number;
    name: string;
    token: string;
}

export interface YouNongPaiLog {
    logId: number;
    fromLogId: number;
    des: string;
    userId: number;
    hideLog: number;
    bizId: number;
    bizParam: string;
    amount: number;
    fromUser: number;
    inOutState: number;
    inOutType: number;
    inOutProp: number;
    createTime: number;
    productTime: number;
}
    export interface YouNongPaiUser {
        nickName: string;
        userName: string;
        header: string;
        gender: number;
        birthday: number;
        phone: string;
        inviteName: string;
        verifyState: number;
        memberType: number;
        isOfficial: number;
        userId: number;
        referrerId: number;
        wechatNo: string;
        qrcode: string;
        selectPhone: null | string;
        createTime: number;
        unionName: string;
        unionPhone: string;
        areaServName: string;
        areaServPhone: string;
        isSetPayPwd: number; // 0 表示未设置支付密码
    }
export interface YouNongPaiBalance {
    balance: number;
    freezeBalance: number;
    totalBalance: number;
    tocUsedBalance: number;
    getCashImg: string;
}
export interface YouNongPai {
    user: YouNongPaiUser;
    balance: YouNongPaiBalance;
    logs: YouNongPaiLog[];
}
export default {
    searchor: () => axios.get<SearchorType[]>('/searchor'),
    note: () => axios.get<NoteCategory[]>('/note'),
    noteContent: (id: number) => axios.get<NoteContent>(`/note/content/${id}`),
    noteContentCreate: (data: Partial<NoteContent>) => axios.post<NoteContent[]>(`/note/content`, data),
    noteContentUpdate: (id: number, data: Partial<NoteContent>) => axios.post<NoteContent[]>(`/note/content/${id}`, data),
    youNongPaiTokens: () => axios.get<YouNongPaiToken[]>('/you_nong_pai/tokens'),
    youNongPai: (token: string) => axios.post<YouNongPai>('/you_nong_pai', {token}),
}