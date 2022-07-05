import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'mihee',
    password: 'ajfl1541',
    database: 'miee_board',
    entities: [__dirname + '/../**/*.entity.{js.ts}'],
    // 데이터베이스를 생성할 설정을 작성한 스키마 파일이 존재하는 위치
    synchronize: true
    // 서버를 껐다 킬 때마다 데이터베이스를 드랍후 다시 생성할 것인지 여부

}