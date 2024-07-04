import { db } from 'src/db';
import { Request } from 'src/entities/request.entity';

export const requestRepository = db.getRepository(Request);
