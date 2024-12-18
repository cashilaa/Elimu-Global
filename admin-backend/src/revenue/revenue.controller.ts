import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { CreateRevenueDto, UpdateRevenueDto } from './dto/revenue.dto';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.revenueService.findAll(query);
  }

  @Get('stats')
  getStats() {
    return this.revenueService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenueService.findOne(id);
  }

  @Post()
  create(@Body() createRevenueDto: CreateRevenueDto) {
    return this.revenueService.create(createRevenueDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
    return this.revenueService.update(id, updateRevenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenueService.remove(id);
  }
} 