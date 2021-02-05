import PPP from '../models/PPP';
import { getRepository } from 'typeorm'

interface Request { 
    medic_name: string,
    func_name: string,
    exam_name: string,
    agent_name: string,
    description: string,
    image: string,
 }

class CreatePPPService {
    public async execute({ medic_name, func_name, exam_name, agent_name, image, description} : Request): Promise<PPP> {
        const pppRepository = getRepository(PPP);


         const ppp = pppRepository.create({ // O metodo create só cria uma instancia no banco de dados, mas não salva.
         medic_name,
         func_name,
         exam_name,
         agent_name,
         description,
         image
        }); 

        await pppRepository.save(ppp); 

        return ppp;
    }
}


export default CreatePPPService;