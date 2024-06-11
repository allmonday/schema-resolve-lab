import "reflect-metadata"
import { Expose, plainToInstance, instanceToPlain, Type } from 'class-transformer';


class Info {
    hobby!: string

    resolve_hobby(): string {
        return 'swiming'
    }
}

class User {
    id!: number;
    @Type(() => Info)
    info!: Info
}


const u = new User()

const getType = (obj: object, field: string) => {
    return Reflect.getMetadata('design:type', obj, field)
}

console.log(getType(u, 'id')) // undefined
console.log(getType(u, 'info'))
