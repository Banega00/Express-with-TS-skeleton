import { User as UserModel } from './../models/user.model';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../models/user.model";
@Entity() //Entitiy is database representation of domain class
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;


  constructor(obj?: IUser) {
    this.id = obj?.id ?? 0;
    this.username = obj?.username ?? "";
    this.password = obj?.password ?? "";
  }

  public toModel():UserModel{
    return new UserModel({id:this.id, username:this.username, password: ""})//password is ommited!
  }
}
