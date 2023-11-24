import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { firstLetterToLowerCase } from 'src/domain/utils';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['error', 'query', 'info', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      await this.$transaction(
        async (tx) => {
          await this.handleLog(params, tx);
        },
        {
          maxWait: 5000000000, // default: 2000
          timeout: 5500000000, // default: 5000
        },
      );

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }

  private async handleLog(params: Prisma.MiddlewareParams, tx: any) {
    const model = firstLetterToLowerCase(params.model);

    switch (params.action) {
      case 'update':
        if (!params.runInTransaction) {
          const oldValue: any = await ((tx as any)[model] as any).findUnique({
            where: {
              id: params.args.where.id,
            },
          });

          if (model === 'person') delete oldValue.password;

          await tx.log.create({
            data: {
              query: params.args,
              collection: model,
              action: 'update',
              oldValue: oldValue,
              newValue: params.args['data'],
            },
          });
        }
        break;
    }
  }
}
