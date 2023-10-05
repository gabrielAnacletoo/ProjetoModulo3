import {app} from './Index'

const port = process.env.PORT;

app.listen(port, () => console.log(`Server Running at port ${port}`));
