interface User {
  login: string
  password: string
  birthDay: string
}
export interface FakeDB {
  init: () => void
  findUser: (login: string) => User | undefined
}

class FakeDatabase implements FakeDB {
  init() {
    if (localStorage.getItem('users')) {
      return
    }
    localStorage.setItem('users', JSON.stringify([]))
  }
  findUser(login: string | null) {
    if (!localStorage.getItem('users')) {
      return
    } else {
      const data: User[] = JSON.parse(localStorage.getItem('users') as string)
      const user: User | undefined = data.find((user) => user.login === login)
      return user
    }
  }
  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') as string)
  }
  pushUser(user: {
    login: string | null
    password: string | null
    birthDay: string | null
  }) {
    const users = JSON.parse(localStorage.getItem('users') as string)
    localStorage.setItem('users', JSON.stringify([...users, user]))
  }
}
export default FakeDatabase
