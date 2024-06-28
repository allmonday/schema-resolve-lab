import {getType} from './get-meta'
class Resolver {
    async _resolve(target: any) {
        // if target is array, call in Promise.all
        if (Array.isArray(target)) {
            return Promise.all(target.map(async (item: any) => {
                return await this._resolve(item)
            }))
        }

        // for field in target, call _resolve
        for (let key in target) {
            if (typeof target[key] === 'object') {
                target[key] = await this._resolve(target[key])
            }
        }

        return 


    }

    async resolve<T>(target: T) {
        return this._resolve(target)
    }
}