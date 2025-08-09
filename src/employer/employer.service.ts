import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import {Repository} from "typeorm";
import {Employer} from "./entities/employer.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class EmployerService {
  constructor(
      @InjectRepository(Employer)
      private readonly employerRepository: Repository<Employer>,
  ) {}
  async create(createEmployerDto: CreateEmployerDto) {
    const extingAdmin = await this.employerRepository.createQueryBuilder('employer')
        .where('employer.email = :email', { email: createEmployerDto.email })
        .getOne();
    if (extingAdmin) {
      throw new ConflictException('Cet employer existe deja.');
    }
    return await this.employerRepository.save(createEmployerDto)
  }

  async findAll() {
    return await this.employerRepository
        .createQueryBuilder('employer')
        .getMany();
  }

  async findOne(id: string) {
    const emp = await this.employerRepository
        .createQueryBuilder('employer')
        .where('employer.id = :id', {id: id})
        .getOne();
    if (!emp) throw new NotFoundException('user not found.');
    return emp;
  }

  async update(id: string, updateEmployerDto: UpdateEmployerDto) {
    const {email, firstName, lastName, poste, Employed_date} = updateEmployerDto;
    try {
      const emp = await this.findOne(id);
      emp.email = email;
      emp.firstName = firstName;
      emp.lastName = lastName;
      emp.Employed_date = Employed_date;
      emp.poste = poste;
      emp.updatedAt = new Date();
      return await this.employerRepository.save(emp);
    } catch (err) {
      throw new BadRequestException('Bad request:', err.message);
    }
  }

  async remove(id: string) {
     this.employerRepository.remove(await this.findOne(id));
     return {
       message: 'Employer suprimer avec succes.'
     }
  }
}
