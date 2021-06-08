import { Document, Model } from 'mongoose';
import { IEmployee } from '../interfaces/IEmployee';

export abstract class BaseRepository<T extends Document> {

    private _entites: Model<any>

    constructor(entities: Model<T>){
        this._entites = entities;
    }

    async getAll (): Promise<T[]> {
        return await this._entites.find();
    }
    async getOne(id: any): Promise<T> {
        return await this._entites.findById(id);
    }
    async create(doc: T): Promise<any> {
        const createdEntity = new this._entites(doc);
        return await createdEntity.save();
    }
}