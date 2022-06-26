/**
 * 
 * interface : 변수의 타입만을 체크한디.
 * 
 * classes : 변수의 타입도 체크하고 인스턴스도 생성할 수 있다.
 * 
 */

// 데이터 베이스를 이용할 때는 Entity에 타입을 설정해두므로 해당 부분은 필요없어진다.
/*
export interface Board {
    id: string
    title: string
    description: string
    status: BoardStatus
}
*/

// BoardStatus는 계속 필요
export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}