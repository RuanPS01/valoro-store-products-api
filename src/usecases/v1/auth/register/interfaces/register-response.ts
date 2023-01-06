import { Types } from 'mongoose';

export interface RegisterResponse {
  id: Types.ObjectId;
  ownerUserEmail: string;
}
