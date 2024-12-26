import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World this is Ragavan,This is my first NEST APP!';
  }
}
