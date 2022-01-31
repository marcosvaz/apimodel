import bcrypt from 'bcrypt'

class Crypto {
  public async encrypt (password: string) {
    const SALT_ROUNDS = 10

    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    return hash
  }

  public async compare (password: string, hash: string) {
    const result = await bcrypt.compare(password, hash)
    return result
  }
}

export default new Crypto()
