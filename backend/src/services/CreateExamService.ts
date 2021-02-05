
import Exame from '../models/Exame';
import { getRepository } from 'typeorm';

interface Request {
    name: string,
}

class CreateExameService {
    public async execute({name}: Request): Promise<Exame> { 
        const examesRepository  = getRepository(Exame);
        const exame = examesRepository.create({name});
        await examesRepository.save(exame);

        return exame
    }
}

export default CreateExameService;