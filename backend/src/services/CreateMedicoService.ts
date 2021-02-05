
import Medico from '../models/Medico';
import { getRepository } from 'typeorm';

interface Request {
    name: string,
}

class CreateMedicoService {
    public async execute({name}: Request): Promise<Medico> { 
        const medicosRepository  = getRepository(Medico);
        const medico = medicosRepository.create({name});
        await medicosRepository.save(medico);

        return medico
    }
}

export default CreateMedicoService;