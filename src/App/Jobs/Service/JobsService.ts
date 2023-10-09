import { TechnologyRepository } from "../../Technology/Repository/TechnologyRepository";
import { JobsRepository } from "../Repository/JobsRepository";
import { CitySearchRepository } from "../../CitySearch/Repository/CitySearchRepository";
import { CitySearchDocument } from "../../CitySearch/Entitie/CitySearch";
import { STATUS_CODE } from "../../../Utils/StatusCode/StatusCode";
import { MakeErrors } from "../../../Utils/MakeErrors/MakeErrors";
import { UserRepository } from "../../User/Repository/UserRepository";
import JWT from "jsonwebtoken";
;

interface Filter {
    [key: string]: string;
}

interface Incremented {
    error?: boolean;
    message?: string;
    status?: number;
    createdAt?: NativeDate;
    updatedAt?: NativeDate;
    count?: number;
    name?: string | undefined;
}



class JobService {
    constructor(
        private Repository: JobsRepository,
        private TechRepository: TechnologyRepository,
        private citysearchRepository: CitySearchRepository,
        private userRepository: UserRepository,
    ) { }

    async CreateFromService(data: JobsDocument) {
        try {
            const CretedJob = await this.Repository.Create(data);
            if (!CretedJob) {
                return MakeErrors('Essa vaga não pode ser criada, preencha corretamente', STATUS_CODE.BAD_REQUEST)
            }
            return CretedJob;
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async FilterFromService(filter: Filter, token: string) {
        const [, tokenNovo] = token.split(" ");
        const decoded: any = JWT.decode(tokenNovo);
        const { _id } = decoded._doc;
        try {
            const Result = await this.Repository.Filter(filter)

            if (filter.city && filter.technology) {
                const ExistingSearch = await this.citysearchRepository.FindByCityAndTech(filter.city, filter.technology)
                if (ExistingSearch) {
                    const ResultSearch = await this.citysearchRepository.IncrementCount(ExistingSearch._id.toString())

                    return {
                        Incrementos: ResultSearch,
                        Consulta: Result,
                        Message: 'Registros existentes incrementados com sucesso'
                    }
                } else {
                    const NewSearch = { city: filter.city, technology: filter.technology }
                    const ResultNewSearch = await this.citysearchRepository.Create(NewSearch as unknown as CitySearchDocument)
                    return {
                        Incrementos: ResultNewSearch,
                        Consulta: `Não existem vagas em ${filter.city} com tecnlogia ${filter.technology}.`,
                        Message: "Registro criado."
                    }
                }
            }

            if (filter.technology) {
                let IncrementedTechnology: (Incremented | null)[] = [];
                const TechFind = await this.TechRepository.FindByName(filter.technology)
                if (!TechFind) {
                    return MakeErrors("Tecnologia não encontrada", STATUS_CODE.NOT_FOUND);
                }
                if (TechFind) {
                    for (const tech of TechFind) {
                        const existingTechID = tech._id.toString();
                        const incremented = await this.TechRepository.IncrementCount(existingTechID)
                        IncrementedTechnology.push(incremented)
                    }
                    if (Result.length === 0) {
                        return { Incrementos: IncrementedTechnology, Consulta: `Não existem vagas para ${filter.technology}` }
                    }
                    return {
                        Incremento: IncrementedTechnology,
                        Consulta: Result
                    }
                }
            }

            //Salva a pesquisa no histórico do usuário
            const valuesToSave: string[] = [];

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    const value = filter[key];
                    if (typeof value === 'string') {
                        valuesToSave.push(value);
                    }
                }
            }
            const SaveHistory = await this.userRepository.AddHistory(valuesToSave, _id);
            return Result;
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }


    async Pagination(page: number, limit: number) {
        try {
            const result = await this.Repository.Pagination(page, limit)
            return result;
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async FindAll() {
        try {
            const result = await this.Repository.FindAll()
            return result;
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }
}

export { JobService }