import { describe, it , vi , expect, beforeEach } from 'vitest'
import { TechnologyService } from './TechnologyService'
import { TechnologyRepository } from '../Repository/TechnologyRepository';
import { MakeErrors } from '../../../Utils/MakeErrors/MakeErrors';
import { STATUS_CODE } from '../../../Utils/StatusCode/StatusCode';


const RepositoryFake = {
    Create: vi.fn(),
    IncrementCount: vi.fn(),
    FindById:vi.fn(),
    FindAll: vi.fn(),
    FindTopFiveGlobal: vi.fn(),
    FindByName:vi.fn()
} as any as TechnologyRepository

const sut = new TechnologyService(RepositoryFake);

describe("Tecnlogy Service", () => {

// Creating a new record
it("must be able to create a new technology", async () =>{
    const parasMock = {
        name: "PHP",
        count: 0,
    }

    const expected = {
        id: 1,
        name: "PHP",
        count: 1,
        createdAt: "",
        updatedAt: "",
      } as any


      beforeEach(() => {
        vi.resetAllMocks();
      })


vi.spyOn(RepositoryFake, "FindByName").mockResolvedValue(null) 
vi.spyOn(RepositoryFake, "Create").mockResolvedValue(expected) 

const result = await sut.CreateFromService(parasMock)

expect(result).toStrictEqual(expected)


})


// Error if technology exists
it("should return an error if the tecnology already exists", async () => {
    const parasMock = {
        name: "PHP",
        count: 0,
    }

    const MockReturn = {
        _id: 11,
        name: "PHP",
        count: 0,
    } as any

const expected = MakeErrors(`Tecnologia ${parasMock.name} já existe.`, STATUS_CODE.BAD_REQUEST)

vi.spyOn(RepositoryFake, "FindByName").mockResolvedValue(MockReturn) 

const result = await sut.CreateFromService(parasMock)

expect(result).toStrictEqual(expected)
})

// Error if technology is not created
it("should return an error if the technology is not created", async () => {
const MockValue = {
    name: "Phyton",
    test: "test"
}
const expected = MakeErrors("Tecnologia não foi criada, preencha corretamente", STATUS_CODE.BAD_REQUEST)
vi.spyOn(RepositoryFake, "FindByName").mockResolvedValue(null) 
vi.spyOn(RepositoryFake, "Create").mockResolvedValue(expected) 

const result = await sut.CreateFromService(MockValue)

expect(result).toStrictEqual(expected)
})

// Error internal server error
it("should return an error on the server if it doesn't pass within the try", async () => {
    const MockData = { name: "Java"}
    const MockError = new Error("Something went wrong")
    vi.spyOn(RepositoryFake, "FindByName").mockRejectedValue(MockError)
    vi.spyOn(RepositoryFake, "Create").mockRejectedValue(MockError)

    const result = await sut.CreateFromService(MockData)

    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR)

    expect(result).toStrictEqual(expected)
})


})


describe("FindAllFromService", async () => {

it("should return an error if the function returns nothing", async () => {
   
    const expected = [
        {
            _id: "6514cac4685426bd89d08d4a",
            name: "C++",
            count: 7,
            createdAt: "",
            updatedAt: "",
            __v: 0
        },
        {
            _id: "6514caca685426bd89d08d4c",
            name: "Java",
            count: 0,
            createdAt: "",
            updatedAt: "",
            __v: 0
        },
    ] as any


    vi.spyOn(RepositoryFake, "FindAll").mockResolvedValue(expected)
    const result = await sut.FindAllFromService()

    expect(result).toEqual(expected)
})

it("should return an error on the server if it doesn't pass within the try", async () => {
  
    const MockError = new Error("Something went wrong")
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR)

    vi.spyOn(RepositoryFake, "FindAll").mockRejectedValue(MockError)
    const result = await sut.FindAllFromService()
    
    expect(result).toStrictEqual(expected)
})


})


