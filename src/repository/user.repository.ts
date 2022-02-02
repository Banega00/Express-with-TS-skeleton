import { User as UserEntity} from './../entities/user.entity';
import { EntityManager, getManager } from "typeorm";
import { User as UserModel} from "../models/user.model";

export class UserRepository {
    public static async insert(user:UserModel, entityManager?: EntityManager):Promise<UserModel>{
        const manager = entityManager ?? getManager();
        const userEntity = user.toEntity();
        return (await manager.save(UserEntity, userEntity)).toModel();
    }
}
