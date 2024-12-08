export const fetchGetData = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export const fetchPostData = async (
  url: string,
  headers: Record<string, string>,
  body: string,
) => {
  const response = await fetch(url, { method: "POST", headers, body });
  return response.json();
};
