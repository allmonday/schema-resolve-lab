import { plainToInstance } from 'class-transformer';

(async function () {
    class Info {
        hobby!: string

        resolve_hobby() {
            return 'swiming'
        }
    }

    class User {
        id!: number;
        firstName!: string;
        lastName!: string;
        age!: number;
        info!: Info

        resolve_age() {
            return 21
        }
    }

    const items = [
        {
            "id": 1,
            "firstName": "Johny",
            "lastName": "Cage",
            "age": 27,
            "info": {
                "hobby": "runing"
            }
        },
        {
            "id": 2,
            "firstName": "Ismoil",
            "lastName": "Somoni",
            "age": 50,
            "info": {
                "hobby": "runing"
            }
        },
        {
            "id": 3,
            "firstName": "Luke",
            "lastName": "Dacascos",
            "age": 12,
            "info": {
                "hobby": "runing"
            }
        }
    ]

    let users = plainToInstance(User, items); // to convert user plain object a single user. also supports arrays

    console.log(users)

    let user = plainToInstance(User, items[0])

    console.log(user.constructor)

    const getMethods = (kls: any) => {
        const fields = Reflect.ownKeys(kls.prototype)
        const resolvers = fields.filter(f => f.toString().startsWith('resolve_'))
        return resolvers
    }
    console.log(getMethods(user.constructor))

})()
