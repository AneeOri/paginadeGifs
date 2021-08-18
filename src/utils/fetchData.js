export default function getFetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data fetch:", data);
        resolve(data.data);
      })
      .catch((err) => {
        reject(new Error("something went wrong"));
      });
  });
}
