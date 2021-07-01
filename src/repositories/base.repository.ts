import { Document, Model } from 'mongoose';
import { IEmployee } from '../interfaces/IEmployee';

export abstract class BaseRepository<T extends Document> {

    private _entites: Model<any>

    constructor(entities: Model<T>){
        this._entites = entities;
    }

    getAll = async (): Promise<T[]> => {
        return await this._entites.find();
    }
    getOne = async (id: any): Promise<T> => {
        return await this._entites.findById(id);
    }
    create = async (doc: any): Promise<any> => {
        const createdEntity = new this._entites(doc);
        return await createdEntity.save();
    }
}