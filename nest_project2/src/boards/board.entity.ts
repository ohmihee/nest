import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board.model";

@Entity()
// create table ... 과 같은 역할
// 해당 클래스가 엔티티임을 나타낸다.
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    // id가 Board 엔티티 즉 테이블의 기본키임을 나타낸다.
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus
}