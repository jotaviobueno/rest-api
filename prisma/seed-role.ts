import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(roles: string[]) {
  return prisma.$transaction(
    async (tx) => {
      await Promise.all(
        roles.map(async (role) => {
          const roleAlreadyExist = await tx.role.findFirst({
            where: {
              name: role,
            },
          });

          if (roleAlreadyExist) return roleAlreadyExist;

          await tx.role.create({
            data: {
              name: role,
              deletedAt: null,
            },
          });
        }),
      );
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 550000, // default: 5000
    },
  );
}

const roles = ['ADMIN', 'DEV', 'FINANCE', 'CUSTOMER', 'USER'];

main(roles)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
