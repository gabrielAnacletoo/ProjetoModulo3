import { describe, it, vi, expect,beforeEach } from "vitest"
import { JobService } from "./JobsService"
import { JobsRepository } from "../Repository/JobsRepository"
import { TechnologyRepository } from "../../Technology/Repository/TechnologyRepository"
import { CitySearchRepository } from "../../CitySearch/Repository/CitySearchRepository"
import { UserRepository } from '../../User/Repository/UserRepository'
import { MakeErrors } from "../../../Utils/MakeErrors/MakeErrors"
import { STATUS_CODE } from "../../../Utils/StatusCode/StatusCode"
import JWT from "jsonwebtoken"


const FakeJobsRepository = {
    Create: vi.fn(),
    FindById: vi.fn(),
    Filter: vi.fn(),
} as any as JobsRepository


const FakeTechnologyRepository = {
    Create: vi.fn(),
    FindByName: vi.fn(),
    Filter: vi.fn(),
    IncrementCount: vi.fn(),
} as any as TechnologyRepository

const FakeUserRepository = {
  Create: vi.fn(),
  FindByName: vi.fn(),
  Filter: vi.fn(),
  IncrementCount: vi.fn(),
  AddHistory: vi.fn(),
} as any as UserRepository



const FakeCitySearchRepository = {
    Create: vi.fn(),
    FindById: vi.fn(),
    FindByCityAndTech: vi.fn(),
    IncrementCount: vi.fn()
} as any as CitySearchRepository



const sut = new JobService(FakeJobsRepository,FakeTechnologyRepository,FakeCitySearchRepository,FakeUserRepository) 


describe("Tests JobService CreateFromService", () => {
    //Created Sucessfully
    it("must be able to create a job", async () => {
        const paramsMock = {
            position: "junior",
            salary: "2000",
            jobcontract: "clt",
            localtype: "presencial",
            cityId: "650e43894b383bb1298bf574",
            technologyId: "650f7f36d4a302c7a4876ee7",
            website: "www.indeed.com.br",
            company: "Alfa Tech",
            companysize: "pequena",
            description: "Desenvolvedor junior com experiencia",
            link: "www.indeed.com.br/junior/vaga"
            }

      vi.spyOn(FakeJobsRepository, "Create").mockResolvedValue({
      _id: "650f7f48d4a302c7a4876eed",
      position: "junior",
      salary: "2000",
      jobcontract: "clt",
      localtype: "presencial",
      cityId: "650e43894b383bb1298bf574",
      technologyId: "650f7f36d4a302c7a4876ee7",
      website: "www.indeed.com.br",
      company: "Alfa Tech",
      companysize: "pequena",
      description: "Desenvolvedor junior com experiencia",
      link: "www.indeed.com.br/junior/vaga",
      createdAt: "2023-09-24T00:00:00.000Z",
      updatedAt: "2023-09-24T00:00:00.000Z",
    __v: 0, } as any) 

    beforeEach(() => {
      vi.resetAllMocks();
    })


  const result = await sut.CreateFromService(paramsMock);
  expect(result).toStrictEqual({
    _id: "650f7f48d4a302c7a4876eed",
    position: "junior",
    salary: "2000",
    jobcontract: "clt",
    localtype: "presencial",
    cityId: "650e43894b383bb1298bf574",
    technologyId: "650f7f36d4a302c7a4876ee7",
    website: "www.indeed.com.br",
    company: "Alfa Tech",
    companysize: "pequena",
    description: "Desenvolvedor junior com experiencia",
    link: "www.indeed.com.br/junior/vaga",
    createdAt: "2023-09-24T00:00:00.000Z",
    updatedAt: "2023-09-24T00:00:00.000Z",
  __v: 0, } )

})


// Created Failure
it("must return an error on failed creation", async () => {
  beforeEach(() => {
    vi.resetAllMocks();
  })

    const paramsMock = {
        position: "junior",
        salary: "2000",
        jobcontract: "clt",
        localtype: "presencial",
        cityId: "650e43894b383bb1298bf574",
        technologyId: "650f7f36d4a302c7a4876ee7",
        website: "www.indeed.com.br",
        company: "Alfa Tech",
        companysize: "pequena",
        description: "Desenvolvedor junior com experiencia",
        link: "www.indeed.com.br/junior/vaga"
        }
    const expected = MakeErrors('Essa vaga não pode ser criada, preencha corretamente', STATUS_CODE.BAD_REQUEST)
  

    vi.spyOn(FakeJobsRepository, "Create").mockResolvedValue(null) 
    const result = await sut.CreateFromService(paramsMock)
    expect(result).toStrictEqual(expected)

})

// Internal server error
it("should return an error on the server if it doesn't pass within the try", async () => {
  const MockError = new Error("Something went wrong")
  const paramsMock = {
    position: "junior",
    salary: "2000",
    jobcontract: "clt",
    localtype: "presencial",
    cityId: "650e43894b383bb1298bf574",
    technologyId: "650f7f36d4a302c7a4876ee7",
    website: "www.indeed.com.br",
    company: "Alfa Tech",
    companysize: "pequena",
    description: "Desenvolvedor junior com experiencia",
    link: "www.indeed.com.br/junior/vaga"
    }


  vi.spyOn(FakeJobsRepository, "Create").mockRejectedValue(MockError)

  const result = await sut.CreateFromService(paramsMock)

  const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR)

  expect(result).toStrictEqual(expected)

})

})


describe("FilterFromService", () => {

// Return filter and increment if existingSearchis true
  it("must be able to return query and increments when both cityId and technologyId are provided and existingSearch is true", async () => {
    beforeEach(() => {
      vi.resetAllMocks();
    })
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM"
    const filter = { city: "Bauru", technology: "React" }    
    
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
    

    const Findtrue = { _id: 123123, city: 'Bauru', count: 2, technology: 'React' } as any
    const incremented = { _id: 123123, city: 'Bauru', count: 3, technology: 'React' } as any
    
    vi.spyOn(JWT, "decode").mockReturnValue(decoded)
    vi.spyOn(FakeJobsRepository, "Filter").mockResolvedValue(Findtrue)
    vi.spyOn(FakeCitySearchRepository, "FindByCityAndTech").mockResolvedValue(Findtrue)
    vi.spyOn(FakeCitySearchRepository, "IncrementCount").mockResolvedValue(incremented)
  
  const result = await sut.FilterFromService(filter, token)
  
  expect(result).toEqual({
    Incrementos: incremented,
    Consulta: Findtrue,
    Message: 'Registros existentes incrementados com sucesso'
})
})
  
  
 // Create register if FindByCityAndTechIds is false
it("it should be possible to create a record if FindByCityAndTechIds is false", async () => {
  beforeEach(() => {
    vi.resetAllMocks();
  })
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM"
  
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

  const filter = { city: "Bauru", technology: "React", count: 0 } as any
  const Findtrue = { _id: 123123, city: 'Bauru', count: 2, technology: 'React' } as any
  vi.spyOn(JWT, "decode").mockReturnValue(decoded)
  vi.spyOn(FakeJobsRepository, "Filter").mockResolvedValue(Findtrue)
  vi.spyOn(FakeCitySearchRepository, "FindByCityAndTech").mockResolvedValue(null)
  vi.spyOn(FakeCitySearchRepository, "Create").mockResolvedValue(filter)
 

const result = await sut.FilterFromService(filter, token)

expect(result).toStrictEqual({
  Incrementos: filter,
  Consulta: `Não existem vagas em ${filter.city} com tecnlogia ${filter.technology}.`,
  Message: "Registro criado."
})
})


// If Tecnology not found return error message
it("should return Technology not found if the name is not found", async () => {
  const filter = { technology: "React" }
  beforeEach(() => {
    vi.resetAllMocks();
  })
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM"
  
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
  const expected = MakeErrors("Tecnologia não encontrada", STATUS_CODE.NOT_FOUND);


  vi.spyOn(JWT, "decode").mockReturnValue(decoded)
  vi.spyOn(FakeTechnologyRepository, "FindByName").mockResolvedValue(null)

  const result = await sut.FilterFromService(filter,token)
  
  expect(result).toEqual(expected)

})

// Increase Tecnology if technology exists
it("must increase technology but show that there are no jobs with this technology", async () => {
  beforeEach(() => {
    vi.resetAllMocks();
  })

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM";

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
      history: ['1800', '1800', '1800', 'pleno'],
      createdAt: '2023-09-29T01:16:23.203Z',
      updatedAt: '2023-09-29T02:11:25.995Z',
      __v: 0,
    },
    iat: 1696012219,
    exp: 1696015519,
  }
  const { _id } = decoded._doc;
  const IncrementedTechnology = [
    {
      _id: "6514cae1685426bd89d08d56",
      name: 'PHP',
      count: 23,
      createdAt: "",
      updatedAt: "",
      __v: 0
    },
    {
      _id: "6514cc701405f9513e85220d",
      name: 'React',
      count: 31,
      createdAt: "",
      updatedAt: "",
      __v: 0
    }
  ] as any
  const FindByNameTech = {
    technology: ["React", "PHP"],
  }

  const techFind = [
    {
      _id:"6514cae1685426bd89d08d56",
      name: 'PHP',
      count: 26,
      createdAt: "",
      updatedAt: "",
      __v: 0
    },
    {
      _id: "6514cc701405f9513e85220d",
      name: 'React',
      count: 35,
      createdAt: "",
      updatedAt: "",
      __v: 0
    }
  ] as any

  vi.spyOn(JWT, "decode").mockReturnValue(decoded)
  vi.spyOn(FakeTechnologyRepository, "FindByName").mockResolvedValue(techFind)
  vi.spyOn(FakeTechnologyRepository, "IncrementCount").mockResolvedValue(IncrementedTechnology)
  vi.spyOn(FakeJobsRepository, "Filter").mockResolvedValue([])

  const result = await sut.FilterFromService(FindByNameTech, token)
  expect(result.Consulta).toEqual(`Não existem vagas para ${FindByNameTech.technology.join(",")}`)
  
})


// Increment Technology and show filter
it("if the query exists then it should display the query and the technology increment", async ()=> {
  beforeEach(() => {
    vi.resetAllMocks();
  })

  const FindByNameTech =  [
    {
      _id: "6514cc701405f9513e85220d",
      name: 'React',
      count: 37,
      createdAt: "2023-09-28T00:44:32.875Z",
      updatedAt: "2023-10-02T16:19:47.425Z",
      __v: 0
    }
  ] as any 

  const Consulta = {
    _id: "6514c564774be39577e81b5f",
    position: "pleno",
    salary: "1800",
    jobcontract: "pj",
    localtype: "remoto",
    city: "Bauru",
    technology: [
      "React"
    ],
    website: "www.indeed.com.br",
    company: "Omega Tech",
    companysize: "grande",
    description: "Desenvolvedor junior com experiencia",
    link: "www.indeed.com.br/junior/vaga",
    createdAt: "2023-09-28T00:14:28.122Z",
    updatedAt: "2023-09-28T00:14:28.122Z",
    __v: 0
  } as any

  // const Incremented = { _id: 123,technology: 'React', count: 3} as any
  const Incremented = {
  _id: "6514cc701405f9513e85220d",
  name: 'React',
  count: 38,
  createdAt: "2023-09-28T00:44:32.875Z",
  updatedAt: "2023-10-02T18:23:19.140Z",
  __v: 0
} as any

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM"
  
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

  vi.spyOn(JWT, "decode").mockReturnValue(decoded)
 
  let IncrementedTechnology: any[] = []
  vi.spyOn(FakeJobsRepository, "Filter").mockResolvedValue(Consulta)
  vi.spyOn(FakeTechnologyRepository, "FindByName").mockResolvedValue(FindByNameTech)
  vi.spyOn(FakeTechnologyRepository, "IncrementCount").mockResolvedValue(Incremented)


  const result = await sut.FilterFromService(FindByNameTech, token)
  const expected = { Incremento: IncrementedTechnology, Consulta: Consulta }
  expect(result).toEqual(Consulta)


})


// Internal Server Error
it("should return an error on the server if it doesn't pass within the try", async () => {
  const Filter = { technology: "React" }

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM"

  const Incremented = { _id: 123,technology: 'React', count: 3} as any
  
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

  vi.spyOn(JWT, "decode").mockReturnValue(decoded)

  const MockError = new Error("Something went wrong")
  vi.spyOn(FakeJobsRepository, "Filter").mockRejectedValue(MockError)
  vi.spyOn(FakeCitySearchRepository, "FindByCityAndTech").mockRejectedValue(MockError)
  vi.spyOn(FakeCitySearchRepository, "IncrementCount").mockRejectedValue(MockError)

  const result = await sut.FilterFromService(Filter,token)

  const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR)

  expect(result).toStrictEqual(expected)
 })


})
  
