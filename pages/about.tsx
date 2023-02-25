import Link from "next/link";
import Layout from "../components/Layout";
import { ICosmosData } from "./api/names";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

type AboutPageProps = {
  names: string[];
};

const AboutPage = ({ names }: AboutPageProps) => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page</p>
    <div>
      {"Showing TOP 10 names."}
      {names
        ? names.map((name, idx) => (
            <p>
              {idx}:{name}
            </p>
          ))
        : "not yet"}
    </div>

    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
);

export const getServerSideProps = async () => {
  const { baseUrl } = publicRuntimeConfig;
  const res = await fetch(baseUrl + "api/names");
  const data: ICosmosData[] = await res.json();
  const names = data[0].data;
  return { props: { names: names.slice(0, 100) } };
};

export default AboutPage;
