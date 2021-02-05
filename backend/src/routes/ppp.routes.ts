import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import PPP from '../models/PPP';
import {getRepository} from 'typeorm';
import CreatePPPService from '../services/CreatePPPService';
import AppError from '../errors/AppError';
import multer from 'multer';
import uploadConfig from '../config/upload';
const upload = multer(uploadConfig); // Define a variavel que vai inicializar o multer passando como parametro a upload config



const pppRouter = Router();
const createPPP = new CreatePPPService(); 

pppRouter.post('/', upload.single('image'), async(request : Request, response : Response) => { 
    const { medic_name, func_name, exam_name , agent_name, description} = request.body;
    const image = `http://localhost:3333/files/${request.file.filename}`;

    const ppp = await createPPP.execute({ medic_name, agent_name, description, exam_name, func_name, image}); 
    return response.json(ppp);
});

pppRouter.get('/', async (request: Request, response: Response) => { 
    const pppRepository = getRepository(PPP);
    const ppp = await pppRepository.find(); 
    return response.json(ppp); // retorna um json com o resultado obtido.
});

pppRouter.get('/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const pppRepository = getRepository(PPP);
    const ppp = await pppRepository.findOne( { id });

    return response.json(ppp);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar a consulta)', 404);
    }
});


//ALTERAR
pppRouter.patch('/:id',  upload.single('image'), async(request: Request, response: Response) => { 
    try {
            const { id } = request.params;
            const pppRepository = getRepository(PPP);
            const ppp = await pppRepository.findOne({ id });
            
     
            const {func_name, medic_name, exam_name, agent_name, description} = request.body;
            const image = `http://localhost:3333/files/${request.file.filename}`;
    
            ppp.func_name = func_name;
            ppp.medic_name = medic_name;
            ppp.exam_name = exam_name;
            ppp.agent_name = agent_name;
            ppp.description = description;
            ppp.image = image;

            await pppRepository.save(ppp); // Salva no banco de dados     
            return response.json(ppp);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar a consulta)', 404);
    }
    
});

pppRouter.delete('/:id', async(request: Request, response: Response) => {
    const {id} = request.params;
    const pppRepository = getRepository(PPP);
    const ppp = await pppRepository.findOne({ id });
    pppRepository.remove(ppp);

    response.json({ok: true});
});

export default pppRouter; // exporta a variavel