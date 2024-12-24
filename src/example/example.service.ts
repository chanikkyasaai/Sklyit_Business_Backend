import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
    getHi(): string {
        return 'Hi';
    }
}
