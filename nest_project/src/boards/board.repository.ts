import { EntityRepository, Repository } from "typeorm";
import { Board } from './board.entity';

// @EntityRepository가 deprecated로 나오는 경우 버전을 너무 최신것을 사용하여서 이전 버전에서 사용되던 것이 사라져서 그런 것이다.
// 그러므로 기존에 설치된 것을 삭제하고 이전 버전으로 새로 설치하다.
// > npm uninstall typeorm
// > npm install typeorm@0.2
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

}