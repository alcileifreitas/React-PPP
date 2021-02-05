import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import CreateFuncionarioService from '../services/CreateFuncionarioService'
import {getRepository} from 'typeorm'
import AppError from '../errors/AppError';
import Funcionario from '../models/Funcionario';

const funcionarioRouter = Router(); // define uma variavel para inicializar o router
const createFuncionario = new CreateFuncionarioService(); 

funcionarioRouter.post('/', async(request : Request, response : Response) => { 
        const { name } = request.body;
        const funcionario = await createFuncionario.execute({ name }); 
        return response.json(funcionario);
});

funcionarioRouter.get('/', async (request: Request, response: Response) => { 
    const funcionariosRepository = getRepository(Funcionario);
    const funcionario = await funcionariosRepository.find(); 
    return response.json(funcionario); // retorna um json com o resultado obtido.
});

funcionarioRouter.get('/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const funcionarioRepository = getRepository(Funcionario);
    const funcionario = await funcionarioRepository.findOne( { id });

    return response.json(funcionario);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o funcionario)', 404);
    }
});


//ROTA DE DELETAR

funcionarioRouter.delete('/:id', async(request: Request, response: Response) => {
    try{
        const {id} = request.params;
        const funcionarioRepository = getRepository(Funcionario);
        const funcionario = await funcionarioRepository.findOne({ id });
        funcionarioRepository.remove(funcionario);
    
        response.json({ok: true});
    }
    catch(err) {
        throw new AppError('Funcionario inexistente!', 404)
    }
    
});
export default funcionarioRouter; // exporta a variavel