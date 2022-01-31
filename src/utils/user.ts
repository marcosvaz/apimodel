class User {
  public firstName (name: string) {
    let firstName = name.split(' ')[0]
    return firstName
  }
}

export default new User()
