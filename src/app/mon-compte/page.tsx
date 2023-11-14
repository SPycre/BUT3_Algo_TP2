import { Metadata } from "next/types";
import OrderTable from "../../components/order-table";
import prisma from "../../utils/prisma";

export const metadata:Metadata = {
    title: `Mon Compte - Starbucks`,
    description: "Commandez de délicieuses boissons préparées avec soin par nos baristas"
  }

export default async function MonCompte() {
    return null;
}