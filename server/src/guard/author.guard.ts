import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    function urlContains(url, value) {
      const result = url.includes(value);
      console.log('url', url)
      console.log('result', result)
      if (result) {
        return true
      } else {
        return false
      }
    }
    
    
    let entity;

    switch (true) {
      case urlContains(request.url, 'transaction'):
        entity = await this.transactionService.findOne(id);
        break;
      case urlContains(request.url, 'category'):
        entity = await this.categoryService.findOne(id);
        break;
      default:
        throw new NotFoundException('Something went wrong...');
        break;
    }

    const user = request.user;

    if (entity && user && entity.user.id === user.id) {
      return true;
    }
    return false;
  }
}
