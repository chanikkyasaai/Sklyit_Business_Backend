import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}
    @Get()
    getHi(): string {
        return this.exampleService.getHi();
    }
}
