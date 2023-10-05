import bcrypt from 'bcrypt'

class Bcrypt {
    static encrypt(text: string): string {
      return bcrypt.hashSync(text, 8)
    }
    static compare(text: string, hash: string): boolean {
      return bcrypt.compareSync(text, hash)
    }
  }
  
  export { Bcrypt }