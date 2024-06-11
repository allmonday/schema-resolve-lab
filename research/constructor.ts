class A {
    name: string = '111'
}
console.log({}.constructor === Object)
const a = new A()
console.log(a.constructor === A)