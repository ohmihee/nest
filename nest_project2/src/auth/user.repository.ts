import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entitly";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
     async createUser(authCred){}
}