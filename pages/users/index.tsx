import { GetStaticProps } from "next";
import Link from "next/link";

import { User } from "../../interfaces";
import { sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";
import getConfig from "next/config";
import { ICosmosData } from "../api/names";
const { publicRuntimeConfig } = getConfig();

type Props = {
  // items: User[];
  items2: { updatedISO: string };
  users: User[];
};

const WithStaticProps = ({ items2, users }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <p>items2: {items2 && items2.updatedISO ? items2.updatedISO : null}</p>
    <List items={users} />
    <p>
      <Link href="/">Go home</Link>
    </p>
    {/* <List items={items} />
    <p>
      <Link href="/">Go home</Link>
    </p> */}
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;

  const { baseUrl } = publicRuntimeConfig;
  const cosmosRequest = await fetch(baseUrl + "api/names");
  const cosmosData: ICosmosData[] = await cosmosRequest.json();
  const names = cosmosData[0]?.data.slice(0, 100) ?? [];
  const users: User[] = names.map((name, idx) => {
    return { name, id: idx };
  });

  const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  const { time: items2 } = await res.json();
  return { props: { items, items2, users } };
};

export default WithStaticProps;
