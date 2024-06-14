import "reflect-metadata"
import { Expose, plainToInstance, instanceToPlain, Type } from 'class-transformer';
import {IsInt, IsString, Max, Min, isNumber, validate} from 'class-validator'

// class-transform 无法确保返回类型符合ts 类型标注， 所以需要配合 class-validator 来做检验。

class Info {
    @IsString()
    hobby!: string

    resolve_hobby(): string {
        return 'swiming'
    }
}

class User {
    @IsInt()
    id!: number;

    @IsString()
    content!: string

    @Type(() => Info)
    info!: Info
}


const u = new User()

const getType = (obj: object, field: string) => {
    return Reflect.getMetadata('design:type', obj, field)
}

console.log(getType(u, 'id')) // undefined
console.log(getType(u, 'info'))

const uu = plainToInstance(User, {id: 12, content: 111, info: {hobby: 'writing'}}, {})
console.log(uu)
validate(uu).then(errors => {
    console.log(errors)
})

console.log(typeof uu)
