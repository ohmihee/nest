export interface Board {
    id: string,
    title: string,
    description: string;
    status: BoardStatus
}
// 기존에 더미데이터로 사용시 정의, 
// 실데이터베이스 이용시에는 엔티티를 통해 타입을 정의해두어서 필요없어진다.
// BoardStatus는 그대로 사용

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}
// enum은 사용자 정의 타입으로, 사용자가 값이 될 수 있는 것을 정의할 수 있다.
