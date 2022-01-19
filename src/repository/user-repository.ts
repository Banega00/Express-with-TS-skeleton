export class UserRepository{
    private static instance:UserRepository;
    private users:User[];

    public static getInstance(): UserRepository{
        if(!UserRepository.instance){
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance
    }
    private constructor(){
        this.users = [
            {
                id: 1,
                username: "pera@gmail.com",
                password: "pera",
                name: "Petar",
                age: 30
            },
            {
                id: 1,
                username: "pera@gmail.com",
                password: "pera",
                name: "Petar",
                age: 30
            },
            {
                id: 1,
                username: "pera@gmail.com",
                password: "pera",
                name: "Petar",
                age: 30
            },
            {
                id: 1,
                username: "pera@gmail.com",
                password: "pera",
                name: "Petar",
                age: 30
            }
        ]
    }

    public findById(userId: number): User|undefined{
        return this.users.find(user => user.id === userId);
    }

    public findByUsername(username: string): User|undefined{
        return this.users.find(user => user.username === username);
    }

}

export interface User{
    id: number;
    username: string;
    password: string;
    name: string;
    age: number;
}