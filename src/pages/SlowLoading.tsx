const fetchSimulatedData = (): Promise<string> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve('Page loaded'),
      3000
    ));

const createResource = (promise: Promise<string>) => {
  let status: string = 'loading';
  let result: string;
  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      if (status === 'loading') throw suspender;
      if (status === 'error') throw result;
      return result;
    }
  };
};

const resource = createResource(fetchSimulatedData());

const SlowLoading = () => {
  const data = resource.read();
  return <div className="loading">{data}</div>;
};

export default SlowLoading;
