// @flow

const env = ((process.env: any): { [string]: string });

type EnvProps = { [key: string]: string };

const environmentMapping: { [key: string]: string } = {
  REACT_APP_API_PREFIX: 'API_PREFIX',
  REACT_APP_ROUTE_PREFIX: 'ROUTE_PREFIX',
};

const envProps: EnvProps = Object.keys(environmentMapping).reduce(
  (acc, val) => {
    let value = env[val];
    if (val === 'REACT_APP_ROUTE_PREFIX') {
      value = value || '';
    }

    if (value === null || value === undefined) throw Error(`missing ${val}`);
    return {
      ...acc,
      [environmentMapping[val]]: value,
    };
  },
  {}
);

export default envProps;
