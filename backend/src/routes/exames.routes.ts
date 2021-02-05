import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import CreateExamService from '../services/CreateExamService'
import {getRepository} from 'typeorm'
import AppError from '../errors/AppError';
import Exame from '../models/Exame';

const exameRouter = Router(); // define uma variavel para inicializar o router
const createExame = new CreateExamService(); 

exameRouter.post('/', async(request : Request, response : Response) => { 
        const { name } = request.body;
        const exame = await createExame.execute({ name }); 
        return response.json(exame);
});

exameRouter.get('/', async (request: Request, response: Response) => { 
    const examesRepository = getRepository(Exame);
    const exame = await examesRepository.find(); 
    return response.json(exame); // retorna um json com o resultado obtido.
});

exameRouter.get('/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const examesRepository = getRepository(Exame);
    const exame = await examesRepository.findOne( { id });

    return response.json(exame);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o exame)', 404);
    }
});


//ROTA DE DELETAR

exameRouter.delete('/:id', async(request: Request, response: Response) => {
    try{
        const {id} = request.params;
        const examesRepository = getRepository(Exame);
        const exame = await examesRepository.findOne({ id });
        examesRepository.remove(exame);
    
        response.json({ok: true});
    }
    catch(err) {
        throw new AppError('Exame inexistente!', 404)
    }
    
});
export default exameRouter; // exporta a variavel