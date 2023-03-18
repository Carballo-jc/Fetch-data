const getSuspender = (_promise) => {
  let status = "pending";
  let response;

  const suspender = _promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const readData = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };
  return { readData };
};

export const fetchData = (_url) => {
  const promise = fetch(_url)
    .then((response) => response.json())
    .then((data) => data);

  return getSuspender(promise);
};
