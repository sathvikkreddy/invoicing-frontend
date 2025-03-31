import Link from "next/link";
import { fetchMe } from "~/strapi/users";

const Invoices = async () => {
  const me = await fetchMe();
  return <Link href={"/"}>{JSON.stringify(me)}</Link>;
};

export default Invoices;
