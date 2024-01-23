import { LocaleType } from "@/src/types";
import { redirect } from "next/navigation";

const AllProductsPage = ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    redirect(`/${lang}/404`);
}

export default AllProductsPage