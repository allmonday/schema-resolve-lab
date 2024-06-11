import "reflect-metadata"
import {Type, plainToInstance } from 'class-transformer';

class Tree {
    @Type(() => Tree)
    children!: Tree[]
    name!: string
}

const item = {
    name: 'tangkikodo',
    children: [
        {name: '1', children: [
            { name: '11'}
        ]},
        {name: '2'}
    ]
}

let user = plainToInstance(Tree, item)
console.log(user.children[0].constructor)
