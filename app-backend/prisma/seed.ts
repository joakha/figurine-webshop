import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Category } from "./generated/client.js";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const products = [
  {
    name: "Oak Tree Miniature",
    description: "A realistic figurine of a mature oak tree with finely detailed leaves and bark texture.",
    price: 20,
    picture: "https://res.cloudinary.com/dkiringlk/image/upload/Oak_Tree_Miniature_uiurps.jpg",
    category: Category.NATURE,
    timeToDelivery: "1-4 days",
  },
  {
    name: "River Stone Set",
    description: "A set of smooth, natural-looking river stones for decorative displays.",
    price: 12,
    picture: "https://res.cloudinary.com/dkiringlk/image/upload/River_Stone_Set_qpmewo.jpg",
    category: Category.NATURE,
    timeToDelivery: "5-10 days",
  },
  {
    name: "Earth Globe Model",
    description: "A detailed miniature globe showing continents and oceans with accurate coloring.",
    price: 22,
    picture: "https://res.cloudinary.com/dkiringlk/image/upload/Earth_Globe_Model_omiweb.jpg",
    category: Category.SPACE,
    timeToDelivery: "11-20 days",
  },
  {
    name: "Moon Surface Replica",
    description: "A realistic model of the moon’s surface with craters and texture detail.",
    price: 18,
    picture: "https://res.cloudinary.com/dkiringlk/image/upload/Moon_Surface_Replica_xbkrbq.jpg",
    category: Category.SPACE,
    timeToDelivery: "1-4 days",
  },
  {
    name: "Industrial Robotic Arm",
    description: "A scaled-down model of a real-world factory robotic arm used in manufacturing.",
    price: 35,
    picture: "https://res.cloudinary.com/dkiringlk/image/upload/Industrial_Robotic_Arm_exdzp6.jpg",
    category: Category.ROBOTICS,
    timeToDelivery: "5-10 days",
  },
  {
    name: "Autonomous Delivery Robot",
    description: "A miniature model inspired by real urban delivery robots used in cities.",
    price: 27,
    picture: "https://res.cloudinary.com/dkiringlk/image/upload/Autonomous_Delivery_Robot_wljlrv.jpg",
    category: Category.ROBOTICS,
    timeToDelivery: "11-20 days",
  },
  {
    name: "Geometric Balance Sculpture",
    description: "A modern decorative figurine featuring clean lines and balanced geometric shapes.",
    price: 24,
    picture: "https://res.cloudinary.com/dkiringlk/image/upload/Geometric_Balance_Sculpture_hyuqgq.jpg",
    category: Category.MODERN,
    timeToDelivery: "1-4 days",
  },
  {
    name: "Abstract Stone Form",
    description: "A smooth abstract sculpture inspired by natural stone shapes.",
    price: 24,
    picture: "https://res.cloudinary.com/dkiringlk/image/upload/Abstract_Stone_Form_doia5t.jpg",
    category: Category.MODERN,
    timeToDelivery: "5-10 days",
  },
]

async function main() {
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