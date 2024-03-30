import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      type: createTransactionDto.type,
      amount: createTransactionDto.amount,
      category: {
        id: +createTransactionDto.category,
      },
      user: {
        id,
      },
    };

    console.log('newTransaction', newTransaction)
    if(!newTransaction) throw new BadRequestException('Something went wrong!')
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(userId: number) {
    return await this.transactionRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        category: true,
      },
    })
  }

  async findOne(id: number) {
    const transaction = await this.isExistTransactionById(id);
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.isExistTransactionById(id);
    if (!transaction) throw new NotFoundException('Transaction not found');
    return await this.transactionRepository.update(id, updateTransactionDto)
  }

  async remove(id: number) {
    const transaction = await this.isExistTransactionById(id);
    if (!transaction) throw new NotFoundException('Transaction not found');
    return await this.transactionRepository.delete(id)
  }

  async findAllbyType(id: number, type: string) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: {id},
        type
      }
    })
    const total = transaction.reduce((acc, obj) => acc + obj.amount, 0)
    return total
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: {id}
      },
      relations: {
        category: true,
        user: true
      },
      order: {
        createdAt: 'DESC'
      },
      take: limit,
      skip: (page -1) * limit
    })
    return transaction
  }

  async isExistTransactionById(id: number) {
    return await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: { user: true, category: true },
    });
  }
}
