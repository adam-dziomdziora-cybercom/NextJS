const CosmosClient = require("@azure/cosmos").CosmosClient;
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

type CosmosResponse = {
  resources: ICosmosData[];
};

export interface ICosmosData {
  id: string;
  data: string[];
}

const fetchCosmos = async () => {
  const { endpoint, key, database, container } = serverRuntimeConfig;
  const client = new CosmosClient({ endpoint, key });

  const databaseID = client.database(database);
  const containerID = databaseID.container(container);

  if (endpoint) {
    console.log(`Querying container:\\n${containerID}`);
    const querySpec = {
      query: "SELECT * FROM c",
    };

    const { resources: items }: CosmosResponse = await containerID.items
      .query(querySpec)
      .fetchAll();

    return items;
  }
};

import { NextApiRequest, NextApiResponse } from "next";

const namesHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fetchCosmos();

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default namesHandler;
