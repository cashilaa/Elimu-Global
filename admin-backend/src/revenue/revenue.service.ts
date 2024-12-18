import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Revenue } from './schemas/revenue.schema';
import { CreateRevenueDto, UpdateRevenueDto } from './dto/revenue.dto';

@Injectable()
export class RevenueService {
  constructor(@InjectModel(Revenue.name) private revenueModel: Model<Revenue>) {}

  async findAll(filters: any = {}) {
    return this.revenueModel.find(filters).exec();
  }

  async findOne(id: string) {
    const revenue = await this.revenueModel.findById(id).exec();
    if (!revenue) {
      throw new NotFoundException('Revenue record not found');
    }
    return revenue;
  }

  async create(createRevenueDto: CreateRevenueDto) {
    const newRevenue = new this.revenueModel(createRevenueDto);
    return newRevenue.save();
  }

  async update(id: string, updateRevenueDto: UpdateRevenueDto) {
    const updatedRevenue = await this.revenueModel
      .findByIdAndUpdate(id, updateRevenueDto, { new: true })
      .exec();
    if (!updatedRevenue) {
      throw new NotFoundException('Revenue record not found');
    }
    return updatedRevenue;
  }

  async remove(id: string) {
    const deletedRevenue = await this.revenueModel.findByIdAndDelete(id).exec();
    if (!deletedRevenue) {
      throw new NotFoundException('Revenue record not found');
    }
    return deletedRevenue;
  }

  async getStats() {
    const [totalRevenue, monthlyRevenue] = await Promise.all([
      this.revenueModel.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      this.revenueModel.aggregate([
        {
          $match: {
            paymentDate: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
            }
          }
        },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);

    return {
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyRevenue: monthlyRevenue[0]?.total || 0
    };
  }
} 