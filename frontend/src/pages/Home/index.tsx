import React, {useState, useEffect, FormEvent, useRef} from 'react';
import api from '../../services/Api';
import Header from '../../Components/Header';
import FavoriteList from '../../Components/FavoriteList';
import { IPPP, IFuncionario, IExames, IAgentRisco } from '../../services/Interfaces';
import Container, {Card} from './styles';
import { Combobox } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment'
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en')
momentLocalizer();

interface IMedico {
    id: string;
    name: string;
    speciality: string;
}
interface FileProps {
    file: File;
    name: string;
    readableSize: string;
  }

const Home: React.FC = () => {
    const [ppp, setPPP] = useState<IPPP[]>([]);
    const [exames, setExames] = useState<IExames[]>([]);
    const [medico, setMedico] = useState<IMedico[]>([]);
    const [agente, setAgente] = useState<IAgentRisco[]>([]);
    const [selectedMed, setSelectedMed] = useState<IMedico[]>([]);
    const [funcionario, setFuncionario] = useState<IFuncionario[]>([]);

    const [selectedFile, setSelectedFile] =useState('');
    const [selectedFileA, setSelectedFileA] =useState('');


    const [medicoValue, setMedicoValue] = useState<string>('');
    const [examesValue, setExamesValue] = useState<string>('');
    const [funcionarioValue, setFuncionarioValue] = useState<string>('');
    const [agenteValue, setAgenteValue] = useState<string>('');
    const [descriptionValue, setDescriptValue] = useState<string>('');
    const [descriptionValueA, setDescriptValueA] = useState<string>('');

    const [alterar, setAlterar] = useState<boolean>(true);
    const [alterarID, setAlterarID] = useState<string>('');

   useEffect(()=> {
        api.get('ppp').then(response => {
            setPPP(response.data);
        });   
        api.get('medicos').then(response => {
            setMedico(response.data);
        });
        api.get('funcionario').then(response => {
            setFuncionario(response.data);
        });    
        api.get('exames').then(response => {
            setExames(response.data);
        });  
        api.get('agentes').then(response => {
            setAgente(response.data);
        }); 
   }, []);

    function handleSelectedMedico(value: IMedico) {
        setSelectedMed([value]);
        setMedicoValue(value.name);
    }

    function handleFuncionarioValue(value: IFuncionario) {
        setFuncionarioValue(value.name);
    }

    function handleExameValue(value: IExames) {
        setExamesValue(value.name);
    }

    function handleAgenteValue(value: IAgentRisco) {
        setAgenteValue(value.name);
    }

    async function handleSubmit(e: FormEvent) {
        const formData = new FormData();
		formData.append('image', selectedFile);
        formData.append('func_name', funcionarioValue);
        formData.append('medic_name', medicoValue);
        formData.append('exam_name', examesValue);
        formData.append('agent_name', agenteValue);
        formData.append('description', descriptionValue);

        await api.post('ppp', formData);
        }
    
    async function handleDelete(id: string) {
        await api.delete('ppp/' + id);
        setPPP(ppp.filter(ppp => ppp.id !== id));
    }

    async function handleAlterate(id: string) {
        const formData = new FormData();
		formData.append('image', selectedFileA);
        formData.append('func_name', funcionarioValue);
        formData.append('medic_name', medicoValue);
        formData.append('exam_name', examesValue);
        formData.append('agent_name', agenteValue);
        formData.append('description', descriptionValueA);
        await api.patch('ppp/' + id, formData);
        setAlterar(true);
        setAlterarID('');
    }

  
    return(
        <>
            <Header/>
            <FavoriteList title='CADASTRO DE PPP' title2='LISTAGEM DOS PPP'>
                <Container> 
                <form onSubmit={handleSubmit}>
                    <Combobox
                        data={funcionario}
                        textField='name'
                        valueField='name'
                        placeholder='Funcionario'
                        onChange={handleFuncionarioValue}
                        
                    />

                    <Combobox
                        data={medico}
                        textField='name'
                        onChange={handleSelectedMedico}
                        valueField='name'
                        placeholder='Médico'
                    />

                    <Combobox
                        data={exames}
                        onChange={handleExameValue}
                        textField='name'
                        valueField='name'
                        placeholder='Exame'
                    />

                    <Combobox
                        data={agente}
                        onChange={handleAgenteValue}
                        textField='name'
                        valueField='name'
                        placeholder='Agentes de Risco'
                    />

                    <input
                    value={descriptionValue}
                    onChange={e => setDescriptValue(e.target.value)}
                    placeholder="Descrição"
                    />

                    <input 
                    type="file" 
                    name="file" 
                    onChange={(event: any) => {
                        setSelectedFile(event.target.files[0]);
                    }} />

                <button className='button' type='submit'>
                    Cadastrar PPP
                </button>
                
                </form>
                </Container>
                
            </FavoriteList>
            
            <Container >
                {ppp.map(ppp => 
                <Card>
                    <div key={ppp.id}>
                    <form onSubmit={() => {handleAlterate(ppp.id)}}>
                            <img src={ppp.image}/>
                            <p>Funcionario: </p>
                            <Combobox
                            data={funcionario}
                            readOnly={alterar}
                            onChange={handleFuncionarioValue}
                            textField='name'
                            valueField='name'
                            defaultValue={ppp.func_name}
                            />
                           <p>Médico: </p>
                           <Combobox
                            readOnly={alterar}
                            data={medico}
                            onChange={handleSelectedMedico}
                            textField='name'
                            defaultValue={ppp.medic_name}
                            />
                            <p>Exames: </p>
                            <Combobox
                            readOnly={alterar}
                            data={exames}
                            onChange={handleExameValue}
                            textField='name'
                            defaultValue={ppp.exam_name}
                         />
                         <p>Agente de Risco: </p>
                         <Combobox
                            readOnly={alterar}
                            data={agente}
                            onChange={handleAgenteValue}
                            textField='name'
                            defaultValue={ppp.agent_name}
                         />
                         <p>Descrição: </p>
                         <input readOnly={alterar} 
                          defaultValue={ppp.description}
                          onChange={e => setDescriptValueA(e.target.value)}
                          />
                        <input 
                        readOnly={alterar}
                        type="file" 
                        name="file" 
                        onChange={(event: any) => {
                        setSelectedFileA(event.target.files[0]);
                    }} />

                      {alterar == false && alterarID == ppp.id &&
                       <button type="submit">Confirmar</button>
                       }
                        </form>
                       </div>   
                       
                       <button onClick={() => handleDelete(ppp.id)}>Excluir</button>
                       <button onClick={() => {
                           setAlterar(false)
                           setAlterarID(ppp.id);
                       }}>Alterar</button>
                       
                </Card>    
                )}
            </Container>

           
        </>
    )
}


export default Home;