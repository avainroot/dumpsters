import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCompanyDto) {
    const existing = await this.prisma.company.findUnique({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException(`Company "${dto.name}" already exists`);
    }
    return this.prisma.company.create({ data: dto });
  }

  async findAll() {
    return this.prisma.company.findMany({
      include: { _count: { select: { locations: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { locations: true },
    });
    if (!company) throw new NotFoundException(`Company #${id} not found`);
    return company;
  }

  async update(id: number, dto: UpdateCompanyDto) {
    await this.findOne(id);
    return this.prisma.company.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.company.delete({ where: { id } });
  }
}
