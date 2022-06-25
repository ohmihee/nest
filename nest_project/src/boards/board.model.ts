/**
 * 
 * interface : 변수의 타입만을 체크한디.
 * 
 * classes : 변수의 타입도 체크하고 인스턴스도 생성할 수 있다.
 * 
 */

export interface Board {
    id: string
    title: string
    description: string
    status: BoardStatus
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}