import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import CreateAgenteRiscoService from '../services/CreateAgenteRiscoService'
import {getRepository} from 'typeorm'
import AppError from '../errors/AppError';
import AgenteRisco from '../models/AgenteRisco';

const agenteRouter = Router(); // define uma variavel para inicializar o router
const createAgente = new CreateAgenteRiscoService(); 

agenteRouter.post('/', async(request : Request, response : Response) => { 
        const { name } = request.body;
        const agente = await createAgente.execute({ name }); 
        return response.json(agente);
});

agenteRouter.get('/', async (request: Request, response: Response) => { 
    const agentesRepository = getRepository(AgenteRisco);
    const agente = await agentesRepository.find(); 
    return response.json(agente); // retorna um json com o resultado obtido.
});

agenteRouter.get('/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const agentesRepository = getRepository(AgenteRisco);
    const agente = await agentesRepository.findOne( { id });

    return response.json(agente);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o exame)', 404);
    }
});


//ROTA DE DELETAR

agenteRouter.delete('/:id', async(request: Request, response: Response) => {
    try{
        const {id} = request.params;
        const agentesRepository = getRepository(AgenteRisco);
        const agente = await agentesRepository.findOne({ id });
        agentesRepository.remove(agente);
    
        response.json({ok: true});
    }
    catch(err) {
        throw new AppError('Exame inexistente!', 404)
    }
    
});
export default agenteRouter; // exporta a variavel