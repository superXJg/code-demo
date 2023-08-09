console.log('im test')
class Message {
  static name = 'xxxx'
  static age = 12

  constructor() {
    this.id = 11;
    this.skill = 'run'
  }
}

const arr = [new Message, new Message , new Message]
console.log('arr', arr)


const obj = {
  c: Message
}

console.log(arr[0] instanceof Message)