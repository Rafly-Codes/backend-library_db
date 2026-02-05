import { Controller, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('Returns')
@ApiBearerAuth()

@Controller('returns')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post(':loanId')
  @ApiOperation({ summary: 'Memproses pengembalian buku' })
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  returnBook(@Param('loanId', ParseIntPipe) loanId: number) {
    return this.returnsService.processReturn(loanId);
  }
}
