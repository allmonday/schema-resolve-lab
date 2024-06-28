import "reflect-metadata"
import { Type, plainToInstance } from "class-transformer";

class Info {
    @Type(() => String)
    hobby: string = 'swiming'
}

class User {
    // @Type(() => Number)
    id!: number

    // @Type(() => String)
    content!: string

    @Type(() => Info)
    Info!: Info
}

function isClass(obj: any): boolean {
    return typeof obj === 'function' &&
        /^class\s/.test(Function.prototype.toString.call(obj)) &&
        obj.prototype !== undefined;
}


// get all field names from a class
// 需要通过生成一个instance 来实现
// 对于非class 的类型可以忽略掉

const scan = (cls: any) => {
    const meta = {}

    const walker = (cls: any) => {

    }

}

export const getFieldsFromClass = (cls: any) => {
    const instance = new cls()
    const fields =  Object.getOwnPropertyNames(instance)
    console.log(fields)
    console.log(instance)
    console.log(Reflect.getOwnPropertyDescriptor(instance, 'id'))
    fields.map((field: string) => {
        try {
            const type = Reflect.getMetadata('design:type', instance.prototype, field)
            console.log(field, type, type.name)
            // if type is class
            if (isClass(type)) {
                getFieldsFromClass(type)
            }
        } catch (err) {
            console.log('no meta')
        }

    })
    return fields
}

getFieldsFromClass(User)


