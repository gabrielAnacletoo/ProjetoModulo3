import { Model, Document, PaginateModel } from 'mongoose';
import { MakeErrors, MakeErrorsResponse } from '../../../Utils/MakeErrors/MakeErrors';
import { STATUS_CODE } from '../../../Utils/StatusCode/StatusCode';
import { JobsDocument, Jobs } from '../Entitie/Jobs';
import mongoosePaginate from 'mongoose-paginate-v2';

interface Filter {
  [key: string]: string;
}

type FilterValue = string | string[];



type CaseInsensitiveFilter = {
  [key: string]: {
    $regex: string;
    $options: string;
  } | {
    $in: RegExp[];
  };
};

class JobsRepository {
  constructor(private model: PaginateModel<JobsDocument>) { }

  async Create(data: JobsDocument) {
    try {
      return await this.model.create(data);
    } catch (error: any) {
      return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  async FindById(id: string) {
    try {
      return await this.model.findById(id);
    } catch (error: any) {
      return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  // async Filter(filter: Filter) {
 // Objeto vazio do tipo key: string e tipo regex 
    // significa que cada key do objeto é do tipo string 
    // e cada key tem 2 tipos regex e options
    // const caseInsensitiveFilter: { [key: string]: { $regex: string; $options: string } } = {};
     /* laço for pra cada key de filter
     o objeto vazio recebe as keys de filter com regex e options 'i' pra aceitar uppercase e lowercaser
     no laço for ele vai iterar sobre cade propriedade do filter e salvar no objeto vazio
     ex: filter veio cidade sp e vaga desenvolvedor de software
     entao objeto vazio sera
     const caseInsensitiveFilter = {
  city: {
    $regex: 'São Paulo',
    $options: 'i',
  },
  title: {
    $regex: 'Desenvolvedor de Software',
    $options: 'i',
  },
} */     
  //   for (const key in filter) {
  //     caseInsensitiveFilter[key] = {
  //       $regex: filter[key],
  //       $options: 'i',
  //     };
  //   }
  //   return await this.model.find(caseInsensitiveFilter);
  // }


  async Filter(filter: Filter) {
    const caseInsensitiveFilter: CaseInsensitiveFilter = {};
  
    for (const key in filter) {
      const filterValue = filter[key];
  
      if (key === "technology") {
         // Array.isArray(filter[key]) verifica se o valor da chave key no filter é um array.
        // Se for um array ele usa esse array
        // Se for um valor apenas usa ele mas como array ainda sempre sera array
        const technolodyNames = Array.isArray(filterValue) ? filterValue : [filterValue];
  
        // $in: Este operador aceita um array e verifica se pelo menos um deles está em um objeto
        caseInsensitiveFilter[key] = {
          $in: technolodyNames.map(name => new RegExp(`^${name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i')),
        };
      } else {
        caseInsensitiveFilter[key] = {
          $regex: filterValue,
          $options: 'i',
        };
      }
    }
  
    return await this.model.find(caseInsensitiveFilter);
  }
  
  
  async Pagination(page: number, limit: number) {
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };
    return await this.model.paginate({}, options);
  }

  async FindAll(){
    return await this.model.find();
  }
}

export { JobsRepository };
