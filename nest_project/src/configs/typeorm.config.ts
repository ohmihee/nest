import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
    type:'postgres',
    host: 'localhost',
    port: 5432,
    username:'mihee',
    password: '',
    database: 'nest_board',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    // @Entity : 클래스가 엔티티임으로 나타낼 때 사용, 즉 테이블 생성시
    // @PrimaryGeneratedColumn() : id 열이 특정 엔터티의 기본 키 열임을 나타내는데 사용
    // @Column() : 엔터티의 title 및 description과 같은 다른 열을 나타내는 데 사용.
    synchronize: true
    // synchronize를 true로 주면, 애플리케이션을 재실행시 엔티티안에서 수정된 컬럼의 길이 타입 변경값들을 해당 테이블을 드랍한 후 다시 생성해준다. 

}
