import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

const locationInclude = {
  company: true,
  containers: true,
  locationBuildings: { include: { building: true } },
};

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLocationDto) {
    const existing = await this.prisma.location.findUnique({
      where: { address: dto.address },
    });
    if (existing) {
      throw new ConflictException(`Location "${dto.address}" already exists`);
    }

    return this.prisma.location.create({
      data: {
        address: dto.address,
        lat: dto.lat,
        lng: dto.lng,
        companyId: dto.companyId,
        containers: {
          create: dto.containers,
        },
        locationBuildings: {
          create: dto.buildingIds.map((id) => ({ buildingId: id })),
        },
      },
      include: locationInclude,
    });
  }

  async findAll() {
    return this.prisma.location.findMany({
      include: locationInclude,
      orderBy: { address: 'asc' },
    });
  }

  async findOne(id: number) {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: locationInclude,
    });
    if (!location) throw new NotFoundException(`Location #${id} not found`);
    return location;
  }

  async update(id: number, dto: UpdateLocationDto) {
    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      // Обновляем контейнеры — удаляем старые, создаём новые
      if (dto.containers) {
        await tx.container.deleteMany({ where: { locationId: id } });
      }

      // Обновляем привязки к домам — удаляем старые, создаём новые
      if (dto.buildingIds) {
        await tx.locationBuilding.deleteMany({ where: { locationId: id } });
      }

      return tx.location.update({
        where: { id },
        data: {
          ...(dto.address && { address: dto.address }),
          ...(dto.lat !== undefined && { lat: dto.lat }),
          ...(dto.lng !== undefined && { lng: dto.lng }),
          ...(dto.companyId && { companyId: dto.companyId }),
          ...(dto.containers && {
            containers: { create: dto.containers },
          }),
          ...(dto.buildingIds && {
            locationBuildings: {
              create: dto.buildingIds.map((bid) => ({ buildingId: bid })),
            },
          }),
        },
        include: locationInclude,
      });
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.location.delete({ where: { id } });
  }
}
