export interface Board {
    id: string,
    title: string,
    description: string;
    status: BoardStatus
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}
// enum은 사용자 정의 타입으로, 사용자가 값이 될 수 있는 것을 정의할 수 있다.