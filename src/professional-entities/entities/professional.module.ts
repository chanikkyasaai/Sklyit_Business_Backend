import { TypeOrmModule } from "@nestjs/typeorm";
import { Professional } from "./professional.entity";
import { Module } from "@nestjs/common";
import { Service } from "./service.entity";
import { ServiceAvailability } from "./service_availability.entity";

@Module({
    imports: [
      TypeOrmModule.forFeature([Professional, Service, ServiceAvailability]),
    ],
  })
  export class ProfessionalModule {}