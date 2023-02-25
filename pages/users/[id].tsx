import { GetStaticProps, GetStaticPaths } from "next";

import { User } from "../../interfaces";
import { sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import ListDetail from "../../components/ListDetail";
import { ICosmosData } from "../api/names";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

type Props = {
  item?: User;
  errors?: string;
};

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        item ? item.name : "User Detail"
      } | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const { baseUrl } = publicRuntimeConfig;
  const cosmosRequest = await fetch(baseUrl + "api/names");
  const cosmosData: ICosmosData[] = await cosmosRequest.json();
  const names = cosmosData[0]?.data.slice(0, 100) ?? [];
  // Get the paths we want to pre-render based on users
  const paths = names.map((_, idx) => ({
    params: { id: idx.toString() },
  }));

  // // Get the paths we want to pre-render based on users
  // const paths = sampleUserData.map((user) => ({
  //   params: { id: user.id.toString() },
  // }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { baseUrl } = publicRuntimeConfig;
    const cosmosRequest = await fetch(baseUrl + "api/names");
    const cosmosData: ICosmosData[] = await cosmosRequest.json();
    const names = cosmosData[0]?.data.slice(0, 100) ?? [];

    const id = params?.id;
    // const item = sampleUserData.find((data) => data.id === Number(id));
    const name = names.find((_, idx) => idx === Number(id));
    const item: User = { name, id: Number(id) };
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
