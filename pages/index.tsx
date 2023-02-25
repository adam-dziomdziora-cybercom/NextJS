import Link from "next/link";
import Layout from "../components/Layout";
import useSWR from "swr";
import { User } from "../interfaces";
import { ICosmosData } from "./api/names/index";
const IndexPage = () => {
  const { data } = useSWR<User[]>("/api/users", async (args) => {
    const res = await fetch(args);
    return await res.json();
  });

  const { data: data2 } = useSWR<ICosmosData[]>("/api/names", async (args) => {
    const res = await fetch(args);
    return await res.json();
  });

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>SWR: {data ? data[0].name : null}</p>
      <div>
        {data2
          ? data2[0].data
              .slice(0, 100)
              .map((name, idx) => <p key={idx}>{name}</p>)
          : "not yet"}
      </div>
      <p>
        <Link href="/about">About</Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
