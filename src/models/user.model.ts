import { User as UserEntity } from './../entities/user.entity';
import bcrypt from "bcrypt" 

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
}

//class specific for a domain
export class User {
  private _id: number;
  private _username: string;
  private _password: string;

  constructor(obj?: IUser) {
    this.id = obj?.id ?? 0;
    this.username = obj?.username ?? "";
    this.password = obj?.password ?? "";
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }


  public async hashPassword(){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  public toEntity():UserEntity{
    const userEntity = new UserEntity({id: this.id, username:this.username, password:this.password});
    return userEntity;
  }
}
