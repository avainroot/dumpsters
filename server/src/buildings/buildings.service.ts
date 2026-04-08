import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBuildingDto) {
    const existing = await this.prisma.building.findUnique({
      where: { address: dto.address },
    });
    if (existing) {
      throw new ConflictException(`Building "${dto.address}" already exists`);
    }
    return this.prisma.building.create({ data: dto });
  }

  // Поиск или создание — удобно для фронта (autocomplete + создание на лету)
  async findOrCreate(address: string) {
    return this.prisma.building.upsert({
      where: { address },
      update: {},
      create: { address },
    });
  }

  async findAll(search?: string) {
    return this.prisma.building.findMany({
      where: search ? { address: { contains: search } } : undefined,
      orderBy: { address: 'asc' },
      take: 5,
    });
  }

  async findOne(id: number) {
    const building = await this.prisma.building.findUnique({
      where: { id },
      include: {
        locationBuildings: { include: { location: true } },
      },
    });
    if (!building) throw new NotFoundException(`Building #${id} not found`);
    return building;
  }

  async update(id: number, dto: UpdateBuildingDto) {
    await this.findOne(id);
    return this.prisma.building.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.building.delete({ where: { id } });
  }
}
