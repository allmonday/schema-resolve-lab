import { plainToInstance } from 'class-transformer';
import DataLoader from 'dataloader'

interface Type<T> extends Function { new(...args: any[]): T; }

(async function () {
    class User {
        id!: number;
        firstName!: string;
        lastName!: string;
        age!: number;

        resolve_age() {
            return 21
        }
    }

    const items = [
        {
            "id": 1,
            "firstName": "Johny",
            "lastName": "Cage",
            "age": 27
        },
        {
            "id": 2,
            "firstName": "Ismoil",
            "lastName": "Somoni",
            "age": 50
        },
        {
            "id": 3,
            "firstName": "Luke",
            "lastName": "Dacascos",
            "age": 12
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
    console.log(getMethods(User))

    const batcherFn = function (arg: number) {
        const p = async (keys: number[]) => {
            return keys.map((k) => k + arg)
        }
        return p
    }

    const batcher = batcherFn(1)
    // @ts-ignore
    const loader = new DataLoader(batcher)
    const result = await Promise.all([
        loader.load(1),
        loader.load(2),
        loader.load(3),
    ])
    console.log(result)

})()
