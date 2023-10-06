import {app} from './Index'
import { DatabaseConfig } from './Database/Database'

const port = process.env.PORT || 3333;
DatabaseConfig.initialize()

if(DatabaseConfig){
    app.listen(port, () => console.log(`Server Running at port ${port}`));

}
