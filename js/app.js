const lodeAllNewsCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllNewsCategory(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayAllNewsCategory = (newses) => {
  //   console.log(newses);
  const allNewsCategoryContainer = document.getElementById("all-news-category");
  allNewsCategoryContainer.textContent = "";
  newses.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
        <div class="font-bold text-fuchsia-800 text-center text-lg  ">
           <button onclick=" loadAllNews('${news.category_id}')">${news.category_name}</button>
        </div>
    `;

    allNewsCategoryContainer.appendChild(newsDiv);
  });
};

const loadAllNews = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllNews(data.data));
};

const displayAllNews = (AllNews) => {
  console.log(AllNews);
};
lodeAllNewsCategory();
