import multer from 'multer'; // importa o multer
import path from 'path'; // importa o path do node.js
import crypto from 'crypto'; // importa o crypto para usarmos o metodo randombytes do node.js


const tempFolder = path.resolve(__dirname, '..', '..', 'temp'); // caminho aonde vamos salvar as imagens dos eventos.

export default {
    directory: tempFolder, // Adicionamos esse campo, para facilitar pegar o caminho aonde as imagens dos eventos vao ficar salvas
    storage: multer.diskStorage({
        // define o destino da pasta dos arquivos || __dirname pega o caminho inteiro do computador ate a pasta config
        destination: tempFolder,
        // define o nome do arquivo, gera um hash de 10 bytes e transforma em string hexdecimal
        // depois junta o hash com o nome original do arquivo que estava no pc do usuario
        // isso é para que seja dificil ocorrer duplicação.
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName); // Passa null no primeiro parametro caso aconteça um erro, e no segundo passa o nome do arquivo
        },
    }), // Por enquanto iremos usar o propria estrutura do app para armazenar os arquivos.
}