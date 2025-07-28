import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
        const newUser = this.usersRepository.create(user) // Creates a new entity instance (not yet saved to DB)
        console.log(newUser)
        return this.usersRepository.save(newUser); // Saves the instance to the database        
    }

    async findById(id: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ id })
    }

    async updateUser(id: string, user: Partial<User>): Promise<boolean> {
        const updateResult = await this.usersRepository.update(id, user)

        if (updateResult.affected > 0) {
            return true
        }
        return false
    }

    async delete(id: string): Promise<boolean> {
        const deleteResult = await this.usersRepository.delete({ id })
        
        if (deleteResult.affected > 0) {
            return true
        }
        return false
    }
}