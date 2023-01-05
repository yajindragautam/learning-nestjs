import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';

// Creating Module
@Module({
    controllers:[AppController],
    imports: [MessagesModule] // Controller attached to module
})
export class AppModule{}