import AgenteRisco from './../models/AgenteRisco';

import { getRepository } from 'typeorm';

interface Request {
    name: string
}

class CreateAgenteRiscoService {
    public async execute({name }: Request): Promise<AgenteRisco> { 
        const agenteRiscoRepository  = getRepository(AgenteRisco);
        const agente = agenteRiscoRepository.create({name});
        await agenteRiscoRepository.save(agente);

        return agente
    }
}

export default CreateAgenteRiscoService;