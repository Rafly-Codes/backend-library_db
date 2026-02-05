import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('Loans')
@ApiBearerAuth()

@Controller('loans')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat peminjaman baru' })
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  create(@Body() dto: CreateLoanDto) {
    return this.loansService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Menampilkan seluruh data peminjaman' })
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  findAll() {
    return this.loansService.findAll();
  }
}
