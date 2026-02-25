import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Category } from "./generated/client";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const products = [
    {
      name: "Dragonborn Warlord",
      description:
        "Highly detailed 32mm resin miniature of a Dragonborn warlord with greatsword and ornate armor. Perfect for fantasy RPG campaigns.",
      price: 5,
      picture: "http://res.cloudinary.com/dkiringlk/image/upload/v1771326924/us75ly6yhcbr3rytbcet.jpg",
      category: Category.FANTASY,
      timeToDelivery: "3-5 business days",
    },
    {
      name: "Elven Arcane Archer",
      description:
        "Elegant elven archer sculpt with dynamic cloak and magical energy effect on bow. Ideal for high fantasy settings.",
      price: 6,
      picture: "http://res.cloudinary.com/dkiringlk/image/upload/v1771326924/us75ly6yhcbr3rytbcet.jpg",
      category: Category.FANTASY,
      timeToDelivery: "2-4 business days",
    },
    {
      name: "Dwarven Forge Master",
      description:
        "Stocky dwarven blacksmith miniature holding a hammer and shield, with intricate beard details.",
      price: 7,
      picture: "http://res.cloudinary.com/dkiringlk/image/upload/v1771326924/us75ly6yhcbr3rytbcet.jpg",
      category: Category.FANTASY,
      timeToDelivery: "4-6 business days",
    },
    {
      name: "Void Marine Shock Trooper",
      description:
        "Sci-fi power-armored soldier equipped with plasma rifle and tactical base.",
      price: 8,
      picture: "http://res.cloudinary.com/dkiringlk/image/upload/v1771326924/us75ly6yhcbr3rytbcet.jpg",
      category: Category.SCIFI,
      timeToDelivery: "3-5 business days",
    },
    {
      name: "Cyberpunk Bounty Hunter",
      description:
        "Futuristic bounty hunter miniature with dual pistols, trench coat, and augmented visor.",
      price: 9,
      picture: "http://res.cloudinary.com/dkiringlk/image/upload/v1771326924/us75ly6yhcbr3rytbcet.jpg",
      category: Category.SCIFI,
      timeToDelivery: "2-3 business days",
    },
    {
      name: "Alien Hive Queen",
      description:
        "Large-scale sci-fi monster miniature with sprawling limbs and highly detailed biomechanical textures.",
      price: 10,
      picture: "http://res.cloudinary.com/dkiringlk/image/upload/v1771326924/us75ly6yhcbr3rytbcet.jpg",
      category: Category.SCIFI,
      timeToDelivery: "5-8 business days",
    },
    {
      name: "Necromancer of the Black Spire",
      description:
        "Dark sorcerer miniature surrounded by swirling necrotic energy and skull-adorned robes.",
      price: 11,
      picture: "http://res.cloudinary.com/dkiringlk/image/upload/v1771326924/us75ly6yhcbr3rytbcet.jpg",
      category: Category.FANTASY,
      timeToDelivery: "3-6 business days",
    },
    {
      name: "Starship Mechanic Droid",
      description:
        "Utility repair droid miniature with articulated arms and detailed sci-fi base.",
      price: 12,
      picture: "http://res.cloudinary.com/dkiringlk/image/upload/v1771326924/us75ly6yhcbr3rytbcet.jpg",
      category: Category.SCIFI,
      timeToDelivery: "2-4 business days",
    },
  ];

  try {
    for (const product of products) {
      await prisma.product.create({
        data: product
      });
    }

    console.log("Seeded database.");
  } catch (err) {
    console.log(err)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })