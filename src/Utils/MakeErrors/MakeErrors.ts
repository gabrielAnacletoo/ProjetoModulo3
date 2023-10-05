
interface MakeErrorsResponse {
    error: any;
    message: string | string[];
    status: number;
  }
  
  function MakeErrors(message: string, status: number) {
    return {
      error: true,
      message,
      status
    }
  }
  
  export { MakeErrors, MakeErrorsResponse }