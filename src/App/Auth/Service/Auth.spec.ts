import { describe, vi, expect, it, beforeEach } from "vitest";
import { AuthService } from "./AuthService";
import { UserRepository } from "../../User/Repository/UserRepository";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { MakeErrors } from "../../../Utils/MakeErrors/MakeErrors";
import { STATUS_CODE } from "../../../Utils/StatusCode/StatusCode";

/* Para lembrar :  
Preparando o teste
mockResolvedValue -> Promise sucesso
mockRejectedValue -> Promise erro
mockReturnValue -> retorno
*/
  

const FakeMockRepository = {
    FindByEmail: vi.fn(),
    FindById:vi.fn(),
    Create:vi.fn(),
    FindAll:vi.fn()
} as any as UserRepository

const sut = new AuthService(FakeMockRepository)

describe("AuthService", () => {
// Email not found
it("should be able to return an error if email not found", async () => {
beforeEach(() => {
    vi.clearAllMocks()
})
    const MockLogin = {
        email: "gah@anacleto.com.br",
        password: "123456",
    }

    
    vi.spyOn(FakeMockRepository, "FindByEmail").mockResolvedValue(null)
  
    const result = await sut.Login(MockLogin)

    const expected = MakeErrors("E-mail ou password incorretos", STATUS_CODE.NON_AUTHORIZED)
    expect(result).toStrictEqual(expected)
    })



// Wrong password
it("should return an error if the password is wrong", async () => {
        const MockLogin = {
            email: "gah@anacleto.com.br",
            password: "123456",
        }
        const ReturnMock = { 
            name: "Gabriel", _id: 1, password: "senharetornada" } as any
   

vi.spyOn(FakeMockRepository, "FindByEmail").mockResolvedValue(ReturnMock)
vi.spyOn(bcrypt, "compareSync").mockReturnValueOnce(false)
const result = await sut.Login(MockLogin)

const expected = MakeErrors("E-mail ou password incorretos", STATUS_CODE.NON_AUTHORIZED)

expect(result).toStrictEqual(expected)
    })

// Return token and user
it("if email and password are validated it should return a token", async () => {

    const MockLogin = { email: "ga@anacleto.com.br", password: "senha123"}

    const MockReturn = { 
    name: "Gabriel", _id: 1, password: "SenhaEncriptada", email: "ga@anacleto.com.br" } as any

vi.spyOn(FakeMockRepository, "FindByEmail").mockResolvedValue(MockReturn)
vi.spyOn(bcrypt, "compareSync").mockReturnValue(true)
vi.spyOn(JWT, "sign").mockReturnValue("Tokengigante" as any)

const result = await sut.Login(MockLogin)

const expected = { token: "Tokengigante", name: "Gabriel", email: "ga@anacleto.com.br"}

expect(result).toStrictEqual(expected)
})


// Cath error
it("should return an error on the server if it doesn't pass within the try", async () => {

    const MockLogin = { email: "ga@anacleto.com.br", password: "senha123"}
    const MockError = new Error("Something went wrong")
    vi.spyOn(FakeMockRepository, "FindByEmail").mockRejectedValue(MockError)

    const result = await sut.Login(MockLogin)

    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR)

    expect(result).toStrictEqual(expected)
   })


})