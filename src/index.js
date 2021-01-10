require('dotenv').config();
const app = require('./server');
require('./database');
/*







//routes




//archivos de routes






*/

//servidor en listening

app.listen(app.get('port'), ()=>{
    console.log('servidor corriendo en el puerto', app.get('port'));
});
