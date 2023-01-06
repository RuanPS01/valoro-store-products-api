import { UsecasesProxyModule } from '@external/dependency-injection-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { ListController } from './list/list.controller';
import { RegisterController } from './register/register.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ListController, RegisterController],
})
export class ControllersModule {}
