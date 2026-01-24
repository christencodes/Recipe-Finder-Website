export async function getFoodData() {
  const jsonUrl = "data.json";
  const request = new Request(jsonUrl);

  const response = await fetch(request);
  const dataText = await response.text();

  if (!response.ok) throw new Error("what is that ⁉️");

  const data = JSON.parse(dataText);

  return data;
}
