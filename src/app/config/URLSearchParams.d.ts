declare let URLSearchParams: {
  prototype: URLSearchParams;
  new (
    init?:
      | string[][]
      | Record<string, string | number | (string | number)[]>
      | string
      | URLSearchParams,
  ): URLSearchParams;
};
