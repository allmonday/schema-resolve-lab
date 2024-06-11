import DataLoader from 'dataloader'

(async function () {
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
