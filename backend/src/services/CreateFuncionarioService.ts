
import Funcionario from '../models/Funcionario';
import { getRepository } from 'typeorm';

interface Request {
    name: string
}

class CreateFuncionarioService {
    public async execute({name }: Request): Promise<Funcionario> { 
        const funcionarioRepository  = getRepository(Funcionario);
        const funcionario = funcionarioRepository.create({name});
        await funcionarioRepository.save(funcionario);

        return funcionario
    }
}

export default CreateFuncionarioService;