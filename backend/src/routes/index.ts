import { Router } from 'express';
import medicosRouter from './medicos.routes'
import funcionariosRouter from './funcionarios.routes'
import pppRouter from './ppp.routes'
import exameRouter from './exames.routes';
import agenteRouter from './agentes.routes';

const routes = Router();
routes.use('/medicos', medicosRouter);
routes.use('/funcionario', funcionariosRouter);
routes.use('/exames', exameRouter);
routes.use('/agentes', agenteRouter);
routes.use('/ppp', pppRouter);
export default routes;
