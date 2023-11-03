import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(roles: string[]) {
  return prisma.$transaction(
    async (tx) => {
      for (const role of roles) {
        const roleAlreadyExist = await tx.role.findFirst({
          where: {
            name: role,
          },
        });

        if (roleAlreadyExist) throw new Error('Role already ' + role);

        await tx.role.create({
          data: {
            name: role,
          },
        });
      }
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 550000, // default: 5000
    },
  );
}

const roles = ['ADMIN', 'DEV', 'FINANCE', 'USER'];

main(roles)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
