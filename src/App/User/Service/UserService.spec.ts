import { describe, it, vi, expect,beforeEach } from "vitest"
import bcrypt from "bcrypt"
import { UserService } from "./UserService"
import { UserRepository } from "../Repository/UserRepository"
import { MakeErrors } from "../../../Utils/MakeErrors/MakeErrors"
import { STATUS_CODE } from "../../../Utils/StatusCode/StatusCode"
import JWT from "jsonwebtoken"
import { Bcrypt } from "../../../Utils/Bcrypt"

// Sut Significa System under test!!
const RepositoryMock = {
    FindByEmail: vi.fn(),
    FindAll: vi.fn(),
    FindById: vi.fn(),
    Create: vi.fn(),
    EditProfile: vi.fn(),
    AddFavorites: vi.fn()
} as any as UserRepository
const sut = new UserService(RepositoryMock)

describe("UserService", () => {
  // User Already exist
  it("should be able to return an error if user already exists", async () => {
    const paramsMock = { name: "Gabriel", email: "gah@anacleto.com", password: "senha123"} as any

    const MockReturn = {
      id: 123,
      name: "Gabriel",
      email: "gah@anacleto.com",
      password: "senha123",
      createdAt: "",
      updatedAt: "",
    }  as any

    vi.spyOn(RepositoryMock, "FindByEmail").mockResolvedValue(MockReturn)

    const result = await sut.CreateFromService(paramsMock)

    expect(result).toStrictEqual(MakeErrors("Usuário ja existe", STATUS_CODE.BAD_REQUEST))
  })


  // Create user
  it("should be able to create a user", async () => {
    const paramsMock = { name: "Gabriel", email: "gah@anacleto.com", password: "senha123" } as any
    const expected = {
      id: 1,
      name: "Gabriel",
      email: "gah@anacleto.com",
      password: "senha123",
      createdAt: "",
      updatedAt: "",
    } as any

    vi.spyOn(RepositoryMock, "FindByEmail").mockResolvedValue(null)
    vi.spyOn(RepositoryMock, "Create").mockResolvedValue(expected)
    vi.spyOn(bcrypt, "hashSync").mockReturnValue("batatasEmaisBatatas")

    const result = await sut.CreateFromService(paramsMock)

    expect(result).toStrictEqual(expected)
  })


  it("should return an error on the server if it doesn't pass within the try", async () => {

    const paramsMock = { name: "Gabriel", email: "gah@anacleto.com", password: "senha123"} as any

    const MockError = new Error("Something went wrong")

    vi.spyOn(RepositoryMock, "FindByEmail").mockResolvedValue(null)
    vi.spyOn(RepositoryMock, "Create").mockRejectedValue(MockError)


    const result = await sut.CreateFromService(paramsMock)

    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR)

    expect(result).toStrictEqual(expected)
   })


})

describe("EditProfile", () => {
// Edit Success
it("It must be possible to edit a user profile", async ()=> {

const BodyMock = {
  name: "Gabriel",
  password: "senha123"
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE2MjU2N2JiYThjNjI2NDAwNGE4OTEiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDNjQ2s0cVVVdXNvc3FWVXRKYXZaSnVZdWtGLk51ZlUwU1lwWjFTUm9sYS9EZWRPMThYZUouIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6WyIxODAwIiwiMTgwMCIsIjE4MDAiLCJwbGVubyJdLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTI5VDAxOjE2OjIzLjIwM1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTI5VDAyOjExOjI1Ljk5NVoiLCJfX3YiOjB9LCJpYXQiOjE2OTYwMTIyMTksImV4cCI6MTY5NjAxNTUxOX0.1gvm5KPhcKa2GJmFpGGE5uwiPHwgVFFi4JtQDr4C56E"


const [, tokenNovo] = token.split(" ");
const decoded = {
  '$__': { activePaths: { paths: [Object], states: [Object] }, skipId: true },
  '$isNew': false,
  _doc: {
    _id: '65162567bba8c6264004a891',
    name: 'anacletogah',
    email: 'testeeee@teste.com',
    password: '$2b$08$3cCk4qUUusosqVUtJavZJuYukF.NufU0SYpZ1SRola/DedO18XeJ.',
    favorites: [],
    history: [ '1800', '1800', '1800', 'pleno' ],
    createdAt: '2023-09-29T01:16:23.203Z',
    updatedAt: '2023-09-29T02:11:25.995Z',
    __v: 0
  },
  iat: 1696012219,
  exp: 1696015519
}
const { _id} = decoded._doc;

  const MockEdited = {
          _id: "65162567bba8c6264004a891",
          name: "anacletogasah",
          email: "testeeee@teste.com",
          password: "$2b$08$MsCooVJ5tNCGnfd6t.Od6eED1BeTni7LqlVJ781VlQYISCjRW0kVC",
          favorites: [],
          history: [],
          createdAt: "",
          updatedAt: "",
          __v: 0
        } as any

vi.spyOn(JWT, "decode").mockReturnValue(decoded)
vi.spyOn(Bcrypt, "encrypt").mockResolvedValue("$2b$08$IeBRFDx5HX0Spg1DL.pY8uHzP17S5sQ9vhxPTgu7Zwoe.X4HVV.Va")
vi.spyOn(RepositoryMock, "EditProfile").mockResolvedValue(MockEdited)


const result = await sut.EditProfile(BodyMock,token)
expect(result).toStrictEqual(MockEdited)
})


it("should return an internal server error if it can't enter the try", async () => {
  const BodyMock = {
    name: "Gabriel",
    password: "senha123"
  }
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE2MjU2N2JiYThjNjI2NDAwNGE4OTEiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDNjQ2s0cVVVdXNvc3FWVXRKYXZaSnVZdWtGLk51ZlUwU1lwWjFTUm9sYS9EZWRPMThYZUouIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6WyIxODAwIiwiMTgwMCIsIjE4MDAiLCJwbGVubyJdLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTI5VDAxOjE2OjIzLjIwM1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTI5VDAyOjExOjI1Ljk5NVoiLCJfX3YiOjB9LCJpYXQiOjE2OTYwMTIyMTksImV4cCI6MTY5NjAxNTUxOX0.1gvm5KPhcKa2GJmFpGGE5uwiPHwgVFFi4JtQDr4C56E"
  
  
  const [, tokenNovo] = token.split(" ");
  const decoded = {
    '$__': { activePaths: { paths: [Object], states: [Object] }, skipId: true },
    '$isNew': false,
    _doc: {
      _id: '65162567bba8c6264004a891',
      name: 'anacletogah',
      email: 'testeeee@teste.com',
      password: '$2b$08$3cCk4qUUusosqVUtJavZJuYukF.NufU0SYpZ1SRola/DedO18XeJ.',
      favorites: [],
      history: [ '1800', '1800', '1800', 'pleno' ],
      createdAt: '2023-09-29T01:16:23.203Z',
      updatedAt: '2023-09-29T02:11:25.995Z',
      __v: 0
    },
    iat: 1696012219,
    exp: 1696015519
  }
  const { _id} = decoded._doc;
  
    const MockEdited = {
            _id: "65162567bba8c6264004a891",
            name: "anacletogasah",
            email: "testeeee@teste.com",
            password: "$2b$08$MsCooVJ5tNCGnfd6t.Od6eED1BeTni7LqlVJ781VlQYISCjRW0kVC",
            favorites: [],
            history: [],
            createdAt: "",
            updatedAt: "",
            __v: 0
          }

  const MockError = new Error("Something went wrong")
  const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR)

  beforeEach(() => {
    vi.resetAllMocks();
  })
  
  vi.spyOn(JWT, "decode").mockReturnValue(decoded)
  vi.spyOn(Bcrypt, "encrypt").mockResolvedValue("$2b$08$IeBRFDx5HX0Spg1DL.pY8uHzP17S5sQ9vhxPTgu7Zwoe.X4HVV.Va")
  vi.spyOn(RepositoryMock, "EditProfile").mockRejectedValue(MockError)


  const result = await sut.EditProfile(BodyMock,token)
  expect(result).toStrictEqual(expected)


})

})

describe("Add to favorites", () => {
  it("it should be possible to add jobs to favorites", async () => {
    
const favorites = "1232132132131313"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE2MjU2N2JiYThjNjI2NDAwNGE4OTEiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDNjQ2s0cVVVdXNvc3FWVXRKYXZaSnVZdWtGLk51ZlUwU1lwWjFTUm9sYS9EZWRPMThYZUouIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6WyIxODAwIiwiMTgwMCIsIjE4MDAiLCJwbGVubyJdLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTI5VDAxOjE2OjIzLjIwM1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTI5VDAyOjExOjI1Ljk5NVoiLCJfX3YiOjB9LCJpYXQiOjE2OTYwMTIyMTksImV4cCI6MTY5NjAxNTUxOX0.1gvm5KPhcKa2GJmFpGGE5uwiPHwgVFFi4JtQDr4C56E"


const [, tokenNovo] = token.split(" ");
const decoded = {
  '$__': { activePaths: { paths: [Object], states: [Object] }, skipId: true },
  '$isNew': false,
  _doc: {
    _id: '65162567bba8c6264004a891',
    name: 'anacletogah',
    email: 'testeeee@teste.com',
    password: '$2b$08$3cCk4qUUusosqVUtJavZJuYukF.NufU0SYpZ1SRola/DedO18XeJ.',
    favorites: [],
    history: [ '1800', '1800', '1800', 'pleno' ],
    createdAt: '2023-09-29T01:16:23.203Z',
    updatedAt: '2023-09-29T02:11:25.995Z',
    __v: 0
  },
  iat: 1696012219,
  exp: 1696015519
}
const { _id} = decoded._doc;

  const MockValue = {
    _id: "65174602452b7a79679b2cdd",
    name: "anacletogah",
    email: "testeeee@teste.com.br",
    favorites: [
      {
        _id: "6516d478d6c472b0832a28a9",
        position: "pleno",
        salary: "9800",
        jobcontract: "clt",
        localtype: "presencial",
        city: "São Paulo",
        technology: [],
        website: "www.indeed.com.br",
        company: "Ome Tech",
        companysize: "pequena",
        description: "Desenvolvedor pleno com experiencia",
        link: "www.indeed.com.br/pleno/vaga",
        createdAt: "2023-09-29T13:43:20.306Z",
        updatedAt: "2023-09-29T13:43:20.306Z",
        __v: 0
      }
    ],
    history: [],
    createdAt: "2023-09-29T21:47:46.977Z",
    updatedAt: "2023-09-29T23:49:21.965Z",
    __v: 0
  } as any

vi.spyOn(JWT, "decode").mockReturnValue(decoded)
vi.spyOn(Bcrypt, "encrypt").mockResolvedValue("$2b$08$IeBRFDx5HX0Spg1DL.pY8uHzP17S5sQ9vhxPTgu7Zwoe.X4HVV.Va")
vi.spyOn(RepositoryMock, "AddFavorites").mockResolvedValue(MockValue)


const result = await sut.AddFavorites(favorites,token)
expect(result).toStrictEqual(MockValue)
  })


  it("should return an error on the server if it doesn't pass within the try", async () => {
    
    const favorites = "1232132132131313"
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE2MjU2N2JiYThjNjI2NDAwNGE4OTEiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDNjQ2s0cVVVdXNvc3FWVXRKYXZaSnVZdWtGLk51ZlUwU1lwWjFTUm9sYS9EZWRPMThYZUouIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6WyIxODAwIiwiMTgwMCIsIjE4MDAiLCJwbGVubyJdLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTI5VDAxOjE2OjIzLjIwM1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTI5VDAyOjExOjI1Ljk5NVoiLCJfX3YiOjB9LCJpYXQiOjE2OTYwMTIyMTksImV4cCI6MTY5NjAxNTUxOX0.1gvm5KPhcKa2GJmFpGGE5uwiPHwgVFFi4JtQDr4C56E"
    
    
    const [, tokenNovo] = token.split(" ");
    const decoded = {
      '$__': { activePaths: { paths: [Object], states: [Object] }, skipId: true },
      '$isNew': false,
      _doc: {
        _id: '65162567bba8c6264004a891',
        name: 'anacletogah',
        email: 'testeeee@teste.com',
        password: '$2b$08$3cCk4qUUusosqVUtJavZJuYukF.NufU0SYpZ1SRola/DedO18XeJ.',
        favorites: [],
        history: [ '1800', '1800', '1800', 'pleno' ],
        createdAt: '2023-09-29T01:16:23.203Z',
        updatedAt: '2023-09-29T02:11:25.995Z',
        __v: 0
      },
      iat: 1696012219,
      exp: 1696015519
    }
    const { _id} = decoded._doc;
    
    const MockError = new Error("Something went wrong")
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR)


    vi.spyOn(JWT, "decode").mockReturnValue(decoded)
    vi.spyOn(Bcrypt, "encrypt").mockResolvedValue("$2b$08$IeBRFDx5HX0Spg1DL.pY8uHzP17S5sQ9vhxPTgu7Zwoe.X4HVV.Va")
    vi.spyOn(RepositoryMock, "AddFavorites").mockRejectedValue(MockError)
    
    
    const result = await sut.AddFavorites(favorites,token)
    expect(result).toStrictEqual(expected)
      })


})