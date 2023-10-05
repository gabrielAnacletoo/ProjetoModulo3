import {it, vi, expect, describe} from 'vitest'
import { CitySearchService } from './CitySearchService'
import { CitySearchRepository } from '../Repository/CitySearchRepository'
import { MakeErrors } from '../../../Utils/MakeErrors/MakeErrors'
import { STATUS_CODE } from '../../../Utils/StatusCode/StatusCode'
import { TechnologyRepository } from '../../Technology/Repository/TechnologyRepository'


const MockRepository = {
    Create: vi.fn(),
    FindByCityAndTech: vi.fn(),
    FindByCityByIds: vi.fn(),
    IncrementCount: vi.fn(),
    FindTopFivelocal: vi.fn(),
    FindByName: vi.fn(),
} as any as CitySearchRepository;

const MockRepositoryTech = {
    FindTopFiveGlobal: vi.fn()
} as any as TechnologyRepository

const sut = new CitySearchService(MockRepository,MockRepositoryTech)

describe("FindTopFiveLocal",  () => {
it("should return the most searched technology", async () => {
  
const TopFiveGlobal = [
    {
        "name": "React",
        "count": 17
    },
    {
        "name": "Rust",
        "count": 11
    },
    {
        "name": "C++",
        "count": 7
    },
    {
        "name": "PHP",
        "count": 2
    },
    {
        "name": "Java",
        "count": 0
    }
] as any

const TopFiveLocal = [
    {
        _id: "6514dcefe32199b344d57339",
        city: "São Paulo",
        technology: "React",
        count: 10
    },
    {
        _id: "6514dc64d46af76690b3b8b4",
        city: "Bauru",
        technology: "React",
        count: 5
    },
    {
        _id: "6514dc73d46af76690b3b8be",
        city: "Curitiba",
        technology: "React",
        count: 2
    }
] as any


const expected = { Top5Global: TopFiveGlobal, Top5PorLocal: TopFiveLocal}
vi.spyOn(MockRepositoryTech, "FindTopFiveGlobal").mockResolvedValue(TopFiveGlobal)
vi.spyOn(MockRepository, "FindTopFivelocal").mockResolvedValue(TopFiveLocal)

const result = await sut.FindTopFiveLocal()

expect(result).toStrictEqual(expected)
})




it("should return an error on the server if it doesn't pass within the try", async () => {
    const MockError = new Error("Something went wrong")
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR)

    vi.spyOn(MockRepositoryTech, "FindTopFiveGlobal").mockRejectedValue(MockError)

    const result = await sut.FindTopFiveLocal()

    expect(result).toStrictEqual(expected)

})
})